#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_menu_balanca()
{
	
	ARQ="jquery-lls-menu-balanca.js"
	
	COMPONENTES=(
		"menu/menuBalanca.js"
		"menu/menuOpcoesBalanca.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}
