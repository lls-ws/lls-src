#!/bin/bash
# Script para atualizar como fechadas as entradas de café
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

set_abertas()
{
	
	if [ ${COUNT} -eq 0 ]; then
		
		set_condicao_status "${TIPOS[0]}"
	
	else
	
		set_condicao_status "${STATUS[0]}"
	
	fi
	
	${CMD_BASE} -e "UPDATE ${TABELA} ${NOME_TABELA} SET ${NOME_TABELA}.${CONDICAO_STATUS}"
	
}

set_condicao_status()
{
	
	OPCAO="$1"
	
	if [ ${COUNT} -eq 0 ]; then
	
		CONDICAO_STATUS="fechado = '"${OPCAO}"'"
	
	else
	
		CONDICAO_STATUS="status = '"${OPCAO}"'"
	
	fi
	
}

mostra_tipo()
{
	
	set_condicao_status "$1"
	
	${CMD_BASE} -e "\
			SELECT COUNT(*) AS QTD_$1 \
				FROM ${TABELA} ${NOME_TABELA} \
				WHERE ${NOME_TABELA}.${CONDICAO_STATUS}"
	
}

atualiza()
{

	TABELAS=(
		"entcafe"
		"oscafe"
		"tracafe"
		"saicafe"
	)
	
	TIPOS=(
		"N"
		"Y"
	)
	
	STATUS=(
		"ABERTA"
		"DESPEJADA"
		"FECHADA"
	)
	
	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
		
		TABELA=`echo "${NOME_TABELA}" | awk '{ print toupper(substr($NOME_TABELA, 1, 1)) substr($NOME_TABELA, 2) }'`
		
		set_abertas
		
		if [ ${COUNT} -lt 3 ]; then
		
			if [ ${COUNT} -eq 0 ]; then
		
				atualiza_fechado
				
				exclui_abertos
				atualiza_abertos
				
				mostra_tipo "${TIPOS[0]}"
				mostra_tipo "${TIPOS[1]}"
				
			else
		
				atualiza_despejado
				atualiza_fechado
				
				exclui_abertos
				atualiza_abertos
				exclui_despejos
				
				mostra_tipo "${STATUS[0]}"
				mostra_tipo "${STATUS[1]}"
				mostra_tipo "${STATUS[2]}"
				
			fi
			
		else
		
			atualiza_despejado
			
			exclui_abertos
			
			mostra_tipo "${STATUS[0]}"
			mostra_tipo "${STATUS[1]}"
			mostra_tipo "${STATUS[2]}"
		
		fi
		
		let COUNT++
		
	done
	
	apaga_lotes
	
}

atualiza_fechado()
{

	echo "Status da tabela ${TABELA}"

	if [ ${COUNT} -eq 0 ]; then
		
		set_condicao_status "${TIPOS[1]}"
	
		CONDICAO_DESPEJADA="AND ${NOME_TABELA}.fechado = '"${TIPOS[0]}"'"
	
	else
	
		set_condicao_status "${STATUS[2]}"
	
		CONDICAO_DESPEJADA="AND ${NOME_TABELA}.status = '"${STATUS[1]}"'"
	
	fi
	
	echo "Atualizando o Status para ${STATUS[2]} da tabela ${TABELA}"

	${CMD_BASE} -e "\
			UPDATE ${TABELA} ${NOME_TABELA} \
				
				LEFT JOIN ( \
				
					SELECT 	${NOME_TABELA}_lote.${NOME_TABELA}_id AS ID_CAFE, \
							COUNT(lote.id) AS desdobras, \
							SUM(lote.sacas) AS SACAS \
						FROM Lote lote \
							INNER JOIN ${TABELA}_Lote ${NOME_TABELA}_lote \
							ON ${NOME_TABELA}_lote.lote_id = lote.id \
								GROUP BY ID_CAFE \
				) AS lotes \
				ON ${NOME_TABELA}.id = lotes.ID_CAFE \
				
				SET ${NOME_TABELA}.${CONDICAO_STATUS} \
				WHERE ${NOME_TABELA}.sacas = lotes.SACAS \
				${CONDICAO_DESPEJADA}"
	
}

atualiza_despejado()
{
	
	echo "Status da tabela ${TABELA}"
	
	if [ ${COUNT} -lt 3 ]; then
	
		set_condicao_status "${STATUS[1]}"
	
	else
	
		set_condicao_status "${STATUS[2]}"
	
	fi
	
	echo "Atualizando o Status para ${OPCAO} da tabela ${TABELA}"

	${CMD_BASE} -e "\
			UPDATE ${TABELA} ${NOME_TABELA} \
				
				LEFT JOIN ( \
				
						SELECT 	${NOME_TABELA}_despejo.${NOME_TABELA}_id AS ID_CAFE, \
								COUNT(lote.id) AS qtd, \
								SUM(lote.sacas) AS SACAS \
							FROM Lote lote \
								INNER JOIN ${TABELA}_Despejo ${NOME_TABELA}_despejo \
								ON ${NOME_TABELA}_despejo.lote_id = lote.id \
									GROUP BY ID_CAFE \
					) AS despejos \
					ON ${NOME_TABELA}.id = despejos.ID_CAFE \

				SET ${NOME_TABELA}.${CONDICAO_STATUS} \
				WHERE despejos.qtd > 0 "
				
}

exclui_abertos()
{
	
	echo "Status da tabela ${TABELA}"
	
	if [ ${COUNT} -eq 0 ]; then
		
		CONDICAO_STATUS="AND ${NOME_TABELA}.fechado = '"${TIPOS[0]}"'"
		
		echo "Excluindo os registros sem lotes com status ${STATUS[0]} da tabela ${TABELA}"

		${CMD_BASE} -e "\
			DELETE ${NOME_TABELA} FROM ${TABELA} ${NOME_TABELA} \
				
				LEFT JOIN ${TABELA}_Lote ${NOME_TABELA}_lote \
				ON ${NOME_TABELA}_lote.${NOME_TABELA}_id = ${NOME_TABELA}.id \

				WHERE ${NOME_TABELA}_lote.${NOME_TABELA}_id IS NULL \
				${CONDICAO_STATUS}"
		
	else
		
		CONDICAO_STATUS="AND ${NOME_TABELA}.status = '"${STATUS[0]}"'"
		
		echo "Excluindo os registros sem lotes com status ${STATUS[0]} da tabela ${TABELA}"

		if [ ${COUNT} -lt 3 ]; then

			${CMD_BASE} -e "\
					DELETE ${NOME_TABELA}_lote FROM ${TABELA}_Lote ${NOME_TABELA}_lote \
						
						LEFT JOIN ${TABELA} ${NOME_TABELA} \
						ON ${NOME_TABELA}_lote.${NOME_TABELA}_id = ${NOME_TABELA}.id \
						
						LEFT JOIN ${TABELA}_Despejo ${NOME_TABELA}_despejo \
						ON ${NOME_TABELA}_despejo.${NOME_TABELA}_id = ${NOME_TABELA}.id \

						WHERE ${NOME_TABELA}_lote.${NOME_TABELA}_id IS NOT NULL \
						AND ${NOME_TABELA}_despejo.${NOME_TABELA}_id IS NULL \
						AND ${NOME_TABELA}.data < '2018-01-01' \
						${CONDICAO_STATUS} "
						
		fi
		
		${CMD_BASE} -e "\
				DELETE ${NOME_TABELA} FROM ${TABELA} ${NOME_TABELA} \
					
					LEFT JOIN ${TABELA}_Despejo ${NOME_TABELA}_despejo \
					ON ${NOME_TABELA}_despejo.${NOME_TABELA}_id = ${NOME_TABELA}.id \

					WHERE ${NOME_TABELA}_despejo.${NOME_TABELA}_id IS NULL \
					AND ${NOME_TABELA}.data < '2018-01-01' \
					${CONDICAO_STATUS} "

	fi
	
}

exclui_despejos()
{
	
	echo "Status da tabela ${TABELA}"
	
	CONDICAO_STATUS="AND ${NOME_TABELA}.status = '"${STATUS[1]}"'"
	
	echo "Excluindo os registros com despejos sem lotes com status ${STATUS[1]} da tabela ${TABELA}"

	${CMD_BASE} -e "\
			DELETE ${NOME_TABELA}_despejo FROM ${TABELA}_Despejo ${NOME_TABELA}_despejo \
				
				LEFT JOIN ${TABELA} ${NOME_TABELA} \
				ON ${NOME_TABELA}_despejo.${NOME_TABELA}_id = ${NOME_TABELA}.id \
				
				LEFT JOIN ${TABELA}_Lote ${NOME_TABELA}_lote \
				ON ${NOME_TABELA}_lote.${NOME_TABELA}_id = ${NOME_TABELA}.id \

				WHERE ${NOME_TABELA}_despejo.${NOME_TABELA}_id IS NOT NULL \
				AND ${NOME_TABELA}_lote.${NOME_TABELA}_id IS NULL \
				AND ${NOME_TABELA}.data < '2018-01-01' \
				${CONDICAO_STATUS} "
	
	${CMD_BASE} -e "\
			DELETE ${NOME_TABELA} FROM ${TABELA} ${NOME_TABELA} \
				
				LEFT JOIN ${TABELA}_Lote ${NOME_TABELA}_lote \
				ON ${NOME_TABELA}_lote.${NOME_TABELA}_id = ${NOME_TABELA}.id \

				WHERE ${NOME_TABELA}_lote.${NOME_TABELA}_id IS NULL \
				AND ${NOME_TABELA}.data < '2018-01-01' \
				${CONDICAO_STATUS} "

}

atualiza_abertos()
{
	
	echo "Status da tabela ${TABELA}"
	
	if [ ${COUNT} -eq 0 ]; then
		
		set_condicao_status "${TIPOS[1]}"
		
		CONDICAO_ABERTA="AND ${NOME_TABELA}.fechado = '"${TIPOS[0]}"'"
		
	else
		
		set_condicao_status "${STATUS[2]}"
		
		CONDICAO_ABERTA="AND ${NOME_TABELA}.status = '"${STATUS[1]}"'"
		
	fi
	
	echo "Atualiza os registros com lotes com status ${STATUS[0]} para o status ${STATUS[2]} da tabela ${TABELA}"

	${CMD_BASE} -e "\
			UPDATE ${TABELA} ${NOME_TABELA} \
				
				LEFT JOIN ( \
				
					SELECT 	${NOME_TABELA}_lote.${NOME_TABELA}_id AS ID_CAFE, \
							COUNT(lote.id) AS desdobras, \
							SUM(lote.sacas) AS SACAS, \
							SUM(lote.peso) AS PESO \
						FROM Lote lote \
							INNER JOIN ${TABELA}_Lote ${NOME_TABELA}_lote \
							ON ${NOME_TABELA}_lote.lote_id = lote.id \
								GROUP BY ID_CAFE \
				) AS lotes \
				ON ${NOME_TABELA}.id = lotes.ID_CAFE \
				
				SET ${NOME_TABELA}.${CONDICAO_STATUS}, \
					${NOME_TABELA}.sacas = lotes.SACAS, \
					${NOME_TABELA}.peso = lotes.PESO \
				WHERE ${NOME_TABELA}.desdobras = lotes.desdobras \
				${CONDICAO_ABERTA}"
	
}

apaga_lotes()
{
	
	${CMD_BASE} -e "SELECT COUNT(*) AS Total_Lotes FROM Lote"
	
	QUERY=" LEFT JOIN Entcafe_Lote entcafe_lote \
			ON entcafe_lote.lote_id = lote.id \
			
			LEFT JOIN Oscafe_Despejo oscafe_despejo \
			ON oscafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Tracafe_Despejo tracafe_despejo \
			ON tracafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Saicafe_Despejo saicafe_despejo \
			ON saicafe_despejo.lote_id = lote.id \
			
			WHERE SUBSTR(lote.lote, 1, 2) = 'GR'
			AND entcafe_lote.lote_id IS NULL \
			AND oscafe_despejo.lote_id IS NULL \
			AND tracafe_despejo.lote_id IS NULL \
			AND saicafe_despejo.lote_id IS NULL "
						
	${CMD_BASE} -e "DELETE lote FROM Lote lote ${QUERY}"
						
	QUERY=" LEFT JOIN Oscafe_Lote oscafe_lote \
			ON oscafe_lote.lote_id = lote.id \
			
			LEFT JOIN Oscafe_Despejo oscafe_despejo \
			ON oscafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Tracafe_Despejo tracafe_despejo \
			ON tracafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Saicafe_Despejo saicafe_despejo \
			ON saicafe_despejo.lote_id = lote.id \
			
			WHERE SUBSTR(lote.lote, 1, 2) = 'OS'
			AND oscafe_lote.lote_id IS NULL \
			AND oscafe_despejo.lote_id IS NULL \
			AND tracafe_despejo.lote_id IS NULL \
			AND saicafe_despejo.lote_id IS NULL "
						
	${CMD_BASE} -e "DELETE lote FROM Lote lote ${QUERY}"
						
	QUERY=" LEFT JOIN Tracafe_Lote tracafe_lote \
			ON tracafe_lote.lote_id = lote.id \
			
			LEFT JOIN Tracafe_Despejo tracafe_despejo \
			ON tracafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Oscafe_Despejo oscafe_despejo \
			ON oscafe_despejo.lote_id = lote.id \
			
			LEFT JOIN Saicafe_Despejo saicafe_despejo \
			ON saicafe_despejo.lote_id = lote.id \
			
			WHERE SUBSTR(lote.lote, 1, 2) = 'GT'
			AND tracafe_lote.lote_id IS NULL \
			AND oscafe_despejo.lote_id IS NULL \
			AND tracafe_despejo.lote_id IS NULL \
			AND saicafe_despejo.lote_id IS NULL "
	
	${CMD_BASE} -e "DELETE lote FROM Lote lote ${QUERY}"
	
}

comando_sql

atualiza
