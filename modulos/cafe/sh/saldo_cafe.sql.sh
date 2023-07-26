#!/bin/bash
# Script para mostrar os saldos dos produtores de cafe
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/cafe/sh:$PATH
. lib_cafe.sql.sh		|| exit 1

getConsultaLote()
{
	
	setCondicaoConsulta "$1" "$2" "$3"
	
	QUERY_LOTE="SELECT fazendaProdutor.id AS id, 
					   COUNT(lote.id) AS lotes, 
					   IFNULL(SUM(IF(lote.saldoSacas = 0, lote.sacas, lote.saldoSacas)),0) AS sacas, 
					   IFNULL(SUM(IF(lote.saldoPeso = 0, lote.peso, lote.saldoPeso)),0) AS peso 
						 
					FROM Lote lote 
					
					INNER JOIN ${TABELA}_Lote ${TABELA_MIN}_Lote 
					ON ${TABELA_MIN}_Lote.lote_id = lote.id 
					
					INNER JOIN ${TABELA} ${TABELA_MIN} 
					ON ${TABELA_MIN}_Lote.${TABELA_MIN}_id = ${TABELA_MIN}.id 
					
					INNER JOIN FazendaProdutor fazendaProdutor 
					ON ${TABELA_MIN}.${CONDICAO_FAZENDA} = fazendaProdutor.id 
					
					WHERE ${TABELA_MIN}.${CONDICAO_STATUS} 
					${CONDICAO_SALDO} 
					${CONDICAO_PRODUTOR} 
						${CONDICAO_GROUP} ";
					
}

getConsultaDespejo()
{
	
	setCondicaoConsulta "$1" "$2" "$3"
	
	if [ ${TIPO_LOTE} != 1 ]; then
	
		QUERY_DESPEJO="SELECT fazendaProdutor.id AS id, 
							  IFNULL(SUM(${TABELA_MIN}_Despejo.sacas), 0) AS sacas 
							 
							FROM ${TABELA}_Despejo ${TABELA_MIN}_Despejo 
							
							INNER JOIN ${TABELA} ${TABELA_MIN} 
							ON ${TABELA_MIN}_Despejo.${TABELA_MIN}_id = ${TABELA_MIN}.id 
							
							INNER JOIN FazendaProdutor fazendaProdutor 
							ON ${TABELA_MIN}.${CONDICAO_FAZENDA} = fazendaProdutor.id 
							
							WHERE ${TABELA_MIN}.${CONDICAO_STATUS} 
							${CONDICAO_PRODUTOR} 
								${CONDICAO_GROUP} "
								
	else
	
		QUERY_DESPEJO="SELECT 0 AS id, 0 AS sacas"
	
	fi
					
}

getConsulta()
{
	
	TIPO_LOTE="$1"
	
	setCondicaoLote "${TIPO_LOTE}"
	
	setCondicaoProdutor
	
	QUERY="SELECT produtor.nome AS produtor,
				  fazendaProdutor.nome AS fazenda,
				  IFNULL(entcafe.id,0) + IFNULL(oscafe.id,0) + IFNULL(tracafe.id,0) AS qtdLotes, 
				  IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) AS sacas, 
				  IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0) AS peso, 
				  ROUND(
					  (IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0)) /
					  (IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0))
				  ,2) AS media, 
				  IFNULL(servico.sacas,0) AS servico, 
				  IFNULL(saida.sacas,0) AS saida, 
				  IFNULL(transferida.sacas,0) AS transferida, 
				  IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) +
				  IFNULL(servico.sacas,0) + IFNULL(saida.sacas,0) + IFNULL(transferida.sacas,0) AS total
				 
				FROM FazendaProdutor fazendaProdutor 
				
				INNER JOIN Produtor produtor
				ON fazendaProdutor.produtor_id = produtor.id 
				${CONDICAO_PRODUTOR}"
				
	TOTAL_CONSULTA=0
	
	criar_consulta "${TOTAL_CONSULTA}"
	
}

getConsulta_total()
{
	
	TIPO_LOTE="$1"
	
	setCondicaoLote "${TIPO_LOTE}"
	
	setCondicaoProdutor
	
	QUERY="SELECT 'Resumo Movimento de cafe "${MES_SET}"_"${ANO_SET}"' AS RESUMO, 
				  'De: ${DATA_INICIAL} ate ${DATA_FINAL}' AS PERIODO, 
				  COUNT(fazendaProdutor.id) AS qtdFazendas, 
				  IFNULL(SUM(entcafe.lotes),0) + IFNULL(SUM(oscafe.lotes),0) + IFNULL(SUM(tracafe.lotes),0) AS qtdLotes, 
				  IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0) AS sacas, 
				  IFNULL(SUM(entcafe.peso),0) + IFNULL(SUM(oscafe.peso),0) + IFNULL(SUM(tracafe.peso),0) AS peso, 
				  IFNULL(ROUND(
					  (IFNULL(SUM(entcafe.peso),0) + IFNULL(SUM(oscafe.peso),0) + IFNULL(SUM(tracafe.peso),0)) /
					  (IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0))
				  ,2), 0) AS media, 
				  IFNULL(SUM(servico.sacas),0) AS servico, 
				  IFNULL(SUM(saida.sacas),0) AS saida, 
				  IFNULL(SUM(transferida.sacas),0) AS transferida, 
				  IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0) +
				  IFNULL(SUM(servico.sacas),0) + IFNULL(SUM(saida.sacas),0) + IFNULL(SUM(transferida.sacas),0) AS total 
	
				FROM FazendaProdutor fazendaProdutor 
				
				INNER JOIN Produtor produtor
				ON fazendaProdutor.produtor_id = produtor.id 
				${CONDICAO_PRODUTOR}"
	
	TOTAL_CONSULTA=1
	
	criar_consulta "${TOTAL_CONSULTA}"
	
}

criar_consulta()
{
	
	TOTAL_CONSULTA="$1"
	
	TABELAS=(
		"Entcafe"
		"Oscafe"
		"Tracafe"
	)
	
	TABELAS_DESPEJO=(
		"Oscafe"
		"Saicafe"
		"Tracafe"
	)
	
	ALIAS=(
		"servico"
		"saida"
		"transferida"
	)
	
	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
		
		TIPO_CONSULTA=0
		
		getConsultaLote "${NOME_TABELA}" "${TOTAL_CONSULTA}" "${TIPO_CONSULTA}"
		
		QUERY+="LEFT JOIN (${QUERY_LOTE}) AS ${TABELA_MIN} 
				ON ${TABELA_MIN}.id = fazendaProdutor.id "
		
		TIPO_CONSULTA=1
			
		getConsultaDespejo "${TABELAS_DESPEJO[${COUNT}]}" "${TOTAL_CONSULTA}" "${TIPO_CONSULTA}"
			
		QUERY+="LEFT JOIN (${QUERY_DESPEJO}) AS ${ALIAS[${COUNT}]} 
				ON ${ALIAS[${COUNT}]}.id = fazendaProdutor.id "
					
		let COUNT++
		
	done

	QUERY+="WHERE IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) + 
			      IFNULL(servico.sacas,0) + IFNULL(saida.sacas,0) + IFNULL(transferida.sacas,0) > 0 "
	
	if [ ${TOTAL_CONSULTA} -eq 0 ]; then
	
		QUERY+="ORDER BY produtor, fazenda "
		
	fi
	
	${CMD_BASE} -e "${QUERY}" >> ${FILE_NAME}
	
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

rm -rf /home/${USER}/${PROJECT_NAME}
mkdir -v /home/${USER}/${PROJECT_NAME}

MES_SET="2023"
ANO_SET="2023"

FILE_NAME="/home/${USER}/${PROJECT_NAME}/${MES_SET}_${ANO_SET}.txt"

case "$2" in
	1)
		getConsulta_total "${TIPO_LOTE}"
		;;
	*)
		getConsulta "${TIPO_LOTE}"
		getConsulta_total "${TIPO_LOTE}"
		;;
esac
