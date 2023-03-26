#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_cadastro()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/removeTotalTabela$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosTabela$NOME.js"
		"$NOME_MIN/setDadosRodape$NOME.js"
		"$NOME_MIN/setDadosDialog$NOME.js"
		"$NOME_MIN/pegaProcura$NOME.js"
	)
	
	cria_arq_cadastro_formulario $NOME
	
}

cria_arq_cadastro_formulario()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/setDadosFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_cadastro_tabela()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/pega$NOME.js"
		"$NOME_MIN/pegaTabela$NOME.js"
		"$NOME_MIN/setLinhaTabela$NOME.js"
		"$NOME_MIN/mudaLinhaTabela$NOME.js"
		"$NOME_MIN/remove$NOME.js"
		"$NOME_MIN/altera$NOME.js"
		"$NOME_MIN/removeTotalTabela$NOME.js"
	)
	
	cria_arq_cadastro_formulario $NOME
	
}

cria_arq_relatorio()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/pegaNomeColunas$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
		"$NOME_MIN/setDadosTabela$NOME.js"
		"$NOME_MIN/setDadosRodape$NOME.js"
		"$NOME_MIN/pegaProcura$NOME.js"
		"$NOME_MIN/formularioRelatorio$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_relatorio_cadastro()
{
	
	NOME="$1"
	
	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	COMPONENTES+=(
		"$NOME_MIN/eventoSalvar$NOME.js"
		"$NOME_MIN/formulario$NOME.js"
		"$NOME_MIN/validarFormulario$NOME.js"
		"$NOME_MIN/pegaDadosFormulario$NOME.js"
		"$NOME_MIN/limpaDadosFormulario$NOME.js"
		"$NOME_MIN/pegaNomeColunas$NOME.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}
