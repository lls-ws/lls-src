#!/bin/bash
# Script para compilar os projetos desenvolvidos em java
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. sh/libcompila_java.sh					|| exit 1

NOME="$1"
OPCAO="$2"

if [ -z "${NOME}" ]; then

	echo "Nome do projeto nao informado!"
	exit 1;
	
else

	if [ "${NOME}" = "lls" ]; then
		
		NOME_PROJETO="lls-core"
		
	else
		
		if [ "${NOME}" = "link" ]; then
			OPCAO="${NOME}"
		else
			NOME_PROJETO="lls-${NOME}"
		fi
		
	fi

fi

if [ -z "${OPCAO}" ]; then

	OPCAO="jar"

fi

case "${OPCAO}" in
	jar)    	
		echo "Stopping tomcat..."
		service tomcat stop
		
		echo "Compiling project..."
		compila_projeto
		
		# Configurar o persistence.xml
		#sh sh/spring_conf.sh
		;; 
	war)
		cria_arquivo_war
		;;
	link)
		cria_link
		;;
	libs)
		libs_install
		;;
	*)
		echo "Use: $(basename $0) [lls|milho|cafe|balanca] [jar|war|link|libs]"
		exit 1
		;;
esac
