#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

cria_arq_menuCore()
{
	
	defini_arq_menuCore

	cria_arq ${ARQ} ${COMPONENTES}
	
}

defini_arq_menuCore()
{
	
	ARQ="jquery-lls-menuCore.js"
	
	COMPONENTES=(
		"${DIR_COMP}/novoFormularioCore.js"
		"${DIR_COMP}/novoCadastroCore.js"
	)

}

cria_arq_componente_cadastroCore()
{
	
	ARQ="jquery-lls-componente-cadastroCore.js"
	
	COMPONENTES=(
		"${DIR_COMP}/tabelaRelatorioCore.js"
		"${DIR_COMP}/eventoListaCadastroCore.js"
		"${DIR_COMP}/eventoAcharCadastroCore.js"
		"${DIR_COMP}/setDadosDialogCadastroCore.js"
		"${DIR_COMP}/setDadosDialogLancamentoCore.js"
		"${DIR_COMP}/setDadosDialogImprimirCore.js"
		"${DIR_COMP}/setDadosTabelaLancamentoCore.js"
		"${DIR_COMP}/setBotoesDialogLancamentoCore.js"
		"${DIR_COMP}/setDadosTabelaCadastroCore.js"
		"${DIR_COMP}/setDadosColunaHideCore.js"
		"${DIR_COMP}/removeCadastroCore.js"
		"${DIR_COMP}/limpaCampoSqlProcuraCore.js"
		"${DIR_COMP}/getJsonCore.js"
		"${DIR_COMP}/campoSqlProcuraCore.js"
		"${DIR_COMP}/campoSqlProcuraTextoCore.js"
		"${DIR_COMP}/campoSqlProcuraTextoRelatorioCore.js"
	)	
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_formularioCore()
{
	
	ARQ="jquery-lls-componente-formularioCore.js"
	
	COMPONENTES=(
		"${DIR_COMP}/paginacaoCore.js"
		"${DIR_COMP}/formularioCadastroCore.js"
		"${DIR_COMP}/formularioLancamentoCore.js"
		"${DIR_COMP}/formularioObservacaoCore.js"
		"${DIR_COMP}/formularioRelatorioNomeCore.js"
		"${DIR_COMP}/formularioRelatorioNomeTipoCore.js"
		"${DIR_COMP}/formularioRelatorioNomeDataCore.js"
		"${DIR_COMP}/formularioRelatorioNomeDataAddCore.js"
		"${DIR_COMP}/formularioRelatorioNomeDataTipoCore.js"
		"${DIR_COMP}/setDadosFormularioRelatorioCore.js"
		"${DIR_COMP}/setDadosFormularioCore.js"
		"${DIR_COMP}/telaTabelaCore.js"
		"${DIR_COMP}/telaTabelaNovoItemCore.js"
		"${DIR_COMP}/removeCadastroTabelaCore.js"
		"${DIR_COMP}/alteraCadastroTabelaCore.js"
		"${DIR_COMP}/eventoRemoverCore.js"
		"${DIR_COMP}/mostraDialogOpcaoCore.js"
		"${DIR_COMP}/validarIdCore.js"
		"${DIR_COMP}/validarFormularioCore.js"
	)	
	
	cria_arq $ARQ $COMPONENTES
	
}

DIR_COMP="core"
