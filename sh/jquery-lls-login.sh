#!/bin/bash
# Script para juntar os arquivos JS do Login
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

css_create()
{
	
	FILE_EXT="css"
	
	DIR_NAME="$1"
	
	file_create "${DIR_CSS}/${DIR_NAME}"
	
	file_show
	
}

cria_arq_login()
{
	
	FILE_EXT="js"
	
	FILE_NAME="jquery-lls-login"
	
	file_create "${DIR_LLS_SRC}/login"
	file_create "${DIR_LLS_SRC}/componentes/login"
	file_create "${DIR_LLS_SRC}/componentes/telefone"
	
	file_show
	
	css_create "login"
	
}
