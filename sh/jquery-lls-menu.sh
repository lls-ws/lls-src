#!/bin/bash
# Script para juntar os arquivos JS do Login
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_menu()
{
	
	FILE_EXT="js"
	
	FILE_NAME="jquery-lls-menu"
	
	file_create "${DIR_LLS_SRC}/cadastro/usuario"
	file_create "${DIR_LLS_SRC}/cadastro/empresa"
	file_create "${DIR_LLS_SRC}/cadastro/preco"
	file_create "${DIR_LLS_SRC}/cadastro/produtor"
	file_create "${DIR_LLS_SRC}/cadastro/fazenda"
	file_create "${DIR_LLS_SRC}/cadastro/telefone"
	
	file_create "${DIR_LLS_SRC}/componentes/cep"
	file_create "${DIR_LLS_SRC}/componentes/titulo"
	file_create "${DIR_LLS_SRC}/componentes/cpf"
	file_create "${DIR_LLS_SRC}/componentes/botao"
	file_create "${DIR_LLS_SRC}/componentes/endereco"
	file_create "${DIR_LLS_SRC}/componentes/tabela"
	file_create "${DIR_LLS_SRC}/componentes/procura"
	file_create "${DIR_LLS_SRC}/componentes/sqlProcura"
	file_create "${DIR_LLS_SRC}/componentes/formulario"
	file_create "${DIR_LLS_SRC}/componentes/campos"
	file_create "${DIR_LLS_SRC}/componentes/cadastro"
	file_create "${DIR_LLS_SRC}/componentes/cadastroTabela"
	file_create "${DIR_LLS_SRC}/componentes/placa"
	
	file_show
	
	css_create "menu"
	
}
