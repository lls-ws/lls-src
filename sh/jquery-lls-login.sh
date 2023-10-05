#!/bin/bash
# Script para juntar os arquivos JS do Login
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

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
