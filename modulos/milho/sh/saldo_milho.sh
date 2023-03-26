#!/bin/bash
# Script para gerar o relatorio de saldo de milho
#
# email: lls.homeoffice@gmail.com

#comando_sql "SELECT COUNT(milho.id)


#comando_sql "SELECT COUNT(milho.id), \
#					SUM(IFNULL(entmilho.bruto,0)) AS BRUTO, \
#					SUM(IFNULL(entmilho.liquido,0)) AS ENTRADA, \
#					SUM((IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0))) AS saldo \

comando_sql "SELECT milho.id AS ID, \
					produtor.nome AS PRODUTOR, \
					fazendaProdutor.nome AS FAZENDA, \
					IFNULL(milho.bruto,0) AS BRUTO, \
					milho.dataEntrada, \
					IFNULL(entmilho.liquidoEntrada,0), \
					milho.dataSaida, \
					IFNULL(milho.liquidoSaida,0), \
					milho.total \
				FROM Milho milho \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON milho.id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS fazenda_id, \
							   sum(liquido) AS liquidoEntrada \
							FROM Entmilho \
							GROUP BY fazendaProdutor_id \
					) AS entmilho \
					ON entmilho.fazenda_id = milho.id \
					WHERE (IFNULL(milho.total,0)) > 0 \
					ORDER BY produtor.nome, fazendaProdutor.nome"
					#LIMIT 1, 6"
					
