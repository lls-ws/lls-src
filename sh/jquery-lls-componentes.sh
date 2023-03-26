#!/bin/bash
# Biblioteca para manipular arquivos e diretórios
#
# Autor: Leandro Luiz
# email: lls.homeoffice@gmail.com

defini_arqs()
{

	NOME_MIN=$(echo "$NOME" | tr '[:upper:]' '[:lower:]')
	
	ARQ="jquery-lls-$NOME_MIN.js"
	
}

cria_arq()
{

	ARQUIVO="$1"
	
	COMPONENTES="$2"
	
	if [ -f $DIR_JS/$ARQUIVO ]; then
		
		rm -f $DIR_LLS/$ARQUIVO DIR_LLS_TEMP/$ARQUIVO
		
	fi

	for ARQ in "${COMPONENTES[@]}"
	do
		
		if [ -n "$ARQ" ]; then
		
			if [ -z $MODULO ]; then
			
				cat "$DIR_LLS_SRC/$ARQ" >> $DIR_LLS_TEMP/$ARQUIVO
			
			else
			
				cat "$DIR_LLS_SRC/$MODULO/$ARQ" >> $DIR_LLS_TEMP/$ARQUIVO
			
			fi
			
		fi
		
	done
	
}

cria_arq_login()
{
	
	ARQ="jquery-lls-login.js"
	
	COMPONENTES=(
		"componentes/a.js"
		"componentes/animacao.js"
		"componentes/mostraDialog.js"
		"componentes/mostraAjaxErro.js"
		"componentes/carregaCssJs.js"
		"componentes/input.js"
		"componentes/formularioHorizontal.js"
		"componentes/divInput.js"
		"componentes/campoHorizontal.js"
		"componentes/campoTextoHorizontal.js"
		"componentes/imagem.js"
		"componentes/label.js"
		"componentes/span.js"
		"componentes/paragrafo.js"
		"componentes/campoTexto.js"
		"componentes/botao.js"
		"componentes/divDialog.js"
		"componentes/span.js"
		"componentes/title.js"
		"componentes/head.js"
		"componentes/painel.js"
		"componentes/container.js"
		"componentes/tituloPainelCadastro.js"
		"login/nomeProjeto.js"
		"login/tituloLogin.js"
		"login/tituloPainelLogin.js"
		"login/mudaPainel.js"
		"login/clearHtml.js"
		"login/loginInicio.js"
		"login/core.js"
		"login/login.js"
		"login/senha.js"
		"login/usuario.js"
		"login/cadastroLogin.js"
		"login/criaLink.js"
		"login/formularioSenha.js"
		"login/formularioLogin.js"
		"login/formularioLoginCore.js"
		"login/linkLoginCore.js"
		"login/formularioCadastroLogin.js"
		"login/formularioCadastroSenha.js"
		"login/eventoFormularioLogin.js"
		"login/eventoFormularioSenha.js"
		"login/eventoFormularioCadastroLogin.js"
		"login/eventoFormularioCadastroSenha.js"
		"login/validarFormularioSenha.js"
		"login/validarFormularioCadastroSenha.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

defini_arq_menu()
{
	
	ARQ="jquery-lls-menu.js"
	
	COMPONENTES=(
		"componentes/ul.js"
		"componentes/li.js"
		"componentes/b.js"
		"componentes/novoFormulario.js"
		"componentes/novoCadastro.js"
		"menu/imagemMenu.js"
		"menu/botaoMenu.js"
		"menu/logout.js"
		"menu/marcarMenu.js"
		"menu/mostrarMenu.js"
		"menu/itemMenu.js"
		"menu/opcaoMenu.js"
		"menu/menu.js"
		"menu/telaMenu.js"
		"menu/telaMenuOpcoes.js"
		"menu/formularioMenu.js"
		"menu/menuCadastros.js"
		"menu/menuCadastrosOpcoes.js"
		"menu/menuRelatorio.js"
		"menu/menuRelatorioOpcoes.js"
		"menu/menuUsuario.js"
		"menu/eventoMenuUsuario.js"
		"menu/criarMenu.js"
		"menu/criarTelaMenu.js"
	)

}

cria_arq_menu()
{
	
	defini_arq_menu

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_titulo()
{
	
	ARQ="jquery-lls-componente-titulo.js"
	
	COMPONENTES=(
		"componentes/tituloPainel.js"
		"componentes/tituloPainelCadastro.js"	
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_campos()
{
	
	ARQ="jquery-lls-componente-campos.js"
	
	COMPONENTES=(
		"componentes/telaObservacao.js"
		"componentes/pegaValorCaixaCombinacao.js"
		"componentes/campoAreaTexto.js"
		"componentes/campoAreaTextoHorizontal.js"
		"componentes/campoNumero.js"
		"componentes/campoNumeroInteiro.js"
		"componentes/campoNumeroHorizontal.js"
		"componentes/campoImagemHorizontal.js"
		"componentes/campoDataHorizontal.js"
		"componentes/caixaCombinacaoHorizontal.js"
		"componentes/caixaVerificacaoHorizontal.js"
		"componentes/caixaRadioHorizontal.js"
		"componentes/formataNumero.js"
		"componentes/formataNumeroSql.js"
		"componentes/formataData.js"
		"componentes/nomesEstados.js"
		"componentes/nomesTipos.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_endereco()
{
	
	ARQ="jquery-lls-componente-endereco.js"
	
	COMPONENTES=(
		"componentes/nomeCamposEndereco.js"
		"componentes/telaEndereco.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_cep()
{
	
	ARQ="jquery-lls-componente-cep.js"
	
	COMPONENTES=(
		"componentes/campoCepHorizontal.js"
		"componentes/campoCep.js"
		"componentes/pegaCepNumeros.js"
		"componentes/pegaCepMascara.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_placa()
{
	
	ARQ="jquery-lls-componente-placa.js"
	
	COMPONENTES=(
		"componentes/campoPlacaHorizontal.js"
		"componentes/campoPlaca.js"
		"componentes/pegaPlacaTexto.js"
		"componentes/pegaPlacaMascara.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_cpf()
{
	
	ARQ="jquery-lls-componente-cpf.js"
	
	COMPONENTES=(
		"componentes/campoCpfCnpjHorizontal.js"
		"componentes/validarCpf.js"
		"componentes/validarCnpj.js"
		"componentes/validarCpfCnpj.js"
		"componentes/pegaCpfCnpjNumeros.js"
		"componentes/pegaCpfCnpjMascara.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_telefone()
{
	
	ARQ="jquery-lls-componente-telefone.js"
	
	COMPONENTES=(
		"componentes/campoTelefone.js"
		"componentes/campoTelefoneHorizontal.js"
		"componentes/pegaTelefoneNumeros.js"
		"componentes/pegaTelefoneMascara.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_textoProcura()
{
	
	ARQ="jquery-lls-componente-procura.js"
	
	COMPONENTES=(
		"componentes/campoTextoProcura.js"
		"componentes/campoDataProcura.js"
		"componentes/campoTipoProcura.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcura()
{
	
	ARQ="jquery-lls-componente-sqlProcura.js"
	
	COMPONENTES=(
		"componentes/campoSqlProcura.js"
		"componentes/campoSqlProcuraNumero.js"
		"componentes/limpaCampoSqlProcura.js"
		"componentes/campoSqlProcuraTexto.js"
		"componentes/campoSqlProcuraTextoRelatorio.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraFazendaProdutor()
{
	
	ARQ="jquery-lls-componente-sqlProcuraFazendaProdutor.js"
	
	COMPONENTES=(
		"cadastro/fazenda/campoSqlProcuraFazendaProdutor.js"
		"cadastro/fazenda/pegaDadosCampoSqlProcuraFazendaProdutor.js"
		"cadastro/fazenda/pegaDadosSqlProcuraFazendaProdutor.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_sqlProcuraPreco()
{
	
	ARQ="jquery-lls-componente-sqlProcuraPreco.js"
	
	COMPONENTES=(
		"cadastro/preco/campoSqlProcuraPreco.js"
		"cadastro/preco/pegaDadosCampoSqlProcuraPreco.js"
		"cadastro/preco/pegaDadosSqlProcuraPreco.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_botao()
{
	
	ARQ="jquery-lls-componente-botao.js"
	
	COMPONENTES=(
		"componentes/botaoHorizontal.js"
		
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_tabela()
{
	
	ARQ="jquery-lls-componente-tabela.js"
	
	COMPONENTES=(
		"componentes/tabela.js"
		"componentes/table.js"
		"componentes/thead.js"
		"componentes/tr.js"
		"componentes/th.js"
		"componentes/tbody.js"
		"componentes/paginacao.js"
		"componentes/td.js"
		"componentes/tabelaCelula.js"
		"componentes/tabelaCelulaCheck.js"
		"componentes/tabelaBotoes.js"
		"componentes/juntaColunas.js"
		"componentes/juntaTexto.js"
		"componentes/juntaTituloTexto.js"
		"componentes/textoBotao.js"
	)

	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_formulario()
{
	
	ARQ="jquery-lls-componente-formulario.js"
	
	COMPONENTES=(
		"componentes/formularioProcura.js"
		"componentes/formularioTabela.js"
		"componentes/formularioCadastro.js"
		"componentes/formularioRelatorioNomeHide.js"
		"componentes/formularioRelatorioNome.js"
		"componentes/formularioRelatorioData.js"
		"componentes/formularioRelatorioTipo.js"
		"componentes/formularioRelatorioNomeData.js"
		"componentes/formularioRelatorioNomeDataAdd.js"
		"componentes/formularioRelatorioNomeDataTipo.js"
		"componentes/formularioRelatorioNomeTipo.js"
		"componentes/setDadosFormularioRelatorio.js"
		"componentes/validarFormulario.js"
		"componentes/validarId.js"
		"login/validarFormularioSenha.js"
	)	
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_cadastro()
{
	
	ARQ="jquery-lls-componente-cadastro.js"
	
	COMPONENTES=(
		"componentes/divTabs.js"
		"componentes/campoOculto.js"
		"componentes/tabelaCadastro.js"
		"componentes/tabelaRelatorio.js"
		"componentes/getJson.js"
		"componentes/getJsonById.js"
		"componentes/mostraCadastro.js"
		"componentes/alteraCadastro.js"	
		"componentes/removeCadastro.js"
		"componentes/eventoRemover.js"
		"componentes/pegaProcuraRelatorioNome.js"
		"componentes/pegaProcuraRelatorioNomeData.js"
		"componentes/pegaProcuraRelatorioNomeDataTipo.js"
		"componentes/pegaProcuraRelatorioNomeTipo.js"
		"componentes/setDadosColunaHide.js"
		"componentes/setDadosRodapeHide.js"
		"componentes/eventoListaCadastro.js"
		"componentes/eventoAcharCadastro.js"
		"componentes/eventoImprimir.js"
		"componentes/mostraDialogAlterar.js"
		"componentes/mostraDialogOpcao.js"
		"componentes/setDadosDialogCadastro.js"
		"componentes/setDadosDialogLancamento.js"
		"componentes/setDadosDialogImprimir.js"
		"componentes/setBotoesDialogLancamento.js"
	)	
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_componente_cadastro_tabela()
{
	
	ARQ="jquery-lls-componente-cadastro-tabela.js"
	
	COMPONENTES=(
		"componentes/telaTabelaNovoItem.js"
		"componentes/telaTabela.js"
		"componentes/setIdTabelaCadastro.js"
		"componentes/pegaColunaBotoesTabela.js"
		"componentes/addLinhaTabelaCadastro.js"
		"componentes/eventoInserirTabela.js"
		"componentes/eventoSalvarCadastroTabela.js"
		"componentes/setDadosTabelaCadastro.js"
		"componentes/alteraCadastroTabela.js"
		"componentes/removeCadastroTabela.js"
		"componentes/pegaTabelaCadastro.js"
		"componentes/pegaDadosTabelaCadastro.js"
		"componentes/mostraDialogRemoverLinha.js"
	)
	
	cria_arq $ARQ $COMPONENTES
	
}

cria_arq_css()
{
	
	ARQ_CSS="jquery-lls.css"
	
	COMPONENTES=(
		"jquery-lls/cores.css"
		"jquery-lls/estilos.css"
		"jquery-lls/menu.css"
		"jquery-lls/login.css"
		"jquery-lls/navtab.css"
		"jquery-lls/tabela.css"
		"jquery-lls/autocomplete.css"
	)
	
	if [ -f $DIR_JS/$ARQ ]; then

		rm -f $DIR_LLS/$ARQ_CSS

	fi
	
	for ARQ in "${COMPONENTES[@]}"
	do
		
		cat "$DIR_CSS/$ARQ" >> $DIR_LLS/$ARQ_CSS
		
	done
	
}

rename_files() {
	
	for file in *Entmilho.js
	do
	  #mv "$file" "${file/_h.png/_half.png}"
	  echo "$file" "${file/Entmilho.js/Milho.js}"
	done
	
}
