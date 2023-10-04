#!/bin/bash
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

OPCAO="$1"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. libcompila_js.sh				|| exit 1
. jquery-lls-login.sh			|| exit 1
. jquery-lls-menu.sh			|| exit 1
#. jquery-lls-core.sh			|| exit 1
#. jquery-lls-cadastro.sh		|| exit 1

jquery_install()
{
	rm -fv ${DIR_LLS}/*.js ${DIR_LLS}/*.css
	
	COMPONENTES=(
		"login"
		"menu"
	)
	
	limpa_menu "menuCadastrosOpcoes"
	limpa_menu "menuRelatorioOpcoes"
	limpa_menu "telaMenuOpcoes"
	
	criar_arquivos_jquery
	
}

jquery_min()
{
	jquery_install
	criar_arquivos_js
	
	jquery_all "install"
	
	criar_arquivos_mim
	criar_arquivos_css_mim
	
	jquery_all "min"
	
}

jquery_all()
{
	
	OP="$1"
	
	if [ "${TIPO}" = "all" ]; then
	
		bash ${DIR_HOME}/modulos/milho/sh/compila_milho_js.sh "${OP}"
		#bash ${DIR_HOME}/modulos/cafe/sh/compila_cafe_js.sh "${OP}"
		#bash ${DIR_HOME}/modulos/balanca/sh/compila_balanca_js.sh "${OP}"
		
	fi
	
}

jquery_clear()
{
	
	rm -rfv ${DIR_LLS_TEMP} ${DIR_TOMCAT_JS} ${DIR_TOMCAT_CSS}
	
}

# Create for Tests 2024
jquery_start()
{
	
	DIR_JS_TOMCAT="${DIR_TOMCAT}/js"
	DIR_CSS_TOMCAT="${DIR_TOMCAT}/css"
	
	echo "Updating ${DIR_JS_TOMCAT} ${DIR_CSS_TOMCAT}"
	
	rmdir -v ${DIR_LLS_TEMP}
	
	if [ ! -d ${DIR_JS_TOMCAT} ]; then

		mkdir -v ${DIR_JS_TOMCAT}
		
	fi
	
	if [ ! -d ${DIR_CSS_TOMCAT} ]; then

		mkdir -v ${DIR_CSS_TOMCAT}
		
	fi
	
	echo "Removing Old files on ${DIR_JS_TOMCAT}"
	rm -f ${DIR_JS_TOMCAT}/*.js
	rm -f ${DIR_CSS_TOMCAT}/*.css
	
	echo "Coping files to ${DIR_JS_TOMCAT}"
	cp -f ${DIR_JS}/core/*.js ${DIR_JS_TOMCAT}
	cp -f ${DIR_JS}/login/*.js ${DIR_JS_TOMCAT}
	
	echo "Coping files to ${DIR_CSS_TOMCAT}"
	cp -f ${DIR_CSS}/*.css ${DIR_CSS_TOMCAT}

	echo "Changing files ownner to tomcat.tomcat..."
	chown -R tomcat.tomcat ${DIR_CSS_TOMCAT}
	chown -R tomcat.tomcat ${DIR_JS_TOMCAT}
	
	du -hsc ${DIR_CSS_TOMCAT}/*.css ${DIR_JS_TOMCAT}/*.js
	
	jsp_update
	
	echo "Files Compiled SucessFull: $(date '+%d/%m/%Y %H:%M:%S')"
	
}

TIPO="$2"

case "${OPCAO}" in
	install)
		jquery_install
		criar_arquivos_js
		jquery_all ${OPCAO}
		;;
	update)
		jquery_update
		jquery_all ${OPCAO}
		;;
	min)
		jquery_min
		;;
	clear)
		jquery_clear
		;;
	start)
		jquery_install
		criar_arquivos_js
		jquery_update
		jquery_all ${OPCAO}
		;;
	*)
		echo "Use: bash $0 {install|update|min|start|clear} [all]"
		exit 1
		;;
esac
