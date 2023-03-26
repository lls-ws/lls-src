#!/bin/bash
# Script para mostrar os lotes de cafe
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:/home/projetos/cafe/sh:$PATH
. lib_cafe.sql.sh		|| exit 1
. lib_config.sh			|| exit 1

getConsultaLote()
{
	
	setCondicaoConsulta "$1" "0" "0"
	
	QUERY_LOTE="SELECT DATE_FORMAT(${TABELA_MIN}.data, '%d/%m/%Y') AS data,
						lote.lote AS lote,
						lote.obs AS obs,
						lote.pilha AS pilha,
						IF(lote.saldoSacas = 0, lote.sacas, lote.saldoSacas) AS sacas, 
						IF(lote.saldoSacas = 0, lote.peso, lote.saldoPeso) AS peso, 
						peneira.nome AS peneira, 
						fazendaProdutor.nome AS fazenda, 
						produtor.nome AS produtor 
						 
					FROM Lote lote 
					
					INNER JOIN Peneira peneira 
					ON lote.peneira_id = peneira.id 
					
					INNER JOIN ${TABELA}_Lote ${TABELA_MIN}_Lote 
					ON ${TABELA_MIN}_Lote.lote_id = lote.id 
					
					INNER JOIN ${TABELA} ${TABELA_MIN} 
					ON ${TABELA_MIN}_Lote.${TABELA_MIN}_id = ${TABELA_MIN}.id 
					
					INNER JOIN FazendaProdutor fazendaProdutor 
					ON ${TABELA_MIN}.${CONDICAO_FAZENDA} = fazendaProdutor.id 
					
					INNER JOIN Produtor produtor 
					ON fazendaProdutor.produtor_id = produtor.id 
					
					WHERE ${TABELA_MIN}.${CONDICAO_STATUS} 
					${CONDICAO_SALDO} 
					${CONDICAO_PRODUTOR} ";
					
}

getConsulta()
{
	
	TIPO_LOTE="$1"
	
	setCondicaoProdutor
	
	setCondicaoLote "${TIPO_LOTE}"
	
	QUERY=""
				
	criar_consulta
	
	echo "${QUERY}" > extrato.sql
	
}

criar_consulta()
{
	
	TABELAS=(
		"Entcafe"
		"Oscafe"
		"Tracafe"
	)
	
	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
		
		getConsultaLote "${NOME_TABELA}"
		
		if [ ${COUNT} -eq 0 ]; then
			
			QUERY="${QUERY_LOTE} "
			
		else
			
			QUERY+="UNION ALL 
					${QUERY_LOTE} "
			
		fi
			
		let COUNT++
		
	done

	QUERY+="ORDER BY produtor, fazenda, lote, data "
	
	comando_sql
	
	${CMD_BASE} -e "${QUERY}" > extrato.txt
	
}

getConsulta "${TIPO_LOTE}"
#sh saldo_cafe.sql.sh "${TIPO_LOTE}" "1"
