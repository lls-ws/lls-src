#!/bin/bash
# Script para atualizar UTZ na OBS dos lotes de café
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:/home/projetos/cafe/sh:$PATH
. lib_cafe.sql.sh		|| exit 1
. lib_config.sh			|| exit 1

getUpdate()
{
	
	setCondicaoConsulta "$1" "0" "0"
	
	QUERY="UPDATE Lote lote 
						 
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
			
			SET lote.obs = CONCAT('UTZ ', lote.obs) 
			WHERE ${TABELA_MIN}.${CONDICAO_STATUS} 
			${CONDICAO_SALDO} 
			${CONDICAO_PRODUTOR} ";
					
}

setConsulta()
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
	
	comando_sql
	
	TABELAS=(
		"Entcafe"
		"Oscafe"
		"Tracafe"
	)
	
	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
		
		getUpdate "${NOME_TABELA}"
		
		${CMD_BASE} -e "${QUERY}" > update.txt
		
		let COUNT++
		
	done
	
}

sh sh/extrato_lote.sql.sh 
mv -v extrato.txt extrato.old.txt

setConsulta "${TIPO_LOTE}"
sh sh/extrato_lote.sql.sh
