#!/bin/bash
# Script para alterar os pacotes do projeto
#
# email: lls.homeoffice@gmail.com

#NOME_PROJETO="cafe"
NOME_PROJETO="balanca"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

altera_java()
{
	
	#DIR_ARQ="$DIR_PROJETO/WEB-INF/config"
	DIR_ARQ="$DIR_PROJETO/src/br/net/lls"
	
	echo "$DIR_ARQ"
	
	NOME_ENTRADA="com.leandroluiz.lls"
	#NOME_ENTRADA="br.net.lls.cadastro.componentes"
	#NOME_ENTRADA="br.net.lls.relatorio.componentes"
	#NOME_ENTRADA="br.net.lls.relatorio.milho"
	
	NOME_SAIDA="br.net.lls"
	#NOME_SAIDA="br.net.lls.componentes"
	#NOME_SAIDA="br.net.lls.relmilho"

	FILES=`find $DIR_ARQ -type f -name '*.java'`

	for file in $FILES
	do
		
		echo "$file"
		
		sed -i 's/'$NOME_ENTRADA'/'$NOME_SAIDA'/g' $file
		
	done
	
}

altera_js()
{

	DIR_ARQ="$DIR_JS_SRC"

	echo "$DIR_ARQ"

	URL_ENTRADA="www.leandroluiz.com"
	
	URL_SAIDA="lls.net.br"
	
	FILES=`find $DIR_ARQ -type f -name '*.js'`
	
	for file in $FILES
	do
		
		echo "$file"
		
		sed -i 's/'$URL_ENTRADA'/'$URL_SAIDA'/g' $file
		
	done
		
}

altera_sh()
{
	
	DIR_ARQ="$DIR_SH"
	
	echo "$DIR_ARQ"
	
	EMAIL_ENTRADA="lls.homeoffice@gmail.com"
	
	EMAIL_SAIDA="lls.homeoffice@gmail.com"
	
	FILES=`find $DIR_ARQ -type f -name '*.sh'`
	
	for file in $FILES
	do
		
		echo "$file"
		
		sed -i 's/'$EMAIL_ENTRADA'/'$EMAIL_SAIDA'/g' $file
		
	done
		
}

find_in_dir()
{

	DIR="$1"
	
	TEXT="$2"
	
	echo "Find files in dir"
	grep -Rl "${TEXT}" ${DIR}
	
	echo "Find text in files of dir"
	grep -nr "${TEXT}" ${DIR}
	
}

change_in_files()
{
	
	DIR_ARQ="$DIR_JS_SRC"
	
	echo "$DIR_ARQ"
	
	NOME_ENTRADA="validarFormularioCafe"
	
	NOME_SAIDA="validarFormularioCore"
	
	#NOME_ENTRADA_UPPER=`echo $NOME_ENTRADA | awk '{ print toupper(substr($NOME_ENTRADA, 1, 1)) substr($NOME_ENTRADA, 2) }'`
	#NOME_SAIDA_UPPER=`echo $NOME_SAIDA | awk '{ print toupper(substr($NOME_SAIDA, 1, 1)) substr($NOME_SAIDA, 2) }'`
	
	FILES=`find $DIR_ARQ -type f -name '*.js'`
	
	for file in $FILES
	do
		
		echo "$file"
		
		sed -i 's/'$NOME_ENTRADA'/'$NOME_SAIDA'/g' $file
		
		#sed -i 's/'$NOME_ENTRADA_UPPER'/'$NOME_SAIDA_UPPER'/g' $file
		
	done
	
}

#altera_java
#altera_js
#altera_sh
#find_in_dir "${1}" "${2}"
change_in_files
