#!/bin/bash
# Script para juntar os arquivos JS do Menu
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

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
