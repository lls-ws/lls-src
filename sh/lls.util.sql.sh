#!/bin/bash
# Script para corrigir dados nas tabelas do BD_LLS da funchal
#
# email: lls.homeoffice@gmail.com

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. lib/mysql.lib		|| exit 1

show_guia()
{
	
	GUIA_NUMBER=`${CMD_BASE} -sN -e "SELECT numero FROM Guia WHERE id = '1';"`
	
	echo ${GUIA_NUMBER}
	
}

set_guia()
{
	
	GUIA_NUMBER=$(echo `show_guia`)
	
	let GUIA_NUMBER++
	
	${CMD_BASE} -e "UPDATE Guia SET numero = '"${GUIA_NUMBER}"' WHERE id = '1';"
	
	show_guia
	
}

case $1 in
    guia_show)
		show_guia
		;;
    guia_set)
		set_guia
		;;
    *)
		echo "Use: $0 [guia_show|guia_set]"
		exit 1;
		;;
esac
