#!/bin/bash
# Script para retirar os dados de entrada de milho
#
# email: lls.homeoffice@gmail.com

#comando_sql "SELECT COUNT(milho.id)

#comando_sql "SELECT milho.id AS ID, \
					#produtor.nome AS PRODUTOR, \
					#fazendaProdutor.nome AS FAZENDA, \
					#IFNULL(entmilho.bruto,0) AS BRUTO, \
					#IFNULL(entmilho.liquido,0) AS ENTRADA, \
					#(IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0)) AS saldo \

comando_sql "SELECT entmilho.id AS id, \
					DATE_FORMAT(entmilho.data, '%d/%m/%Y') AS data, \
					entmilho.laudo AS laudo, \
					produtor.nome AS produtor, \
					fazendaProdutor.nome AS fazenda, \
					entmilho.bruto AS bruto, \
					entmilho.impureza AS impureza, \
					ROUND(entmilho.bruto * entmilho.impureza / 100, 0) AS valorImpureza, \
					umidade.codigo AS umidade, \
					umidade.desconto AS descontoUmidade, \
					ROUND(entmilho.bruto * (umidade.desconto / 100), 0) AS valorUmidade, \
					entmilho.quirela AS quirela, \
					ROUND(entmilho.bruto * entmilho.quirela / 100, 0) AS valorQuirela, \
					entmilho.chocho AS chocho, \
					ROUND(entmilho.bruto * entmilho.chocho / 100, 0) AS valorChocho, \
					entmilho.liquido AS liquido, \
					entmilho.recepcao AS recepcao, \
					entmilho.limpeza AS limpeza, \
					entmilho.secagem AS secagem, \
					entmilho.carga AS carga, \
					entmilho.total AS total \
				FROM Entmilho entmilho \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON entmilho.fazendaProdutor_id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					INNER JOIN Umidade umidade \
					ON entmilho.umidade_id = umidade.id \
					WHERE entmilho.data >= '2016-07-01' \
					AND entmilho.data <= '2016-07-31' \
					ORDER BY data, id"
					#LIMIT 1, 6"
					
