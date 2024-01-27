#!/bin/bash
# Script to join JS files for Menu
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

menu_create()
{
	
	FILE_NAME="jquery-lls-menu"
	
	css_create "menu"
	
	FILE_EXT="js"
	
	file_create "${DIR_CORE_JS}/menu"
	file_create "${DIR_CORE_MENU}"
	
	cadastro_create
	componentes_create
	
	file_show
	
}

cadastro_create()
{
	
	file_create "${DIR_CORE_JS}/cadastro/usuario"
	file_create "${DIR_CORE_JS}/cadastro/empresa"
	file_create "${DIR_CORE_JS}/cadastro/preco"
	file_create "${DIR_CORE_JS}/cadastro/produtor"
	file_create "${DIR_CORE_JS}/cadastro/fazenda"
	file_create "${DIR_CORE_JS}/cadastro/telefone"
	
}

componentes_create()
{
	
	file_create "${DIR_CORE_JS}/componentes/cep"
	file_create "${DIR_CORE_JS}/componentes/titulo"
	file_create "${DIR_CORE_JS}/componentes/cpf"
	file_create "${DIR_CORE_JS}/componentes/botao"
	file_create "${DIR_CORE_JS}/componentes/endereco"
	file_create "${DIR_CORE_JS}/componentes/tabela"
	file_create "${DIR_CORE_JS}/componentes/procura"
	file_create "${DIR_CORE_JS}/componentes/sqlProcura"
	file_create "${DIR_CORE_JS}/componentes/formulario"
	file_create "${DIR_CORE_JS}/componentes/campos"
	file_create "${DIR_CORE_JS}/componentes/cadastro"
	file_create "${DIR_CORE_JS}/componentes/cadastroTabela"
	file_create "${DIR_CORE_JS}/componentes/placa"
	
}

menu_clear()
{
	
	menu_core_file "$1"
	
	echo "Cleanning ${MENU_CORE}"
	
	echo "/* ================ "${MENU_CORE}".js ===========================" 	> $MENU_CORE_FILE
	echo " * http://lls.net.br/"												>> $MENU_CORE_FILE
	echo " * ========================================================= */" 		>> $MENU_CORE_FILE
	echo ""														 				>> $MENU_CORE_FILE
	echo "function "${MENU_CORE}"(nomesItensMenu, opcoesMenu) {"				>> $MENU_CORE_FILE
	echo "	return opcoesMenu;"					 								>> $MENU_CORE_FILE
	echo "}"														 			>> $MENU_CORE_FILE
	
}

menu_create_opt()
{
	
	menu_core_file "$1"
	
	MENU_NAME=`echo ${MODULE} | awk '{ print toupper(substr($/{MODULE}/, 1, 1)) substr($/{MODULE}/, 2) }'`
	
	MENU_MODULE="${FILE_NAME}${MENU_NAME}"
	
	MENU_MODULE_FILE="${DIR_MODULE_JS}/componentes/menu/${MENU_MODULE}.js"
	
	MENU_SIZE=`cat ${MENU_MODULE_FILE} | wc -l`
	
	sed -i '/jquery-lls-menu-'${MODULE}'/d' ${MENU_CORE_FILE}
	sed -i '/opcoesMenu = '${MENU_MODULE}'/d' ${MENU_CORE_FILE}
	
	sed -i '/function '${MENU_CORE}'/a \	opcoesMenu = '${MENU_MODULE}'(nomesItensMenu, opcoesMenu);' ${MENU_CORE_FILE}
	
	sed -i '/'${MENU_MODULE}'.js/,+'${MENU_SIZE}'d' ${MENU_CORE_FILE}
	
	echo "" >> ${MENU_CORE_FILE}
	
	cat ${MENU_MODULE_FILE} >> ${MENU_CORE_FILE}
	
	echo ${MENU_MODULE_FILE}
	echo ${MENU_CORE_FILE}
	
}

menu_core_file()
{
	
	FILE_NAME="$1"
	
	MENU_CORE=${FILE_NAME}"Opcoes"
	
	MENU_CORE_FILE="${DIR_CORE_MENU}/${MENU_CORE}.js"
	
}
