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

cria_arq_preco()
{
	
	MODULO="cadastro"
	
	NOME="Preco"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/campoTextoProcura$NOME.js"
	)
	
	cria_arq_cadastro $NOME
	
}

cria_arq_preco
