#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. jquery-lls-componentes.sh		|| exit 1
. jquery-lls-cadastro.sh		|| exit 1
. libcompila_js.sh				|| exit 1
#. lib/jquery-lls.lib			|| exit 1

cria_arq_usuario()
{
	
	MODULO="cadastro"
	
	NOME="Usuario"
	
	defini_arqs
	
	COMPONENTES=()
	
	cria_arq_relatorio_cadastro $NOME
	
}

cria_arq_usuario
