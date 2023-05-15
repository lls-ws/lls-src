#!/bin/bash
# Script para gerar o relatorio de Saldo Geral de Milho
#
# email: lls.homeoffice@gmail.com

resumo_milho()
{

MES_SET="$1"
DATA_INICIAL="$2"
DATA_FINAL="$3"

ANO_SET="$4"

FILE_NAME="${PROJECT_NAME}/${MES_SET}_${ANO_SET}.txt"

CMD_SALDO="		FROM Milho milho \
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON milho.id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido \
							FROM Entmilho \
								WHERE data < '"${DATA_INICIAL}"' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_entmilho \
					ON saldo_entmilho.id = milho.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido \
							FROM Saimilho \
								WHERE data < '"${DATA_INICIAL}"' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_saimilho \
					ON saldo_saimilho.id = milho.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido \
							FROM Entmilho \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
							GROUP BY fazendaProdutor_id \
					) AS entmilho \
					ON entmilho.id = milho.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(liquido) AS liquido \
							FROM Saimilho \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
							GROUP BY fazendaProdutor_id \
					) AS saimilho \
					ON saimilho.id = milho.id \
					
					WHERE (IFNULL(saldo_entmilho.liquido,0)-IFNULL(saldo_saimilho.liquido,0)) > 0 \
					OR (IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0)) > 0"
			
${CMD_BASE} -e "SELECT \
					produtor.nome AS PRODUTOR, \
					fazendaProdutor.nome AS FAZENDA, \
					(IFNULL(saldo_entmilho.liquido,0)-IFNULL(saldo_saimilho.liquido,0)) AS SALDO, \
					IFNULL(entmilho.liquido,0) AS ENTRADAS, \
					IFNULL(saimilho.liquido,0) AS SAIDAS, \
					(IFNULL(saldo_entmilho.liquido,0)-IFNULL(saldo_saimilho.liquido,0))+(IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0)) AS TOTAL \
					${CMD_SALDO} \
					ORDER BY PRODUTOR, FAZENDA" > ${FILE_NAME}
					
${CMD_BASE} -e "SELECT 'Resumo Movimento de Milho "${MES_SET}"_"${ANO_SET}"' AS RESUMO, \
					'De: ${DATA_INICIAL} ate ${DATA_FINAL}' AS PERIODO, \
					SUM((IFNULL(saldo_entmilho.liquido,0)-IFNULL(saldo_saimilho.liquido,0))) AS SALDO, \
					SUM(IFNULL(entmilho.liquido,0)) AS ENTRADAS, \
					SUM(IFNULL(saimilho.liquido,0)) AS SAIDAS, \
					SUM((IFNULL(saldo_entmilho.liquido,0)-IFNULL(saldo_saimilho.liquido,0))+(IFNULL(entmilho.liquido,0)-IFNULL(saimilho.liquido,0))) AS TOTAL \
					${CMD_SALDO}" >> ${FILE_NAME}
					
chown -v lls.lls ${FILE_NAME}
					
su lls -c "geany ${FILE_NAME}"

}

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

CMD_BASE="mysql -u root --password=${PASSWORD} -D bd_${USER} --table"

PROJECT_NAME="lls-txt"

clear

rm -rfv ${PROJECT_NAME}

mkdir -v ${PROJECT_NAME}

resumo_milho "Setembro" "2022-09-01" "2022-09-30" "2022"
resumo_milho "Outubro" "2022-10-01" "2022-10-31" "2022"
resumo_milho "Novembro" "2022-11-01" "2022-11-30" "2022"
resumo_milho "Dezembro" "2022-12-01" "2022-12-31" "2022"
resumo_milho "2023" "2023-01-01" "2023-05-14" "2023"

chown -Rv lls.lls ${PROJECT_NAME}

ls -al ${PROJECT_NAME}
