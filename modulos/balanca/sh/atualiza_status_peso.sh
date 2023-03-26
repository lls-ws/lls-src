#!/bin/bash
# Script para atualizar como fechadas os pesos da balanca
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="balanca"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

atualiza_fechado()
{

	echo "Atualizando o Status para fechado!"

	${CMD_BASE} -e "UPDATE Peso SET fechado = 'Y' WHERE liquido > 0"
	
	${CMD_BASE} -e "SELECT COUNT(*) AS Fechados FROM Peso WHERE fechado = 'Y'"
	${CMD_BASE} -e "SELECT COUNT(*) AS Abertos FROM Peso WHERE fechado = 'N'"
	
}

comando_sql

atualiza_fechado
