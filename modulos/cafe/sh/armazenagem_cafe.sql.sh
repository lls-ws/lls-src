#!/bin/bash
# Script para calcular a armazenagem de cafe
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

faturamento_geral()
{
	
	comando_sql "SELECT fazendaProdutor_id FROM Fatcafe WHERE data = '"$DATA_FINAL"'" "bd_lls" "-N" "-B" |
	
	while read ID; do
	
		calcula_armazenagem "$ID"
	
	done
	
}

calcula_armazenagem()
{
	
	ID="$1"
	
	comando_sql "UPDATE Fatcafe fatCafe, (\
				
				SELECT id AS ID, \
					   TRUNCATE(SUM(arma.valor), 2) AS VALOR \
					FROM ( \
						
						SELECT fatCafe.fazendaProdutor_id AS ID, \
								@dias:= 0 AS DIAS, \
								fatCafe.saldoAnterior AS ANTERIOR, \
								@preco:= preco.valor AS PRECO, \
								@valor:= 0 AS VALOR, \
								@data:= cafe.dataFaturamento AS DATA, \
								@entrada:= 0 AS ENTRADA, \
								@saida:= 0 AS SAIDA, \
								@saldo:= fatCafe.saldoAnterior AS SALDO \
							FROM Fatcafe fatCafe \
							INNER JOIN Cafe cafe \
							ON fatCafe.fazendaProdutor_id = cafe.id \
							INNER JOIN Preco preco \
							ON preco.id = 16 \
							AND fatCafe.data = '"$DATA_FINAL"' \
							AND fatCafe.fazendaProdutor_id = $ID \
						 
						UNION ALL \
						 
						SELECT  movimento.id AS ID, \
								@dias:= DATEDIFF(movimento.data, @data) AS DIAS, \
								@saldo AS ANTERIOR, \
								@preco AS PRECO, \
								( \
									CASE \
										WHEN @saldo > 0 THEN @valor:= (@saldo*@dias*@preco/30) \
										ELSE @valor:= 0 \
									END
								) AS VALOR, \
								@data:= movimento.data AS DATA, \
								@entrada:= IFNULL(movimento.entradas, 0) AS ENTRADA, \
								@saida:= IFNULL(movimento.saidas, 0) AS SAIDA, \
								@saldo:= @saldo + @entrada - @saida AS SALDO \
							 FROM ( \
								
								SELECT 	movi.id AS ID, \
										movi.data AS DATA, \
										SUM(movi.entradas) AS ENTRADAS, \
										SUM(movi.saidas) AS SAIDAS \
										
									 FROM ( \
										
										SELECT 	fazendaProdutor_id AS ID, \
												data AS DATA, \
												SUM(sacas) AS ENTRADAS, \
												0 AS SAIDAS \
											 FROM Entcafe \
												INNER JOIN Cafe cafe \
												ON fazendaProdutor_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaProdutor_id = $ID \
													GROUP BY DATA \
										
										UNION ALL
										
										SELECT 	fazendaDestino_id AS ID, \
												data AS DATA, \
												SUM(sacas) AS ENTRADAS, \
												0 AS SAIDAS \
											 FROM Tracafe \
												INNER JOIN Cafe cafe \
												ON fazendaDestino_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaDestino_id = $ID \
													GROUP BY DATA \
										
										UNION ALL
										
										SELECT 	fazendaProdutor_id AS ID, \
												data AS DATA, \
												SUM(sacasAcrescimo) AS ENTRADAS, \
												0 AS SAIDAS \
											 FROM Oscafe \
												INNER JOIN Cafe cafe \
												ON fazendaProdutor_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaProdutor_id = $ID \
													GROUP BY DATA \
										
										UNION ALL
										
										SELECT 	fazendaProdutor_id AS ID, \
												data AS DATA, \
												0 AS ENTRADAS, \
												SUM(sacas) AS SAIDAS \
											 FROM Saicafe \
												INNER JOIN Cafe cafe \
												ON fazendaProdutor_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaProdutor_id = $ID \
													GROUP BY DATA \
												
										UNION ALL
										
										SELECT 	fazendaProdutor_id AS ID, \
												data AS DATA, \
												0 AS ENTRADAS, \
												SUM(sacasQuebra) AS SAIDAS \
											 FROM Oscafe \
												INNER JOIN Cafe cafe \
												ON fazendaProdutor_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaProdutor_id = $ID \
													GROUP BY DATA \
													
										UNION ALL
										
										SELECT 	fazendaProdutor_id AS ID, \
												data AS DATA, \
												0 AS ENTRADAS, \
												SUM(sacas) AS SAIDAS \
											 FROM Tracafe \
												INNER JOIN Cafe cafe \
												ON fazendaProdutor_id = cafe.id \
												AND data > cafe.dataFaturamento \
												AND data <= '"$DATA_FINAL"' \
												AND fazendaProdutor_id = $ID \
													GROUP BY DATA \
													
										) movi \
											GROUP BY DATA \
								) movimento \
						 
						 UNION ALL \
						 
						 SELECT fatCafe.fazendaProdutor_id AS ID, \
								@dias:= DATEDIFF(fatCafe.data, @data) AS DIAS, \
								@saldo AS ANTERIOR, \
								@preco AS PRECO, \
								@valor:= (@saldo*@dias*@preco/30) AS VALOR, \
								@data:= fatCafe.data AS DATA, \
								@entrada:= 0 AS ENTRADA, \
								@saida:= 0 AS SAIDA, \
								@saldo:= @saldo + @entrada - @saida AS SALDO \
							FROM Fatcafe fatCafe \
							WHERE fatCafe.data = '"$DATA_FINAL"' \
							AND fatCafe.fazendaProdutor_id = $ID 
						
					) arma \
				
				) armazenagem \
				SET fatCafe.armazenagem = armazenagem.valor, \
					fatCafe.total = fatCafe.servicos + armazenagem.valor \
				
				WHERE fatCafe.data = '"$DATA_FINAL"' \
				AND fatCafe.fazendaProdutor_id = armazenagem.id \
				AND armazenagem.valor > 0 \
				AND fatCafe.fazendaProdutor_id = $ID"
				
}

mostrar_faturamento()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						fatCafe.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						fatCafe.saldo AS SALDO, \
						IFNULL(fatCafe.armazenagem, 0) AS ARMAZENAGEM, \
						IFNULL(fatCafe.servicos, 0) AS SERVICOS, \
						IFNULL(fatCafe.total,0) AS TOTAL \
					FROM Fatcafe fatCafe \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON fatCafe.fazendaProdutor_id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					WHERE fatCafe.data = '"$DATA_FINAL"' \
					AND fatCafe.total > 0 \
						GROUP BY PRODUTOR, FAZENDA"
					
	calcular_total
	
}

calcular_total()
{

	comando_sql "SELECT COUNT(fatCafe.fazendaProdutor_id) AS QTD, \
						SUM(IFNULL(fatCafe.armazenagem, 0)) AS ARMAZENAGEM, \
						SUM(IFNULL(fatCafe.servicos, 0)) AS SERVICOS, \
						SUM(IFNULL(fatCafe.total,0)) AS TOTAL \
					FROM Fatcafe fatCafe \
					WHERE fatCafe.data = '"$DATA_FINAL"'"
					
}

calcula_armazenagem_teste()
{
	
	ID="$1"
	
	comando_sql "	SELECT fatCafe.fazendaProdutor_id AS ID, \
							@dias:= 0 AS DIAS, \
							fatCafe.saldoAnterior AS ANTERIOR, \
							@preco:= preco.valor AS PRECO, \
							@valor:= '0.00' AS VALOR, \
							@data:= '2018-07-30' AS DATA, \
							@entrada:= 0 AS ENTRADA, \
							@saida:= 0 AS SAIDA, \
							@saldo:= fatCafe.saldoAnterior AS SALDO \
						FROM Fatcafe fatCafe \
						INNER JOIN Cafe cafe \
						ON fatCafe.fazendaProdutor_id = cafe.id \
						INNER JOIN Preco preco \
						ON preco.id = 16 \
						AND fatCafe.data = '"$DATA_FINAL"' \
						AND fatCafe.fazendaProdutor_id = $ID \
					 
					UNION ALL \
					 
					SELECT  movimento.id AS ID, \
							@dias:= DATEDIFF(movimento.data, @data) AS DIAS, \
							@saldo AS ANTERIOR, \
							@preco AS PRECO, \
							TRUNCATE( \
								CASE \
									WHEN @saldo > 0 THEN @valor:= (@saldo*@dias*@preco/30) \
									ELSE @valor:= 0 \
								END, 2) AS VALOR, \
							@data:= movimento.data AS DATA, \
							@entrada:= IFNULL(movimento.entradas, 0) AS ENTRADA, \
							@saida:= IFNULL(movimento.saidas, 0) AS SAIDA, \
							@saldo:= @saldo + @entrada - @saida AS SALDO \
						 FROM ( \
							
							SELECT 	movi.id AS ID, \
									movi.data AS DATA, \
									SUM(movi.entradas) AS ENTRADAS, \
									SUM(movi.saidas) AS SAIDAS \
									
								 FROM ( \
									
									SELECT 	fazendaProdutor_id AS ID, \
											data AS DATA, \
											SUM(sacas) AS ENTRADAS, \
											0 AS SAIDAS \
										 FROM Entcafe \
											INNER JOIN Cafe cafe \
											ON fazendaProdutor_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaProdutor_id = $ID \
												GROUP BY DATA \
									
									UNION ALL
									
									SELECT 	fazendaDestino_id AS ID, \
											data AS DATA, \
											SUM(sacas) AS ENTRADAS, \
											0 AS SAIDAS \
										 FROM Tracafe \
											INNER JOIN Cafe cafe \
											ON fazendaDestino_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaDestino_id = $ID \
												GROUP BY DATA \
									
									UNION ALL
									
									SELECT 	fazendaProdutor_id AS ID, \
											data AS DATA, \
											SUM(sacasAcrescimo) AS ENTRADAS, \
											0 AS SAIDAS \
										 FROM Oscafe \
											INNER JOIN Cafe cafe \
											ON fazendaProdutor_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaProdutor_id = $ID \
												GROUP BY DATA \
									
									UNION ALL
									
									SELECT 	fazendaProdutor_id AS ID, \
											data AS DATA, \
											0 AS ENTRADAS, \
											SUM(sacas) AS SAIDAS \
										 FROM Saicafe \
											INNER JOIN Cafe cafe \
											ON fazendaProdutor_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaProdutor_id = $ID \
												GROUP BY DATA \
											
									UNION ALL
									
									SELECT 	fazendaProdutor_id AS ID, \
											data AS DATA, \
											0 AS ENTRADAS, \
											SUM(sacasQuebra) AS SAIDAS \
										 FROM Oscafe \
											INNER JOIN Cafe cafe \
											ON fazendaProdutor_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaProdutor_id = $ID \
												GROUP BY DATA \
												
									UNION ALL
									
									SELECT 	fazendaProdutor_id AS ID, \
											data AS DATA, \
											0 AS ENTRADAS, \
											SUM(sacas) AS SAIDAS \
										 FROM Tracafe \
											INNER JOIN Cafe cafe \
											ON fazendaProdutor_id = cafe.id \
											AND data > cafe.dataFaturamento \
											AND data <= '"$DATA_FINAL"' \
											AND fazendaProdutor_id = $ID \
												GROUP BY DATA \
												
									) movi \
										GROUP BY DATA \
							) movimento \
					 
					 UNION ALL \
					 
					 SELECT fatCafe.fazendaProdutor_id AS ID, \
							@dias:= DATEDIFF(fatCafe.data, @data) AS DIAS, \
							@saldo AS ANTERIOR, \
							@preco AS PRECO, \
							@valor:= TRUNCATE((@saldo*@dias*@preco/30), 2) AS VALOR, \
							@data:= fatCafe.data AS DATA, \
							@entrada:= 0 AS ENTRADA, \
							@saida:= 0 AS SAIDA, \
							@saldo:= @saldo + @entrada - @saida AS SALDO \
						FROM Fatcafe fatCafe \
						WHERE fatCafe.data = '"$DATA_FINAL"' \
						AND fatCafe.fazendaProdutor_id = $ID "
						
					#) arma "
				
}

finalizar_faturamento()
{
	
	DATA_FATURAMENTO="$1"
	
	if [ -z "${DATA_FATURAMENTO}" ]; then
	
		DATA_FATURAMENTO="2018-09-30"
	
	fi
	
	comando_sql
	
	${CMD_BASE} -e "UPDATE Empresa empresa \
					INNER JOIN Cafe cafe \
					ON cafe.id > 0 \
					SET empresa.dataCafe = '"$DATA_FATURAMENTO"', \
						cafe.dataFaturamento = '"$DATA_FATURAMENTO"' \
					WHERE empresa.id = 1"
					
	${CMD_BASE} -e "SELECT DISTINCT dataFaturamento FROM Cafe"
	
	${CMD_BASE} -e "SELECT dataCafe FROM Empresa WHERE id = 1"
	
}

DATA_INICIO='2018-09-01'
DATA_FINAL='2018-09-30'

case "$1" in
	1)    	
		faturamento_geral
		
		mostrar_faturamento
	
		;; 
	2)
		mostrar_faturamento
		;;
	3)
		calcular_total
		;;
	4)
		#calcula_armazenagem_teste 954	# Agmar Reginaldo de Oliveira
		#calcula_armazenagem_teste 984 # Mariluce Silva Matos Pereira
		#calcula_armazenagem_teste 169 # Antonio Eustaquio Filho
		
		DATA_FINAL='2018-08-29'
		calcula_armazenagem 885 # Paulo Sergio Ferreira
		;;
	5)
		finalizar_faturamento "$2"
		;;
	
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-teste|5-finalizar}"
		exit 1
		;;
esac
