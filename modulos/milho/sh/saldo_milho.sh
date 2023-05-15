#!/bin/bash
# Script para conferir o relatorio de Saldo das Fichas de Milho
#
# email: lls.homeoffice@gmail.com

if [ "$EUID" -ne 0 ]; then
	echo "Run script as root!"
	exit 1
  
fi

USER=`git config user.name`

if [ -z "${USER}" ]; then
		
	echo "Not found a user name!"
	echo "Use: git_conf.sh name {NAME}"
	exit 1
	
fi

PASSWORD=`git config user.password`

if [ -z "${PASSWORD}" ]; then
	
	echo "Not found a user password!"
	echo "Use: git_conf.sh password {PASSWORD}"
	exit 1
	
fi

CMD_BASE="mysql -u root --password=${PASSWORD} -D bd_${USER}"

#${CMD_BASE} -e "SHOW TABLES"
#${CMD_BASE} -e "SELECT COUNT(id) FROM Milho"

#comando_sql "SELECT COUNT(milho.id), \
#					SUM(IFNULL(entmilho.bruto,0)) AS BRUTO, \
#					SUM(IFNULL(entmilho.liquido,0)) AS ENTRADA, \
#					SUM((IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0))) AS saldo \

${CMD_BASE} -e "SELECT milho.id AS ID, \
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
					
