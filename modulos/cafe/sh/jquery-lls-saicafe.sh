#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. jquery-lls-componentes.sh			|| exit 1
. jquery-lls-cadastro.sh			|| exit 1
. libcompila_js.sh					|| exit 1

cria_arq_saicafe()
{
	
	MODULO="cafe"
	
	NOME="Saicafe"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/nomeTabs$NOME.js"
		"$NOME_MIN/formularioRelatorio$NOME.js"
		"$NOME_MIN/removeLinhaTabela$NOME.js"
		"$NOME_MIN/setEventosCampos$NOME.js"
	)
	
	cria_arq_cadastro $NOME

}

cria_arq_sailote()
{
	
	MODULO="cafe"
	
	NOME="Sailote"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/nomeTabs$NOME.js"
		"$NOME_MIN/setEventosCampos$NOME.js"
		"$NOME_MIN/checkValores$NOME.js"
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosTabela$NOME.js"
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/setDadosFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_saicafe
cria_arq_sailote
