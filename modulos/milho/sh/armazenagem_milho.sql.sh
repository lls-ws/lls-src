#!/bin/bash
# Script para calcular a armazenagem de milho
#
# email: lls.homeoffice@gmail.com

faturamento_geral()
{
	
	comando_sql "SELECT fazendaProdutor_id FROM Fatmilho WHERE data = '"$DATA_FINAL"'" "bd_lls" "-N" "-B" |
	
	while read ID; do
	
		calcula_armazenagem "$ID"
	
	done
	
}

calcula_armazenagem()
{
	
	ID="$1"
	
	comando_sql "UPDATE Fatmilho fatMilho, (\
				
				SELECT id AS ID, \
					   SUM(arma.valor) AS VALOR \
					FROM ( \
						
					SELECT fatMilho.fazendaProdutor_id AS ID, \
							@dias:= 0 AS DIAS, \
							fatMilho.saldoAnterior AS ANTERIOR, \
							@preco:= (preco.valor/1000) AS PRECO, \
							@taxa:= (@preco*@dias/30) AS TAXA, \
							@valor:= 0 AS VALOR, \
							@data:= milho.dataFaturamento AS DATA, \
							@entrada:= 0 AS ENTRADA, \
							@saida:= 0 AS SAIDA, \
							@saldo:= fatMilho.saldoAnterior AS SALDO \
						FROM Fatmilho fatMilho \
						INNER JOIN Milho milho \
						ON fatMilho.fazendaProdutor_id = milho.id \
						INNER JOIN Preco preco \
						ON preco.id = 20 \
						AND fatMilho.data = '"$DATA_FINAL"' \
						AND fatMilho.fazendaProdutor_id = $ID \
					 
					 UNION ALL \
					 
					 SELECT entradas.id AS ID, \
							@dias:= DATEDIFF(entradas.data, @data) AS DIAS, \
							@saldo AS ANTERIOR, \
							@preco AS PRECO, \
							@taxa:= (@preco*@dias/30) AS TAXA, \
							( \
							CASE \
								WHEN @saldo > 0 THEN @valor:= (@saldo*@taxa) \
								ELSE @valor:= 0 \
							END) AS VALOR, \
							@data:= data AS DATA, \
							@entrada:= IFNULL(entradas.liquido, 0) AS ENTRADA, \
							@saida:= 0 AS SAIDA, \
							@saldo:= @saldo + @entrada - @saida AS SALDO \
						 FROM ( \
							SELECT 	fazendaProdutor_id AS ID, \
									data AS DATA, \
									SUM(liquido) AS LIQUIDO \
								 FROM Entmilho \
									INNER JOIN Milho milho \
									ON fazendaProdutor_id = milho.id \
									AND data > milho.dataFaturamento \
									AND data <= '"$DATA_FINAL"' \
									AND fazendaProdutor_id = $ID \
									GROUP BY DATA \
							) entradas \
					
					UNION ALL \
					
					SELECT  saidas.id AS ID, \
							@dias:= DATEDIFF(saidas.data, @data) AS DIAS, \
							@saldo AS ANTERIOR, \
							@preco AS PRECO, \
							@taxa:= (@preco*@dias/30) AS TAXA, \
							( \
							CASE \
								WHEN @saldo > 0 THEN @valor:= (@saldo*@taxa) \
								ELSE @valor:= 0 \
							END) AS VALOR, \
							@data:= saidas.data AS DATA, \
							@entrada:= 0 AS ENTRADA, \
							@saida:= IFNULL(saidas.liquido, 0) AS SAIDA, \
							@saldo:= @saldo + @entrada - @saida AS SALDO \
						 FROM ( \
							SELECT 	fazendaProdutor_id AS ID, \
									data AS DATA, \
									SUM(liquido) AS LIQUIDO \
								 FROM Saimilho \
									INNER JOIN Milho milho \
									ON fazendaProdutor_id = milho.id \
									AND data > milho.dataFaturamento \
									AND data <= '"$DATA_FINAL"' \
									AND fazendaProdutor_id = $ID \
									GROUP BY DATA \
							) saidas \
					 
					 UNION ALL \
					 
					 SELECT fatMilho.fazendaProdutor_id AS ID, \
							@dias:= DATEDIFF(fatMilho.data, @data) AS DIAS, \
							@saldo AS ANTERIOR, \
							@preco AS PRECO, \
							@taxa:= (@preco*@dias/30) AS TAXA, \
							@valor:= (@saldo*@taxa) AS VALOR, \
							@data:= fatMilho.data AS DATA, \
							@entrada:= 0 AS ENTRADA, \
							@saida:= 0 AS SAIDA, \
							@saldo:= @saldo + @entrada - @saida AS SALDO \
						FROM Fatmilho fatMilho \
						WHERE fatMilho.data = '"$DATA_FINAL"' \
						AND fatMilho.fazendaProdutor_id = $ID \
						
					) arma \
				
				) armazenagem \
				SET fatMilho.armazenagem = armazenagem.valor, \
					fatMilho.total = armazenagem.valor + \
									 fatMilho.limpeza + \
									 fatMilho.secagem + \
									 fatMilho.carga + \
									 fatMilho.recepcao \
				WHERE fatMilho.data = '"$DATA_FINAL"' \
				AND fatMilho.fazendaProdutor_id = armazenagem.id \
				AND fatMilho.fazendaProdutor_id = $ID"
					
				
}

mostrar_faturamento()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						fatMilho.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(fatMilho.armazenagem, 0) AS ARMAZENAGEM, \
						IFNULL(fatMilho.limpeza,0) AS LIMPEZA, \
						IFNULL(fatMilho.secagem,0) AS SECAGEM, \
						IFNULL(fatMilho.carga,0) AS CARGA, \
						IFNULL(fatMilho.recepcao,0) AS RECEPCAO, \
						IFNULL(fatMilho.total,0) AS TOTAL \
					FROM Fatmilho fatMilho \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON fatMilho.fazendaProdutor_id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					WHERE fatMilho.data = '"$DATA_FINAL"' \
					GROUP BY PRODUTOR, FAZENDA"
	
}

calcular_total()
{

	comando_sql "SELECT COUNT(fatMilho.fazendaProdutor_id) AS QTD, \
						SUM(IFNULL(fatMilho.armazenagem, 0)) AS ARMAZENAGEM, \
						SUM(IFNULL(fatMilho.limpeza,0)) AS LIMPEZA, \
						SUM(IFNULL(fatMilho.secagem,0)) AS SECAGEM, \
						SUM(IFNULL(fatMilho.carga,0)) AS CARGA, \
						SUM(IFNULL(fatMilho.recepcao,0)) AS RECEPCAO, \
						SUM(IFNULL(fatMilho.total,0)) AS TOTAL \
					FROM Fatmilho fatMilho \
					WHERE fatMilho.data = '"$DATA_FINAL"'"
					
}

calcula_armazenagem_teste()
{
	
	ID_FAZ="$1"
	
	comando_sql "SELECT id AS ID, \
					   sum(arma.valor) AS VALOR \
					FROM ( \
					
				SELECT fatMilho.fazendaProdutor_id AS ID, \
						@dias:= 0 AS DIAS, \
						fatMilho.saldoAnterior AS ANTERIOR, \
						@preco:= (preco.valor/1000) AS PRECO, \
						@taxa:= (@preco*@dias/30) AS TAXA, \
						@valor:= 0 AS VALOR, \
						@data:= milho.dataFaturamento AS DATA, \
						@entrada:= 0 AS ENTRADA, \
						@saida:= 0 AS SAIDA, \
						@saldo:= fatMilho.saldoAnterior AS SALDO \
					FROM Fatmilho fatMilho \
					INNER JOIN Milho milho \
					ON fatMilho.fazendaProdutor_id = milho.id \
					INNER JOIN Preco preco \
					ON preco.id = 20 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.fazendaProdutor_id = $ID_FAZ \
				 
				 UNION ALL \
				 
				 SELECT entradas.id AS ID, \
						@dias:= DATEDIFF(IFNULL(entradas.data, @data), @data) AS DIAS, \
						@saldo AS ANTERIOR, \
						@preco AS PRECO, \
						@taxa:= (@preco*@dias/30) AS TAXA, \
						( \
						CASE \
							WHEN @saldo > 0 THEN @valor:= (@saldo*@taxa) \
							ELSE @valor:= 0 \
						END) AS VALOR, \
						@data:= data AS DATA, \
						@entrada:= IFNULL(entradas.liquido, 0) AS ENTRADA, \
						@saida:= 0 AS SAIDA, \
						@saldo:= @saldo + @entrada - @saida AS SALDO \
					 FROM ( \
						SELECT 	fazendaProdutor_id AS ID, \
								data AS DATA, \
								SUM(liquido) AS LIQUIDO \
							 FROM Entmilho \
								INNER JOIN Milho milho \
								ON fazendaProdutor_id = milho.id \
								AND data > milho.dataFaturamento \
								AND data <= '"$DATA_FINAL"' \
								AND fazendaProdutor_id = $ID_FAZ \
								GROUP BY DATA \
						) entradas \
				
				UNION ALL \
				
				SELECT  saidas.id AS ID, \
						@dias:= DATEDIFF(IFNULL(saidas.data, @data), @data) AS DIAS, \
						@saldo AS ANTERIOR, \
						@preco AS PRECO, \
						@taxa:= (@preco*@dias/30) AS TAXA, \
						( \
						CASE \
							WHEN @saldo > 0 THEN @valor:= (@saldo*@taxa) \
							ELSE @valor:= 0 \
						END) AS VALOR, \
						@data:= data AS DATA, \
						@entrada:= 0 AS ENTRADA, \
						@saida:= IFNULL(saidas.liquido, 0) AS SAIDA, \
						@saldo:= @saldo + @entrada - @saida AS SALDO \
					 FROM ( \
						SELECT 	fazendaProdutor_id AS ID, \
								data AS DATA, \
								SUM(liquido) AS LIQUIDO \
							 FROM Saimilho \
								INNER JOIN Milho milho \
								ON fazendaProdutor_id = milho.id \
								AND data > milho.dataFaturamento \
								AND data <= '"$DATA_FINAL"' \
								AND fazendaProdutor_id = $ID_FAZ \
								GROUP BY DATA \
						) saidas \
				 
				 UNION ALL \
				 
				 SELECT fatMilho.fazendaProdutor_id AS ID, \
						@dias:= DATEDIFF(fatMilho.data, @data) AS DIAS, \
						@saldo AS ANTERIOR, \
						@preco AS PRECO, \
						@taxa:= (@preco*@dias/30) AS TAXA, \
						@valor:= (@saldo*@taxa) AS VALOR, \
						@data:= fatMilho.data AS DATA, \
						@entrada:= 0 AS ENTRADA, \
						@saida:= 0 AS SAIDA, \
						@saldo:= @saldo + @entrada - @saida AS SALDO \
					FROM Fatmilho fatMilho \
					WHERE fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.fazendaProdutor_id = $ID_FAZ \
				) arma"
				
}

finalizar_faturamento()
{
	
	DATA_FATURAMENTO='2016-10-31'
	
	comando_sql "UPDATE Empresa empresa \
					INNER JOIN Milho milho \
					ON milho.id > 0 \
					SET empresa.dataMilho = '"$DATA_FATURAMENTO"', \
						milho.dataFaturamento = '"$DATA_FATURAMENTO"' \
					WHERE empresa.id = 1"
					
	comando_sql "SELECT DISTINCT dataFaturamento FROM Milho"
	
	comando_sql "SELECT dataMilho FROM Empresa WHERE id = 1"
	
}

update_servico()
{
	
	comando_sql "UPDATE Fatmilho fatMilho, (\
				
					SELECT fatMilho.fazendaProdutor_id AS ID, \
						IFNULL(armazenagem.valor, 0) AS ARMAZENAGEM, \
						IFNULL(limpeza.valor, 0) AS LIMPEZA, \
						IFNULL(secagem.valor, 0) AS SECAGEM, \
						IFNULL(recepcao.valor, 0) AS RECEPCAO, \
						IFNULL(carga.valor, 0) AS CARGA \
							FROM Fatmilho fatMilho \
							
							LEFT JOIN ( \
							
								SELECT  servMilho.fazendaProdutor_id AS ID, \
										SUM(servMilho.valor) AS VALOR \
									
									FROM Servmilho servMilho \
		
										INNER JOIN Milho milho \
										ON milho.id = servMilho.fazendaProdutor_id \
										AND servMilho.data > milho.dataFaturamento \
										AND servMilho.data <= '"$DATA_FINAL"' \
										AND servMilho.automatico = 'N' \
										AND servMilho.preco_id = 20 \
											GROUP BY ID \
							) AS armazenagem \
							ON fatMilho.fazendaProdutor_id = armazenagem.id \
							
							LEFT JOIN ( \
							
								SELECT  servMilho.fazendaProdutor_id AS ID, \
										SUM(servMilho.valor) AS VALOR \
									
									FROM Servmilho servMilho \
		
										INNER JOIN Milho milho \
										ON milho.id = servMilho.fazendaProdutor_id \
										AND servMilho.data > milho.dataFaturamento \
										AND servMilho.data <= '"$DATA_FINAL"' \
										AND servMilho.automatico = 'N' \
										AND servMilho.preco_id = 21 \
											GROUP BY ID \
							) AS limpeza \
							ON fatMilho.fazendaProdutor_id = limpeza.id \
							
							LEFT JOIN ( \
							
								SELECT  servMilho.fazendaProdutor_id AS ID, \
										SUM(servMilho.valor) AS VALOR \
									
									FROM Servmilho servMilho \
		
										INNER JOIN Milho milho \
										ON milho.id = servMilho.fazendaProdutor_id \
										AND servMilho.data > milho.dataFaturamento \
										AND servMilho.data <= '"$DATA_FINAL"' \
										AND servMilho.automatico = 'N' \
										AND servMilho.preco_id = 22 \
											GROUP BY ID \
							) AS secagem \
							ON fatMilho.fazendaProdutor_id = secagem.id \
							
							LEFT JOIN ( \
							
								SELECT  servMilho.fazendaProdutor_id AS ID, \
										SUM(servMilho.valor) AS VALOR \
									
									FROM Servmilho servMilho \
		
										INNER JOIN Milho milho \
										ON milho.id = servMilho.fazendaProdutor_id \
										AND servMilho.data > milho.dataFaturamento \
										AND servMilho.data <= '"$DATA_FINAL"' \
										AND servMilho.automatico = 'N' \
										AND servMilho.preco_id = 23 \
											GROUP BY ID \
							) AS recepcao \
							ON fatMilho.fazendaProdutor_id = recepcao.id \
							
							LEFT JOIN ( \
							
								SELECT  servMilho.fazendaProdutor_id AS ID, \
										SUM(servMilho.valor) AS VALOR \
									
									FROM Servmilho servMilho \
		
										INNER JOIN Milho milho \
										ON milho.id = servMilho.fazendaProdutor_id \
										AND servMilho.data > milho.dataFaturamento \
										AND servMilho.data <= '"$DATA_FINAL"' \
										AND servMilho.automatico = 'N' \
										AND servMilho.preco_id = 24 \
											GROUP BY ID \
							) AS carga \
							ON fatMilho.fazendaProdutor_id = carga.id \
							
							AND fatMilho.data = '"$DATA_FINAL"' \
					
					) servico \
				
				SET fatMilho.armazenagem = fatMilho.armazenagem + servico.armazenagem, \
					fatMilho.limpeza = fatMilho.limpeza + servico.limpeza, \
					fatMilho.secagem = fatMilho.secagem + servico.secagem, \
					fatMilho.recepcao = fatMilho.recepcao + servico.recepcao, \
					fatMilho.carga = fatMilho.carga + servico.carga, \
					fatMilho.total = fatMilho.total + \
									 servico.armazenagem + \
									 servico.limpeza + \
									 servico.secagem + \
									 servico.recepcao + \
									 servico.carga \
									 
				WHERE fatMilho.data = '"$DATA_FINAL"' \
				AND fatMilho.fazendaProdutor_id = servico.id"
				
}

DATA_INICIO='2017-03-01'
DATA_FINAL='2017-03-31'

case "$1" in
	1)    	
		faturamento_geral
		
		mostrar_faturamento
	
		calcular_total
	
		;; 
	2)
		mostrar_faturamento
		;;
	3)
		calcular_total
		;;
	4)
		calcula_armazenagem_teste 660
		calcula_armazenagem_teste 47
		calcula_armazenagem_teste 94
		;;
	5)
		finalizar_faturamento
		;;
	6)
		update_servico
		;;
	
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-teste|5-finalizar|6-servico}"
		exit 1
		;;
esac
