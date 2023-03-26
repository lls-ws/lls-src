#!/bin/sh
# Script para criar os arquivos jquery-lls
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

NOME_PROJETO="lls"

# Caminho da biblioteca
PATH=.:$(dirname $0):$PATH
. jquery-lls-componentes.sh		|| exit 1
. jquery-lls-cadastro.sh		|| exit 1
. libcompila_js.sh				|| exit 1
#. lib/jquery-lls.lib			|| exit 1

cria_arq_produtor()
{
	
	MODULO="cadastro"
	
	NOME="Produtor"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/nomeTabs$NOME.js"
		"$NOME_MIN/telaEndereco$NOME.js"
		"$NOME_MIN/campoTextoProcura$NOME.js"
	)
	
	cria_arq_cadastro $NOME
	
	cria_arq_fazenda
	
	cria_arq_telefone
	
}

cria_arq_fazenda()
{
	
	NOME="Fazenda"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/telaEndereco$NOME.js"
		"$NOME_MIN/formataDados$NOME.js"
	)
	
	cria_arq_cadastro_tabela $NOME
	
}

cria_arq_telefone()
{
	
	NOME="Telefone"
	
	defini_arqs
	
	COMPONENTES=(
		"$NOME_MIN/caixaCombinacaoOperadoras.js"
		"$NOME_MIN/pegaNomesTiposTelefones.js"
		"$NOME_MIN/pegaNomeTipoTelefone.js"
		"$NOME_MIN/nomesOperadoras.js"
		"$NOME_MIN/setOperadoraImagem.js"
		"$NOME_MIN/formataDados$NOME.js"
	)
	
	cria_arq_cadastro_tabela $NOME
	
}

cria_arq_produtor
