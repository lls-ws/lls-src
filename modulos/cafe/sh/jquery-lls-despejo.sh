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

cria_arq_despejo()
{
	
	MODULO="cafe"
	
	NOME="Despejo"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/setEventosCampos$NOME.js"
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/setDadosFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
		"$NOME_MIN/pegaTabela$NOME.js"
		"$NOME_MIN/remove$NOME.js"
		"$NOME_MIN/removeTotalTabela$NOME.js"
		"$NOME_MIN/setLinhaTabela$NOME.js"
		"$NOME_MIN/setDadosRodape$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/calculaLiquido$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_despejo
