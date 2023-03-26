#!/bin/bash
# Script para atualizar como fechadas as entradas de café
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

mostra_tipo()
{
	
	ID="$1"
	
	${CMD_BASE} -e "\
			SELECT COUNT(*) AS QTD \
				FROM Servcafe servcafe \
					WHERE preco_id = ${ID}"
	
}

atualiza()
{

	mostra_tipo "25"
	
	mostra_tipo "19"
	
	${CMD_BASE} -e "\
			UPDATE Servcafe \
				SET preco_id = 19 \
					WHERE preco_id = 25"
	
	mostra_tipo "25"
	
	mostra_tipo "19"
	
	${CMD_BASE} -e "SELECT COUNT(*) AS QTD_PRECO FROM Preco"
	
	#${CMD_BASE} -e "DELETE FROM Preco WHERE id = 25"
	
	#${CMD_BASE} -e "SELECT COUNT(*) AS QTD_PRECO FROM Preco"
	
}

atualiza_entrada()
{

	${CMD_BASE} -e "SELECT count(*) FROM Entcafe WHERE usuario != 'Dados_Migrados'"

	${CMD_BASE} -e "\
			UPDATE Entcafe \
				SET cobrar = false \
					WHERE usuario = 'Dados_Migrados'"
	
}

atualiza_saida()
{

	${CMD_BASE} -e "SELECT count(*) FROM Saicafe WHERE usuario != 'Dados_Migrados'"

	${CMD_BASE} -e "\
			UPDATE Saicafe \
				SET cobrar = false \
					WHERE usuario = 'Dados_Migrados'"
	
}

comando_sql

#atualiza

#atualiza_entrada
atualiza_saida
