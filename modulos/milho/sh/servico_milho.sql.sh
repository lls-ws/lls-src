#!/bin/bash
# Script para calcular e mostrar o servico de milho
#
# email: lls.homeoffice@gmail.com

rodar_servico()
{

comando_sql "DELETE FROM Servmilho WHERE pago = 'N' AND automatico = 'Y' AND data = '"$DATA_FINAL"'"

comando_sql "INSERT INTO Servmilho (fazendaProdutor_id, preco_id, data, liquido, valor, automatico, pago, obs) \
			SELECT  fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.saldo AS LIQUIDO, \
					fatMilho.armazenagem AS VALOR, \
					'Y' AS AUTOMATICO, \
					'N' AS PAGO, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 20 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.armazenagem > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.limpeza AS VALOR, \
					'Y' AS AUTOMATICO, \
					'N' AS PAGO, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 21 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.limpeza > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.secagem AS VALOR, \
					'Y' AS AUTOMATICO, \
					'N' AS PAGO, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 22 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.secagem > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.recepcao AS VALOR, \
					'Y' AS AUTOMATICO, \
					'N' AS PAGO, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 23 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.recepcao > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.carga AS VALOR, \
					'Y' AS AUTOMATICO, \
					'N' AS PAGO, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 24 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.carga > 0 "
	
	mostrar_servico
	
}

mostrar_servico()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						servMilho.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						preco.nome AS SERVICO, \
						servMilho.data AS DATA, \
						servMilho.liquido AS LIQUIDO, \
						servMilho.valor AS TOTAL, \
						IFNULL(baixas.PAGO, 0) AS PAGO, \
						(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS VALOR, \
						servMilho.obs AS OBS, \
						servMilho.automatico AS AUTOMATICO \
					FROM Servmilho servMilho \
						INNER JOIN Preco preco \
						ON servMilho.preco_id = preco.id \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON servMilho.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						LEFT JOIN ( \
										
							SELECT  servMilho_id AS ID_SERV, \
									SUM(valor) AS PAGO \
								FROM Baixamilho \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servMilho.id \
						AND servMilho.data >= '"$DATA_FINAL"' \
						HAVING VALOR = 0 \
							ORDER BY DATA ASC, PRODUTOR, FAZENDA"

	calcular_total
	
}

calcular_total()
{
	
	comando_sql "SELECT SUM(servMilho.valor) AS TOTAL, \
						SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servmilho servMilho \
						LEFT JOIN ( \
										
							SELECT  servMilho_id AS ID_SERV, \
									SUM(valor) AS PAGO \
								FROM Baixamilho \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servMilho.id \
						
							WHERE servMilho.data >= '"$DATA_FINAL"'"
	
}

mostrar_servico_teste()
{

comando_sql "SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.saldo AS LIQUIDO, \
					fatMilho.armazenagem AS VALOR, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 20 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.armazenagem > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.limpeza AS VALOR, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 21 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.limpeza > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.secagem AS VALOR, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 22 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.secagem > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.recepcao AS VALOR, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 23 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.recepcao > 0 \
					
			UNION ALL \
			
			SELECT fatMilho.id AS ID_FAZ, \
					preco.id AS ID_PRECO, \
					fatMilho.data AS DATA, \
					fatMilho.entradas AS LIQUIDO, \
					fatMilho.carga AS VALOR, \
					CONCAT(preco.nome, ' ', MONTH(fatMilho.data), '/', YEAR(fatMilho.data)) AS OBS \
				FROM Fatmilho fatMilho \
					INNER JOIN Preco preco \
					ON preco.id = 24 \
					AND fatMilho.data = '"$DATA_FINAL"' \
					AND fatMilho.carga > 0 "
	
}

servico_sintetizado()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, \
						IFNULL(recepcao.TOTAL,0) AS RECEPCAO, \
						IFNULL(limpeza.TOTAL,0) AS LIMPEZA, \
						IFNULL(secagem.TOTAL,0) AS SECAGEM, \
						IFNULL(carga.TOTAL,0) AS CARGA, \
						
						(IFNULL(armazenagem.TOTAL,0) + \
						 IFNULL(limpeza.TOTAL,0) + \
						 IFNULL(secagem.TOTAL,0) + \
						 IFNULL(carga.TOTAL,0) + \
						 IFNULL(recepcao.TOTAL,0)) AS TOTAL \
					FROM Milho milho \
						
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON milho.id = fazendaProdutor.id \
						
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 20 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) armazenagem \
						ON armazenagem.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 21 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) limpeza \
						ON limpeza.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 22 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) secagem \
						ON secagem.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 23 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) recepcao \
						ON recepcao.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 24 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) carga \
						ON carga.IDFAZ = milho.id \
						
						HAVING TOTAL > 0 \

							ORDER BY PRODUTOR, FAZENDA"

	calcular_total_sintetizado
	
}

servico_sintetizado_faturar()
{

	comando_sql "SELECT fazendaProdutor.id AS ID, \
						produtor.nome AS PRODUTOR, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(entradas.armazenagem,0) AS ARMAZENAGEM, \
						IFNULL(entradas.recepcao,0) AS RECEPCAO, \
						IFNULL(entradas.limpeza,0) AS LIMPEZA, \
						IFNULL(entradas.secagem,0) AS SECAGEM, \
						IFNULL(entradas.carga,0) AS CARGA, \
						IFNULL(entradas.total,0) AS TOTAL \
						
					FROM Milho milho \
					
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON fazendaProdutor.id = milho.id \
					
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					
					LEFT JOIN ( \
								
						SELECT 	entMilho.fazendaProdutor_id AS IDFAZ, \
								0 AS ARMAZENAGEM, \
								SUM(IFNULL(entMilho.limpeza,0)) AS LIMPEZA, \
								SUM(IFNULL(entMilho.secagem,0)) AS SECAGEM, \
								SUM(IFNULL(entMilho.carga,0)) AS CARGA, \
								SUM(IFNULL(entMilho.recepcao,0)) AS RECEPCAO, \
								SUM(IFNULL(entMilho.total,0)) AS TOTAL \
							FROM Entmilho entMilho \
								INNER JOIN Milho milho \
								ON milho.id = entMilho.fazendaProdutor_id \
								WHERE entMilho.data > milho.dataFaturamento \
									GROUP BY IDFAZ \
						
					) entradas \
					ON entradas.IDFAZ = milho.id \
							
						HAVING TOTAL > 0 \

							ORDER BY PRODUTOR, FAZENDA"
							
	calcular_total_sintetizado_faturar

}

calcular_total_sintetizado_faturar()
{
	
	comando_sql "SELECT SUM(IFNULL(entradas.armazenagem,0)) AS ARMAZENAGEM, \
						SUM(IFNULL(entradas.recepcao,0)) AS RECEPCAO, \
						SUM(IFNULL(entradas.limpeza,0)) AS LIMPEZA, \
						SUM(IFNULL(entradas.secagem,0)) AS SECAGEM, \
						SUM(IFNULL(entradas.carga,0)) AS CARGA, \
						SUM(IFNULL(entradas.total,0)) AS TOTAL \
						
					FROM Milho milho \
					
					LEFT JOIN ( \
								
						SELECT 	entMilho.fazendaProdutor_id AS IDFAZ, \
								0 AS ARMAZENAGEM, \
								SUM(IFNULL(entMilho.limpeza,0)) AS LIMPEZA, \
								SUM(IFNULL(entMilho.secagem,0)) AS SECAGEM, \
								SUM(IFNULL(entMilho.carga,0)) AS CARGA, \
								SUM(IFNULL(entMilho.recepcao,0)) AS RECEPCAO, \
								SUM(IFNULL(entMilho.total,0)) AS TOTAL \
							FROM Entmilho entMilho \
								INNER JOIN Milho milho \
								ON milho.id = entMilho.fazendaProdutor_id \
								WHERE entMilho.data > milho.dataFaturamento \
									GROUP BY IDFAZ \
						
					) entradas \
					ON entradas.IDFAZ = milho.id"
		
}

calcular_total_sintetizado()
{
	
	comando_sql "SELECT COUNT(servico.ID) AS QTD, \
						SUM(servico.ARMAZENAGEM) AS ARMAZENAGEM, \
						SUM(servico.RECEPCAO) AS RECEPCAO, \
						SUM(servico.LIMPEZA) AS LIMPEZA, \
						SUM(servico.SECAGEM) AS SECAGEM, \
						SUM(servico.CARGA) AS CARGA, \
						SUM(servico.TOTAL) AS TOTAL \
					FROM ( \
					
				SELECT 	milho.id AS ID, \
						IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, \
						IFNULL(recepcao.TOTAL,0) AS RECEPCAO, \
						IFNULL(limpeza.TOTAL,0) AS LIMPEZA, \
						IFNULL(secagem.TOTAL,0) AS SECAGEM, \
						IFNULL(carga.TOTAL,0) AS CARGA, \
						
						IFNULL(armazenagem.TOTAL,0) + \
						IFNULL(recepcao.TOTAL,0) + \
						IFNULL(limpeza.TOTAL,0) + \
						IFNULL(secagem.TOTAL,0) + \
						IFNULL(carga.TOTAL,0) AS TOTAL \
						 
					FROM Milho milho \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 20 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) armazenagem \
						ON armazenagem.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 21 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) limpeza \
						ON limpeza.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 22 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) secagem \
						ON secagem.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 23 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) recepcao \
						ON recepcao.IDFAZ = milho.id \
						
						LEFT JOIN ( \
								
							SELECT 	servMilho.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servMilho.valor,0)) AS TOTAL \
								FROM Servmilho servMilho \
									WHERE servMilho.preco_id = 24 \
									AND servMilho.pago = 'N' \
										GROUP BY IDFAZ \
							
						) carga \
						ON carga.IDFAZ = milho.id \
						
						HAVING TOTAL > 0 \
					
					) AS servico "
		
}

mostrar_servico_manual()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						servMilho.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						preco.nome AS SERVICO, \
						servMilho.data AS DATA, \
						servMilho.liquido AS LIQUIDO, \
						servMilho.valor AS VALOR, \
						servMilho.obs AS OBS, \
						case when (servMilho.pago = 'Y') then true else false end AS PAGO, \
						servMilho.automatico AS AUTOMATICO \
					FROM Servmilho servMilho \
						INNER JOIN Preco preco \
						ON servMilho.preco_id = preco.id \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON servMilho.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						
						INNER JOIN Milho milho \
						ON milho.id = servMilho.fazendaProdutor_id \
						AND servMilho.data >= milho.dataFaturamento \
						AND servMilho.data <= '"$DATA_FINAL"' \
						AND servMilho.automatico = 'N' \
							ORDER BY DATA ASC, PRODUTOR, FAZENDA"
	
}

DATA_INICIO='2017-03-01'
DATA_FINAL='2017-03-31'

case "$1" in
	1)    	
		rodar_servico
		;; 
	2)
		mostrar_servico
		;;
	3)
		calcular_total
		;;
	4)
		mostrar_servico_teste
		;;
	5)
		servico_sintetizado
		;;
	6)
		servico_sintetizado_faturar
		;;
	7)
		mostrar_servico_manual
		;;
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-teste|5-sintetizado|6-faturar}"
		exit 1
		;;
esac
