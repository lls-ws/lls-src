#!/bin/bash
# Script to create JS files for jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. lib_jquery-lls.sh				|| exit 1
. jquery-lls-login.sh			|| exit 1
. jquery-lls-menu.sh			|| exit 1

jquery_create()
{
	
	login_create
	menu_create
	
	menu_clear "menuCadastrosOpcoes"
	menu_clear "menuRelatorioOpcoes"
	menu_clear "telaMenuOpcoes"
	
	criar_arquivos_jquery
	
	criar_arquivos_js
	
}

jquery_modules()
{
	
	OP="$1"
	
	if [ "${TIPO}" = "all" ]; then
	
		bash ${DIR_HOME}/modulos/milho/sh/compila_milho_js.sh "${OP}"
		bash ${DIR_HOME}/modulos/cafe/sh/compila_cafe_js.sh "${OP}"
		bash ${DIR_HOME}/modulos/balanca/sh/compila_balanca_js.sh "${OP}"
		
	else
	
		clear
		
		bash ${DIR_HOME}/modulos/${TIPO}/sh/compila_${TIPO}_js.sh "${OP}" "${TIPO}"
		
	fi
	
}

MODULE="$2"

case "$1" in
	create)
		
		if [ -z "${MODULE}" ]; then
		
			jquery_create
		
		else
		
			jquery_modules "$1"
		
		fi
		
		;;
	update)
	
		if [ -z "${TIPO}" ]; then
		
			jquery_update
		
		else
		
			jquery_modules ${OPCAO}
		
		fi

		;;
	min)
		jquery_min
		;;
	clear)
		jquery_clear
		;;
	start)
	
		if [ -z "${TIPO}" ]; then
		
			jquery_install
			jquery_update
		
		else
		
			jquery_modules ${OPCAO}
		
		fi
		
		;;
	*)
		echo "Use: bash $0 {install|update|min|start|clear} [all]"
		exit 1
		;;
esac
