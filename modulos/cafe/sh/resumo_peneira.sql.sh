#!/bin/bash
# Script para mostrar o resumo dos saldos por peneiras de cafe
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/cafe/sh:$PATH
. lib_cafe.sql.sh		|| exit 1

getConsultaLote()
{
	
	setCondicaoConsulta "$1" "$2" "$3"
	
	QUERY_LOTE="SELECT lote.peneira_id AS id, 
					   fazendaProdutor.id AS id_fazenda, 
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

getConsulta()
{
	
	TIPO_LOTE="$1"
	
	setCondicaoLote "${TIPO_LOTE}"
	
	setCondicaoProdutor
	
	QUERY="SELECT peneira.id AS id, 
				  IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) AS sacas, 
				  IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0) AS peso, 
				  peneira.nome AS nome 
				 
				FROM Peneira peneira "
				
	TOTAL_CONSULTA=0
	
	criar_consulta "${TOTAL_CONSULTA}"
	
}

getConsulta_total()
{
	
	TIPO_LOTE="$1"
	
	setCondicaoLote "${TIPO_LOTE}"
	
	setCondicaoProdutor
	
	QUERY="SELECT COUNT(peneira.id) AS qtdPeneiras, 
				  IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0) AS sacas, 
				  IFNULL(SUM(entcafe.peso),0) + IFNULL(SUM(oscafe.peso),0) + IFNULL(SUM(tracafe.peso),0) AS peso
	
				FROM Peneira peneira "
	
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
	
	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
		
		TIPO_CONSULTA=0
		
		getConsultaLote "${NOME_TABELA}" "${TOTAL_CONSULTA}" "${TIPO_CONSULTA}"
		
		QUERY+="LEFT JOIN (${QUERY_LOTE}) AS ${TABELA_MIN} 
				ON ${TABELA_MIN}.id = peneira.id "
		
		let COUNT++
		
	done

	QUERY+="WHERE IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) > 0 "
	
	if [ ${TOTAL_CONSULTA} -eq 0 ]; then
	
		QUERY+="ORDER BY nome "
		
	fi
	
	comando_sql "${QUERY}"
	
}

case "$2" in
	1)
		getConsulta_total "${TIPO_LOTE}"
		;;
	*)
		getConsulta "${TIPO_LOTE}"
		getConsulta_total "${TIPO_LOTE}"
		;;
esac
