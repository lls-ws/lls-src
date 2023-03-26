#!/bin/bash
# Script para ler arquivos txt e salvar no mysql
#
# email: lls.homeoffice@gmail.com

#comando_sql "SELECT COUNT(milho.id)

#comando_sql "SELECT milho.id AS ID, \
					#produtor.nome AS PRODUTOR, \
					#fazendaProdutor.nome AS FAZENDA, \
					#IFNULL(entmilho.bruto,0) AS BRUTO, \
					#IFNULL(entmilho.liquido,0) AS ENTRADA, \
					#(IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0)) AS saldo \

comando_sql "SELECT COUNT(milho.id), \
					SUM(IFNULL(entmilho.bruto,0)) AS BRUTO, \
					SUM(IFNULL(entmilho.liquido,0)) AS ENTRADA, \
					SUM((IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0))) AS saldo \
				FROM Milho milho \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON milho.id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido, \
							   sum(bruto) AS bruto \
							FROM Entmilho \
								WHERE data >= '2015-01-01' \
								AND data <= '2015-01-31' \
							GROUP BY fazendaProdutor_id \
					) AS entmilho \
					ON entmilho.id = milho.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido \
							FROM Saimilho \
								WHERE data >= '2015-01-01' \
								AND data <= '2015-01-31' \
							GROUP BY fazendaProdutor_id \
					) AS saimilho \
					ON saimilho.id = milho.id \
					WHERE (IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0)) <> 0"
					#ORDER BY PRODUTOR, FAZENDA \
					#LIMIT 1, 6"
					
