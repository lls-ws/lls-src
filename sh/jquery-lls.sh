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
	
	tmp_create
	
	login_create
	
	menu_clear "menuCadastros"
	menu_clear "menuRelatorio"
	menu_clear "telaMenu"
	
	menu_create
	
	msg_show "created" "${DIR_TEMP}/*"
	
}

jquery_modules()
{
	
	modules_def "${MODULE}"
		
	. ${DIR_MODULE}/sh/compila_${MODULE}_js.sh	|| exit 1
	
	${MODULE}_create
	
}

MODULE="$2"

case "$1" in
	create)
		module_check
		;;
	update)
		jquery_update
		;;
	min)
		jquery_min
		;;
	clear)
		jquery_clear
		;;
	start)
		module_check
		jquery_update
		;;
	*)
		echo "Use: bash $0 {create|update|min|start|clear} [module]"
		exit 1
		;;
esac
