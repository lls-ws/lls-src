#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="balanca"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. jquery-lls-componentes.sh			|| exit 1
. jquery-lls-cadastro.sh			|| exit 1
. libcompila_js.sh					|| exit 1

cria_arq_peso()
{
	
	MODULO="balanca"
	
	NOME="Peso"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/nomeTabs$NOME.js"
		"$NOME_MIN/imprimir$NOME.js"
		"$NOME_MIN/formularioRelatorio$NOME.js"
		"$NOME_MIN/setValoresFormulario$NOME.js"
		"$NOME_MIN/setEventosCamposCafe$NOME.js"
		"$NOME_MIN/setEventosCampos$NOME.js"
	)
	
	cria_arq_cadastro $NOME
	
}

cria_arq_baixapeso()
{
	
	MODULO="balanca"
	
	NOME="Baixapeso"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/nomeTabs$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/setEventosCampos$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosFormulario$NOME.js"
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/calculaLiquido$NOME.js"
		"$NOME_MIN/pegaValores$NOME.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_peso
cria_arq_baixapeso
