#!/bin/bash
# Script para juntar os arquivos JS do Menu
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

limpa_menu()
{
	
	MENU_CORE="$1"
	
	ARQ_MENU_CORE="$DIR_CORE_JS_MENU/$MENU_CORE.js"
	
	echo "Limpando $MENU_CORE"
	
	echo "/* ================ $MENU_CORE.js ===========================" 	> $ARQ_MENU_CORE
	echo " * http://lls.net.br/"											>> $ARQ_MENU_CORE
	echo " * ========================================================= */" 	>> $ARQ_MENU_CORE
	echo ""														 			>> $ARQ_MENU_CORE
	echo "function $MENU_CORE(nomesItensMenu, opcoesMenu) {"				>> $ARQ_MENU_CORE
	echo "	return opcoesMenu;"					 							>> $ARQ_MENU_CORE
	echo "}"														 		>> $ARQ_MENU_CORE
	
}

cria_menu_item()
{
	
	NOME_ARQ="$1"
	
	NOME_MENU=`echo ${NOME_PROJETO} | awk '{ print toupper(substr($/{NOME_PROJETO}/, 1, 1)) substr($/{NOME_PROJETO}/, 2) }'`
	
	MENU_PROJETO="${NOME_ARQ}${NOME_MENU}"
	
	MENU_CORE=${NOME_ARQ}"Opcoes"
	
	ARQ_MENU_PROJETO="${DIR_LLS_SRC}/componentes/menu/${MENU_PROJETO}.js"
	
	ARQ_MENU_CORE="${DIR_CORE_JS_MENU}/${MENU_CORE}.js"
	
	MENU_SIZE=`cat ${ARQ_MENU_PROJETO} | wc -l`
	
	sed -i '/jquery-lls-menu-'${NOME_PROJETO}'/d' ${ARQ_MENU_CORE}
	sed -i '/opcoesMenu = '${MENU_PROJETO}'/d' ${ARQ_MENU_CORE}
	
	sed -i '/function '${MENU_CORE}'/a \	opcoesMenu = '${MENU_PROJETO}'(nomesItensMenu, opcoesMenu);' ${ARQ_MENU_CORE}
	
	sed -i '/'${MENU_PROJETO}'.js/,+'${MENU_SIZE}'d' ${ARQ_MENU_CORE}
	
	echo "" >> ${ARQ_MENU_CORE}
	
	cat ${ARQ_MENU_PROJETO} >> ${ARQ_MENU_CORE}
	
	echo ${ARQ_MENU_PROJETO}
	echo ${ARQ_MENU_CORE}
	
}


cria_arq_menu()
{
	
	FILE_NAME="jquery-lls-menu"
	
	css_create "menu"
	
	FILE_EXT="js"
	
	file_create "${DIR_CORE_JS_SRC}/menu"
	file_create "${DIR_CORE_JS_SRC}/componentes/menu"
	
	cria_arq_cadastro
	cria_arq_componentes
	
	file_show
	
}

cria_arq_cadastro()
{
	
	file_create "${DIR_CORE_JS_SRC}/cadastro/usuario"
	file_create "${DIR_CORE_JS_SRC}/cadastro/empresa"
	file_create "${DIR_CORE_JS_SRC}/cadastro/preco"
	file_create "${DIR_CORE_JS_SRC}/cadastro/produtor"
	file_create "${DIR_CORE_JS_SRC}/cadastro/fazenda"
	file_create "${DIR_CORE_JS_SRC}/cadastro/telefone"
	
}

cria_arq_componentes()
{
	
	file_create "${DIR_CORE_JS_SRC}/componentes/cep"
	file_create "${DIR_CORE_JS_SRC}/componentes/titulo"
	file_create "${DIR_CORE_JS_SRC}/componentes/cpf"
	file_create "${DIR_CORE_JS_SRC}/componentes/botao"
	file_create "${DIR_CORE_JS_SRC}/componentes/endereco"
	file_create "${DIR_CORE_JS_SRC}/componentes/tabela"
	file_create "${DIR_CORE_JS_SRC}/componentes/procura"
	file_create "${DIR_CORE_JS_SRC}/componentes/sqlProcura"
	file_create "${DIR_CORE_JS_SRC}/componentes/formulario"
	file_create "${DIR_CORE_JS_SRC}/componentes/campos"
	file_create "${DIR_CORE_JS_SRC}/componentes/cadastro"
	file_create "${DIR_CORE_JS_SRC}/componentes/cadastroTabela"
	file_create "${DIR_CORE_JS_SRC}/componentes/placa"
	
}
