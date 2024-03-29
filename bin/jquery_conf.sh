#!/bin/bash
# Script to create JS files for jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/lls.lib				|| exit 1
. lib/tomcat.lib			|| exit 1
. lib/jquery.lib			|| exit 1
. lib/jquery_login.lib		|| exit 1
. lib/jquery_menu.lib		|| exit 1

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
		
	. ${DIR_MODULE}/lib/jquery_${MODULE}.lib	|| exit 1
	
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
	jsp)
		jsp_update
		;;
	start)
		module_check
		jquery_update
		;;
	*)
		echo "Use: bash $0 {create|update|min|start|clear|jsp} [module]"
		exit 1
		;;
esac
