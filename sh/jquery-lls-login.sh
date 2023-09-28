#!/bin/bash
# Script para juntar os arquivos JS do Login
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

file_create()
{
	
	DIR_NAME="$1"
	
	if [ ! -d ${DIR_NAME} ]; then
	
		echo "Directory not found: ${DIR_NAME}"
		exit 1;
	
	fi
	
	if [ `find ${DIR_NAME} -iname *.${FILE_EXT} | wc -l` == 0 ]; then
	
		echo "Files JS not found in directory: ${DIR_NAME}"
		exit 1;
	
	fi
	
	echo "${DIR_NAME}"
	
	find ${DIR_NAME} -iname *.${FILE_EXT} |
	
	while read FILE
	do
		
		cat ${FILE} >> ${DIR_LLS_TEMP}/${FILE_NAME}.${FILE_EXT}
		
	done
	
}

file_show()
{
	
	du -hsc ${DIR_LLS_TEMP}/${FILE_NAME}.${FILE_EXT}
	
}

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
	
	file_create "${DIR_LLS_SRC}/menu"
	
	file_create "${DIR_LLS_SRC}/componentes/login"
	
	file_create "${DIR_LLS_SRC}/componentes/telefone"
	
	file_show
	
	css_create "login"
	
}
