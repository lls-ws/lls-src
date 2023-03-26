#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. jquery-lls-componentes.sh			|| exit 1
. jquery-lls-cadastro.sh			|| exit 1
. libcompila_js.sh					|| exit 1

cria_arq_saldocafe()
{
	
	MODULO="relcafe"
	
	NOME="Saldocafe"
	
	defini_arqs
	
	COMPONENTES=()
	
	cria_arq_relatorio $NOME

}

cria_arq_saldocafe
