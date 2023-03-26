#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_menu_cafe()
{
	
	ARQ="jquery-lls-menu-cafe.js"
	
	COMPONENTES=(
		"menu/menuCafe.js"
		"menu/menuOpcoesCafe.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_cafe()
{
	
	ARQ="jquery-lls-componente-cafe.js"
	
	COMPONENTES=(
		"cafe/componentes/arredondaPesoCafe.js"
		"cafe/componentes/calculaLiquidoCafe.js"
		"cafe/componentes/setFormularioCafe.js"
		"cafe/componentes/checkRemoveLinhaTabela.js"
		"cafe/componentes/setEventosCamposCafe.js"
		"cafe/componentes/addEventoCampoProcuraCafe.js"
		"cafe/componentes/imprimirGuiaCafe.js"
		"cafe/componentes/setDadosFormularioCafe.js"
		"cafe/componentes/pegaDadosCampoSqlProcuraCafe.js"
		"cafe/componentes/limpaDadosFormularioCafe.js"
		"cafe/componentes/setBotoesExcluirDialogCafe.js"
		"cafe/componentes/calculaValorServicoCafe.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_formulario_cafe()
{
	
	ARQ="jquery-lls-componente-formulario-cafe.js"
	
	COMPONENTES=(
		"cafe/componentes/formularioRelatorioCafe.js"
		"cafe/componentes/setDadosTabelaCafe.js"
		"cafe/componentes/setDadosRodapeCafe.js"
		"cafe/componentes/removeTotalTabelaCafe.js"
		"cafe/componentes/removeLinhaTabelaCafe.js"
		"cafe/componentes/pegaNomeColunasCafe.js"
		"cafe/componentes/eventoSalvarCafe.js"
		"cafe/componentes/eventoSalvarDesdobrasCafe.js"
		"cafe/componentes/limpaDadosFormularioDesdobrasCafe.js"
		"cafe/componentes/setTipoRelatorioCafe.js"
		"cafe/componentes/validarFormularioDespejoCafe.js"
		"cafe/componentes/setDadosFormularioDespejoCafe.js"
		"cafe/componentes/formataNumeroSacasCafe.js"
		"cafe/componentes/formataNumeroSacasSql.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_formulario_cafe_formacao()
{
	
	ARQ="jquery-lls-componente-formulario-cafe-formacao.js"
	
	COMPONENTES=(
		"cafe/componentes/pegaNomeColunasCafeFormacao.js"
		"cafe/componentes/setValoresCafeFormacao.js"
		"cafe/componentes/getValorAlteraCafeFormacao.js"
		"cafe/componentes/getTotalRecebidoCafeFormacao.js"
		"cafe/componentes/getTotalRestanteCafeFormacao.js"
		"cafe/componentes/setEventosCamposCafeFormacao.js"
		"cafe/componentes/pegaDadosFormularioCafeFormacao.js"
		"cafe/componentes/eventoSalvarCafeFormacao.js"
		"cafe/componentes/setLinhaTabelaCafeFormacao.js"
		"cafe/componentes/addTotalTabelaCafeFormacao.js"
		"cafe/componentes/pegaValoresTabelaCafeFormacao.js"
		"cafe/componentes/alteraTotalTabelaCafeFormacao.js"
		"cafe/componentes/limpaDadosFormularioCafeFormacao.js"
		"cafe/componentes/setBotoesTabelaCafeFormacao.js"
		"cafe/componentes/setTotalTabelaCafeFormacao.js"
		"cafe/componentes/setDadosRodapeCafeFormacao.js"
		"cafe/componentes/mudaLinhaTabelaCafeFormacao.js"
		"cafe/componentes/formataDadosCafeFormacao.js"
		"cafe/componentes/setDadosFormularioCafeFormacao.js"
		"cafe/componentes/removeTotalTabelaCafeFormacao.js"
		"cafe/componentes/checkValoresCafeFormacao.js"
		"cafe/componentes/setEventoDesdobrasCafeFormacao.js"
		"cafe/componentes/validarFormularioCafeFormacao.js"
		"cafe/componentes/checkLotesTabelaCafeFormacao.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraPeneira()
{
	
	ARQ="jquery-lls-componente-sqlProcuraPeneira.js"
	
	COMPONENTES=(
		"cadastro/peneira/campoSqlProcuraPeneira.js"
		"cadastro/peneira/pegaDadosCampoSqlProcuraPeneira.js"
		"cadastro/peneira/pegaDadosSqlProcuraPeneira.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraLote()
{
	
	ARQ="jquery-lls-componente-sqlProcuraLote.js"
	
	COMPONENTES=(
		"cafe/lote/campoSqlProcuraLote.js"
		"cafe/lote/pegaDadosCampoSqlProcuraLote.js"
		"cafe/lote/pegaDadosSqlProcuraLote.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}
