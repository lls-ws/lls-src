/* =========================================================
 * tabelaRelatorio.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaRelatorio(posicaoItemMenu, nomeTabela, textoLabel) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-titulo.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-procura.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var formularioTabelaRelatorio = formularioTabela(nomeTabela);
	
	var paginacaoTabela = paginacao(
		'paginaLista' + nomeTabela,
		'eventoLista' + nomeTabela,
		0, 0, nomeTabela
	);
	
	var formularioRelatorio = eval ("formularioRelatorio" + nomeTabela +
		"('" + nomeTabela + "', '" + posicaoItemMenu + "')"
	);
	
	var divTitulo = $('<div/>').addClass('input-group form-control formulario_cor');
	
	var titulo = label(
		'tituloRelatorio' + nomeTabela,
		tituloPainelCadastro(2, eval('pegaNomeColunas' + nomeTabela + '(3)')),
		'texto_label texto_grande'
	).addClass('col-md-12 col-xs-12');
	
	divTitulo.append(titulo);
	
	var divProcura1 = $('<div/>')
		.addClass('col-md-12')
		.append(formularioRelatorio);
		
	var divProcura2 = $('<div/>')
		.addClass('col-md-12')
		.append(divTitulo);
		
	var divProcura3 = $('<div/>')
		.addClass('col-md-12')
		.append(formularioTabelaRelatorio);
		
	var divProcura4 = $('<div/>')
		.addClass('col-md-12')
		.append(paginacaoTabela);
	
	var divProcura = $('<div/>')
		.addClass('row')
		.append(divProcura1)
		.append(divProcura2)
		.append(divProcura3)
		.append(divProcura4);
		
	var formulario = formularioHorizontal('lista' + nomeTabela, 'formulario_cor')
		.append(divProcura);
	
	mudaPainel(formulario, posicaoItemMenu);
	
	formulario.find('#nomeProcura' + nomeTabela + 'FazendaProdutor').focus();
	formulario.find('#nomeProcura').focus();
	
}
