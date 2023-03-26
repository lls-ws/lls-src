#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="milho"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. jquery-lls-componentes.sh			|| exit 1
. jquery-lls-cadastro.sh			|| exit 1
. libcompila_js.sh					|| exit 1

cria_arq_milho()
{
	
	MODULO="milho"
	
	NOME="Milho"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/formularioRelatorio$NOME.js"
		"$NOME_MIN/setDadosRodapeSaldo$NOME.js"
		"$NOME_MIN/removeTotalTabelaSaldo$NOME.js"
	)
	
	cria_arq_cadastro $NOME
	
}

cria_arq_milho
