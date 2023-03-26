#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

OPCAO="$1"

# Caminho das bibliotecas
PATH=.:$(dirname $0):$PATH
. jquery-lls-componentes.sh		|| exit 1
. jquery-lls-cadastro.sh		|| exit 1
. libcompila_js.sh				|| exit 1
. modulos/${NOME_PROJETO}/sh/jquery-lls-componentes-${NOME_PROJETO}.sh	|| exit 1

jquery_install()
{
	
	rm -f $DIR_LLS/*.js $DIR_LLS_TEMP/*.js
	
	COMPONENTES=(
		"menu_cafe"
		"componente_cafe"
		"componente_formulario_cafe"
		"componente_formulario_cafe_formacao"
		"componente_sqlProcuraPeneira"
		"componente_sqlProcuraLote"
	)

	criar_arquivos_jquery
	
	cria_menu_item "menuCadastros"
	cria_menu_item "menuRelatorio"
	cria_menu_item "telaMenu"
	
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
