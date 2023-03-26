#!/bin/bash
# Script para calcular e mostrar o servico de cafe
#
# email: lls.homeoffice@gmail.com

rodar_servico()
{

	comando_sql "DELETE FROM Servcafe WHERE pago = 'N' AND automatico = 'Y' AND data = '"$DATA_FINAL"'"

	comando_sql "INSERT INTO Servcafe (fazendaProdutor_id, preco_id, data, sacas, valor, automatico, pago, obs) \
				 
				 SELECT fatCafe.fazendaProdutor_id AS ID_FAZ, \
						preco.id AS ID_PRECO, \
						fatCafe.data AS DATA, \
						fatCafe.saldo AS SACAS, \
						fatCafe.armazenagem AS VALOR, \
						'Y' AS AUTOMATICO, \
						'N' AS PAGO, \
						CONCAT(preco.nome, ' ', MONTH(fatCafe.data), '/', YEAR(fatCafe.data)) AS OBS \
					FROM Fatcafe fatCafe \
						INNER JOIN Preco preco \
						ON preco.id = 16 \
						AND fatCafe.data = '"$DATA_FINAL"' \
						AND fatCafe.armazenagem > 0 "
					
	atualiza_cafe
	
	mostrar_servico
	
}

mostrar_servico()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						servCafe.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						preco.nome AS SERVICO, \
						servCafe.data AS DATA, \
						servCafe.sacas AS SACAS, \
						servCafe.valor AS TOTAL, \
						IFNULL(baixas.PAGO, 0) AS PAGO, \
						(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR, \
						servCafe.obs AS OBS, \
						servCafe.automatico AS AUTOMATICO \
					
					FROM Servcafe servCafe \
						
						INNER JOIN Preco preco \
						ON servCafe.preco_id = preco.id \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON servCafe.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						LEFT JOIN ( \
										
							SELECT  servCafe_id AS ID_SERV, \
									SUM(valor) AS PAGO \
								FROM Baixacafe \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servCafe.id \
						
						WHERE servCafe.data >= '"$DATA_FINAL"' \
						HAVING VALOR > 0 \
							ORDER BY DATA ASC, PRODUTOR, FAZENDA"

	calcular_total
	
}

calcular_total()
{
	
	comando_sql "SELECT SUM(servCafe.valor) AS TOTAL, \
						SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					
					FROM Servcafe servCafe \
						
						LEFT JOIN ( \
										
							SELECT  servCafe_id AS ID_SERV, \
									SUM(valor) AS PAGO \
								FROM Baixacafe \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servCafe.id \
						
							WHERE servCafe.data >= '"$DATA_INICIO"' \
							AND servCafe.data <= '"$DATA_FINAL"'"
	
}

servico_sintetizado()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, \
						IFNULL(servico.TOTAL,0) AS SERVICO, \
						(IFNULL(armazenagem.TOTAL,0) + IFNULL(servico.TOTAL,0)) AS TOTAL \
					
					FROM Cafe cafe \
						
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON cafe.id = fazendaProdutor.id \
						
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						
						LEFT JOIN ( \
								
							SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
								FROM Servcafe servCafe \
									WHERE servCafe.preco_id = 16 \
									AND servCafe.pago = 'N' \
										GROUP BY IDFAZ \
							
						) armazenagem \
						ON armazenagem.IDFAZ = cafe.id \
						
						LEFT JOIN ( \
								
							SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
								FROM Servcafe servCafe \
									WHERE servCafe.preco_id NOT IN (16) \
									AND servCafe.pago = 'N' \
										GROUP BY IDFAZ \
							
						) servico \
						ON servico.IDFAZ = cafe.id \
						
						HAVING TOTAL > 0 \

							ORDER BY PRODUTOR, FAZENDA"

	calcular_total_sintetizado
	
}

calcular_total_sintetizado()
{
	
	comando_sql "SELECT COUNT(servico.ID) AS QTD, \
						SUM(servico.ARMAZENAGEM) AS ARMAZENAGEM, \
						SUM(servico.OUTROS) AS OUTROS, \
						SUM(servico.TOTAL) AS TOTAL \
					FROM ( \
					
				SELECT 	cafe.id AS ID, \
						IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, \
						IFNULL(serv.TOTAL,0) AS OUTROS, \
						IFNULL(armazenagem.TOTAL,0) + IFNULL(serv.TOTAL,0) AS TOTAL \
						 
					FROM Cafe cafe \
						
						LEFT JOIN ( \
								
							SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
								FROM Servcafe servCafe \
									WHERE servCafe.preco_id = 16 \
									AND servCafe.pago = 'N' \
										GROUP BY IDFAZ \
							
						) armazenagem \
						ON armazenagem.IDFAZ = cafe.id \
						
						LEFT JOIN ( \
								
							SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
									SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
								FROM Servcafe servCafe \
									WHERE servCafe.preco_id NOT IN (16) \
									AND servCafe.pago = 'N' \
										GROUP BY IDFAZ \
							
						) serv \
						ON serv.IDFAZ = cafe.id \
						
						HAVING TOTAL > 0 \
					
					) AS servico "
		
}

servico_sintetizado_faturar()
{

	comando_sql "SELECT fazendaProdutor.id AS ID, \
						produtor.nome AS PRODUTOR, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(servico.armazenagem,0) AS ARMAZENAGEM, \
						IFNULL(servico.total,0) AS SERVICO, \
						IFNULL(servico.total,0) AS TOTAL \
						
					FROM Cafe cafe \
					
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON fazendaProdutor.id = cafe.id \
					
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					
					LEFT JOIN ( \
								
						SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
								0 AS ARMAZENAGEM, \
								SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
							FROM Servcafe servCafe \
								INNER JOIN Cafe cafe \
								ON cafe.id = servCafe.fazendaProdutor_id \
								WHERE servCafe.data > cafe.dataFaturamento \
								AND servCafe.pago = 'N' \
									GROUP BY IDFAZ \
						
					) servico \
					ON servico.IDFAZ = cafe.id \
							
						HAVING TOTAL > 0 \

							ORDER BY PRODUTOR, FAZENDA"
							
	calcular_total_sintetizado_faturar

}

calcular_total_sintetizado_faturar()
{
	
	comando_sql "SELECT SUM(IFNULL(servico.armazenagem,0)) AS ARMAZENAGEM, \
						SUM(IFNULL(servico.total,0)) AS SERVICO, \
						SUM(IFNULL(servico.total,0)) AS TOTAL \
						
					FROM Cafe cafe \
					
					LEFT JOIN ( \
								
						SELECT 	servCafe.fazendaProdutor_id AS IDFAZ, \
								0 AS ARMAZENAGEM, \
								SUM(IFNULL(servCafe.valor,0)) AS TOTAL \
							FROM Servcafe servCafe \
								INNER JOIN Cafe cafe \
								ON cafe.id = servCafe.fazendaProdutor_id \
								WHERE servCafe.data > cafe.dataFaturamento \
								AND servCafe.pago = 'N' \
									GROUP BY IDFAZ \
						
					) servico \
					ON servico.IDFAZ = cafe.id"
		
}

mostrar_servico_manual()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						servCafe.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						preco.nome AS SERVICO, \
						servCafe.data AS DATA, \
						servCafe.sacas AS SACAS, \
						servCafe.valor AS VALOR, \
						servCafe.obs AS OBS, \
						case when (servCafe.pago = 'Y') then true else false end AS PAGO, \
						servCafe.automatico AS AUTOMATICO \
					
					FROM Servcafe servCafe \
						
						INNER JOIN Preco preco \
						ON servCafe.preco_id = preco.id \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON servCafe.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						
						INNER JOIN Cafe cafe \
						ON cafe.id = servCafe.fazendaProdutor_id \
						AND servCafe.data >= cafe.dataFaturamento \
						AND servCafe.data <= '"$DATA_FINAL"' \
						AND servCafe.automatico = 'N' \
							ORDER BY DATA ASC, PRODUTOR, FAZENDA"
	
}

atualiza_cafe()
{

	comando_sql "INSERT INTO Cafe (id, dataFaturamento) \
		
					 SELECT fazendaProdutor.id AS id, \
							empresa.dataCafe AS data \
								
						FROM FazendaProdutor fazendaProdutor \
						
						INNER JOIN Empresa empresa \
						ON empresa.id = 1 \
					
						LEFT JOIN ( \
							SELECT 	fazendaProdutor_id AS idFaz, \
									pago AS pago \
								FROM Servcafe \
						) AS servico \
						ON servico.idFaz = fazendaProdutor.id \
						WHERE servico.pago = 'N' \
							GROUP BY id
				
				ON DUPLICATE KEY UPDATE dataFaturamento = dataFaturamento "
				
	comando_sql "SELECT COUNT(cafe.id) AS Qtd_Servico \
					FROM Cafe cafe \
					
						INNER JOIN Empresa empresa \
						ON empresa.id = 1 \
						
						WHERE cafe.dataFaturamento = empresa.dataCafe"
	
}

resumo_servico()
{
	
	comando_sql "SELECT preco.id AS ID, \
						servico.valor AS TOTAL, \
						preco.nome AS DESCRICAO \
						
					FROM Preco preco \
						
						LEFT JOIN ( \
										
							SELECT 	servCafe.preco_id AS ID_PRECO, \
									SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
								
								FROM Servcafe servCafe \
								
									LEFT JOIN ( \
													
										SELECT  servCafe_id AS ID_SERV, \
												SUM(valor) AS PAGO \
											FROM Baixacafe \
												GROUP BY ID_SERV \
										
									) baixas \
									ON baixas.ID_SERV = servCafe.id \
									
									WHERE servCafe.data >= '"$DATA_INICIO"' \
									AND servCafe.data <= '"$DATA_FINAL"' \
									AND servCafe.pago = 'N' \
										GROUP BY ID_PRECO \
										
						) servico \
						ON servico.ID_PRECO = preco.id \
						HAVING TOTAL > 0"
	
	resumo_servico_total
	
}

resumo_servico_total()
{
	
	comando_sql "SELECT COUNT(servico.ID_PRECO) AS QTD, \
						SUM(servico.valor) AS TOTAL \
						
					FROM Preco preco \
						
						LEFT JOIN ( \
										
							SELECT 	servCafe.preco_id AS ID_PRECO, \
									SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
								
								FROM Servcafe servCafe \
								
									LEFT JOIN ( \
													
										SELECT  servCafe_id AS ID_SERV, \
												SUM(valor) AS PAGO \
											FROM Baixacafe \
												GROUP BY ID_SERV \
										
									) baixas \
									ON baixas.ID_SERV = servCafe.id \
									
									WHERE servCafe.data >= '"$DATA_INICIO"' \
									AND servCafe.data <= '"$DATA_FINAL"' 
									AND servCafe.pago = 'N' \
										
										GROUP BY ID_PRECO \
										
						) servico \
						ON servico.ID_PRECO = preco.id "
	
}

DATA_INICIO='2018-08-01'
DATA_FINAL='2018-08-31'

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
		atualiza_cafe
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
	8)
		resumo_servico
		;;
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-atualiza|5-sintetizado|6-faturar|7-manual|8-resumo}"
		exit 1
		;;
esac
