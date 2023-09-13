#!/bin/bash
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

OPCAO="$1"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. jquery-lls-componentes.sh		|| exit 1
. jquery-lls-core.sh			|| exit 1
. jquery-lls-cadastro.sh		|| exit 1
. libcompila_js.sh				|| exit 1

jquery_install()
{
	rm -f ${DIR_LLS}/*.js ${DIR_LLS}/*.css ${DIR_LLS_TEMP}/*.js ${ARQ_CSS_MIN}

	COMPONENTES=(
		"css"
		"login"
		"menu"
		"componente_titulo"
		"componente_textoProcura"
		"componente_sqlProcura"
		"componente_botao"
		"componente_tabela"
		"componente_cep"
		"componente_placa"
		"componente_cpf"
		"componente_telefone"
		"componente_campos"
		"componente_endereco"
		"componente_formulario"
		"componente_cadastro"
		"componente_cadastro_tabela"
		"componente_sqlProcuraFazendaProdutor"
		"componente_sqlProcuraPreco"
		"menuCore"
		"componente_cadastroCore"
		"componente_formularioCore"
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
		bash ${DIR_HOME}/modulos/cafe/sh/compila_cafe_js.sh "${OP}"
		bash ${DIR_HOME}/modulos/balanca/sh/compila_balanca_js.sh "${OP}"
		
	fi
	
}

jquery_clear()
{
	
	rm -fv ${DIR_TOMCAT_CSS}/${NOME_CSS_MIN}
	
	rm -rfv ${DIR_LLS_TEMP} ${DIR_TOMCAT_JS}
	
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
