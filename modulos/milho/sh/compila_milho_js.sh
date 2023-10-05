#!/bin/sh
# Script para criar os arquivos jquery-lls-milho
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

OPCAO="$1"

NOME_PROJETO="$2"

echo ${NOME_PROJETO}

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
#. jquery-lls-componentes.sh	|| exit 1
#. jquery-lls-cadastro.sh		|| exit 1
. libcompila_js.sh				|| exit 1
. jquery-lls-menu.sh			|| exit 1
#. modulos/${NOME_PROJETO}/sh/jquery-lls-componentes-${NOME_PROJETO}.sh	|| exit 1

jquery_install()
{
	
	rm -rfv ${DIR_CORE_JS}/temp
	rm -fv ${DIR_LLS}/*.js ${DIR_LLS}/*.css
	
	#COMPONENTES=(
		#"menu_milho"
		#"componente_sqlProcuraUmidade"
		#"componente_sqlProcuraMilho"
	#)

	#criar_arquivos_jquery
	
	cria_menu_item "menuCadastros"
	#cria_menu_item "menuRelatorio"
	#cria_menu_item "telaMenu"
	
	cria_arq_menu
	
}

case "${OPCAO}" in
	install)
		jquery_install
		criar_arquivos_js
		;;
	update)
		jquery_update
		;;
	min)
		criar_arquivos_mim
		;;
	start)
		jquery_install
		criar_arquivos_js
		jquery_update
		;;
	*)
		echo "Use: $0 {install|update|min|start}"
		exit 1
		;;
esac
