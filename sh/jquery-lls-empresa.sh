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

cria_arq_empresa()
{
	
	MODULO="cadastro"
	
	NOME="Empresa"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/formataDados$NOME.js"
	)
	
	cria_arq_relatorio_cadastro $NOME
	
}

cria_arq_empresa
