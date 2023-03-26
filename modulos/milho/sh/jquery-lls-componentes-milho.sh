#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_menu_milho()
{
	
	ARQ="jquery-lls-menu-milho.js"
	
	COMPONENTES=(
		"menu/menuMilho.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraMilho()
{
	
	ARQ="jquery-lls-componente-sqlProcuraMilho.js"
	
	COMPONENTES=(
		"milho/milho/campoSqlProcuraMilho.js"
		"milho/milho/pegaDadosCampoSqlProcuraMilho.js"
		"milho/milho/pegaDadosSqlProcuraMilho.js"
		"milho/saimilho/calculaLiquidoSaimilho.js"
		"milho/tramilho/setObservacaoTransferenciaMilho.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraUmidade()
{
	
	ARQ="jquery-lls-componente-sqlProcuraUmidade.js"
	
	COMPONENTES=(
		"cadastro/umidade/campoSqlProcuraUmidade.js"
		"cadastro/umidade/pegaDadosCampoSqlProcuraUmidade.js"
		"cadastro/umidade/pegaDadosSqlProcuraUmidade.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}
