#!/bin/bash
# Script para gerar o relatorio de Saldo Geral de Cafe
#
# email: lls.homeoffice@gmail.com

resumo_cafe()
{

MES_SET="$1"
DATA_INICIAL="$2"
DATA_FINAL="$3"

ANO_SET="$4"

FILE_NAME="${PROJECT_NAME}/${MES_SET}_${ANO_SET}.txt"

CMD_SALDO="		FROM Cafe cafe \
					
					INNER JOIN FazendaProdutor fazendaProdutor \
					ON cafe.id = fazendaProdutor.id \
					INNER JOIN Produtor produtor \
					ON fazendaProdutor.produtor_id = produtor.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Entcafe \
								WHERE data < '"${DATA_INICIAL}"' \
								AND fechado = 'Y' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_entcafe \
					ON saldo_entcafe.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Saicafe \
								WHERE data < '"${DATA_INICIAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_saicafe \
					ON saldo_saicafe.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacasQuebra) AS sacasQuebra, \
							   sum(sacasAcrescimo) AS sacasAcrescimo \
							FROM Oscafe \
								WHERE data < '"${DATA_INICIAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_oscafe \
					ON saldo_oscafe.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Tracafe \
								WHERE data < '"${DATA_INICIAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS saldo_tracafe_origem \
					ON saldo_tracafe_origem.id = cafe.id \
					LEFT JOIN ( \
						SELECT fazendaDestino_id AS id, \
							   sum(sacas) AS sacas \
							FROM Tracafe \
								WHERE data < '"${DATA_INICIAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaDestino_id \
					) AS saldo_tracafe_destino \
					ON saldo_tracafe_destino.id = cafe.id \
					
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Entcafe \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
								AND fechado = 'Y' \
							GROUP BY fazendaProdutor_id \
					) AS entcafe \
					ON entcafe.id = cafe.id \
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Saicafe \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS saicafe \
					ON saicafe.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacas) AS sacas \
							FROM Tracafe \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS tracafe_origem \
					ON tracafe_origem.id = cafe.id \
					LEFT JOIN ( \
						SELECT fazendaDestino_id AS id, \
							   sum(sacas) AS sacas \
							FROM Tracafe \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaDestino_id \
					) AS tracafe_destino \
					ON tracafe_destino.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT fazendaProdutor_id AS id, \
							   sum(sacasQuebra) AS sacasQuebra, \
							   sum(sacasAcrescimo) AS sacasAcrescimo \
							FROM Oscafe \
								WHERE data >= '"${DATA_INICIAL}"' \
								AND data <= '"${DATA_FINAL}"' \
								AND status = 'FECHADA' \
							GROUP BY fazendaProdutor_id \
					) AS oscafe \
					ON oscafe.id = cafe.id \
					
					HAVING (SALDO) > 0 \
					OR (ENTRADAS + SAIDAS + QUEBRAS + ACRESCIMOS + RECEBIDAS + EMITIDAS) > 0"
			
${CMD_BASE} -e "SELECT \
					produtor.nome AS PRODUTOR, \
					fazendaProdutor.nome AS FAZENDA, \
					IFNULL(saldo_entcafe.sacas,0) + IFNULL(saldo_oscafe.sacasAcrescimo,0) + IFNULL(saldo_tracafe_destino.sacas,0) - \
					IFNULL(saldo_saicafe.sacas,0) - IFNULL(saldo_oscafe.sacasQuebra,0) - IFNULL(saldo_tracafe_origem.sacas,0) AS SALDO, \
					IFNULL(entcafe.sacas,0) AS ENTRADAS, \
					IFNULL(oscafe.sacasAcrescimo,0) AS ACRESCIMOS, \
					IFNULL(oscafe.sacasQuebra,0) AS QUEBRAS, \
					IFNULL(saicafe.sacas,0) AS SAIDAS, \
					IFNULL(tracafe_origem.sacas,0) AS EMITIDAS, \
					IFNULL(tracafe_destino.sacas,0) AS RECEBIDAS, \
					(IFNULL(saldo_entcafe.sacas,0)+IFNULL(saldo_oscafe.sacasAcrescimo,0)+IFNULL(saldo_tracafe_destino.sacas,0))- \
					(IFNULL(saldo_saicafe.sacas,0)+IFNULL(saldo_oscafe.sacasQuebra,0)+IFNULL(saldo_tracafe_origem.sacas,0))+ \
					(IFNULL(entcafe.sacas,0)+IFNULL(oscafe.sacasAcrescimo,0)+IFNULL(tracafe_destino.sacas,0))- \
					(IFNULL(saicafe.sacas,0)+IFNULL(oscafe.sacasQuebra,0)+IFNULL(tracafe_origem.sacas,0)) AS TOTAL \
					${CMD_SALDO} \
					ORDER BY PRODUTOR, FAZENDA" > ${FILE_NAME}
					
${CMD_BASE} -e "SELECT 'Resumo Movimento de cafe "${MES_SET}"_"${ANO_SET}"' AS RESUMO, \
					'De: ${DATA_INICIAL} ate ${DATA_FINAL}' AS PERIODO, \
					SUM( \
						IFNULL(saldo_entcafe.sacas,0) + IFNULL(saldo_oscafe.sacasAcrescimo,0) + IFNULL(saldo_tracafe_destino.sacas,0) - \
						IFNULL(saldo_saicafe.sacas,0) - IFNULL(saldo_oscafe.sacasQuebra,0) - IFNULL(saldo_tracafe_origem.sacas,0)
					) AS SALDO, \
					SUM(IFNULL(entcafe.sacas,0)) AS ENTRADAS, \
					SUM(IFNULL(oscafe.sacasAcrescimo,0)) AS ACRESCIMOS, \
					SUM(IFNULL(oscafe.sacasQuebra,0)) AS QUEBRAS, \
					SUM(IFNULL(saicafe.sacas,0)) AS SAIDAS, \
					SUM(IFNULL(tracafe_origem.sacas,0)) AS EMITIDAS, \
					SUM(IFNULL(tracafe_destino.sacas,0)) AS RECEBIDAS, \
					SUM( \
					IFNULL(saldo_entcafe.sacas,0) + IFNULL(saldo_oscafe.sacasAcrescimo,0) + IFNULL(saldo_tracafe_destino.sacas,0) - \
					IFNULL(saldo_saicafe.sacas,0) - IFNULL(saldo_oscafe.sacasQuebra,0) - IFNULL(saldo_tracafe_origem.sacas,0) + \
					IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacasAcrescimo,0) - \
					IFNULL(saicafe.sacas,0) - IFNULL(oscafe.sacasQuebra,0) \
					) AS TOTAL \
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

${CMD_BASE} -e "select 	COUNT(ID) AS QTD, \
						SUM(fatCafe.saldoAnterior) AS ANTERIOR, \
						SUM(fatCafe.entradas) AS ENTRADAS, \
						SUM(fatCafe.saidas) AS SAIDAS, \
						SUM(fatCafe.quebras) AS QUEBRAS, \
						SUM(fatCafe.acrescimos) AS ACRESCIMOS, \
						SUM(fatCafe.recebidas) AS RECEBIDAS, \
						SUM(fatCafe.emitidas) AS EMITIDAS, \
						SUM(fatCafe.saldo) AS SALDO \
					FROM Fatcafe fatCafe \
						WHERE fatCafe.data = '2023-04-30'"

rm -rfv ${PROJECT_NAME}

mkdir -v ${PROJECT_NAME}

#resumo_cafe "Setembro" "2022-09-01" "2022-09-30" "2022"
#resumo_cafe "Outubro" "2018-10-01" "2018-10-31" "2018"
#resumo_cafe "Novembro" "2022-11-01" "2022-11-30" "2022"
#resumo_cafe "Dezembro" "2022-12-01" "2022-12-31" "2022"
resumo_cafe "Maio" "2023-05-01" "2023-05-15" "2023"

chown -Rv lls.lls ${PROJECT_NAME}

ls -al ${PROJECT_NAME}
