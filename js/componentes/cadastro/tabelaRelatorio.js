/* =========================================================
 * tabelaRelatorio.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaRelatorio(posicaoItemMenu, nomeTabela, textoLabel) {
	
	var formularioTabelaRelatorio = formularioTabela(nomeTabela);
	
	var paginacaoTabela = paginacao(
		'paginaLista' + nomeTabela,
		'eventoLista' + nomeTabela,
		0, 0, nomeTabela
	);
	
	var formularioRelatorio = eval ("formularioRelatorio" + nomeTabela +
		"('" + nomeTabela + "', '" + posicaoItemMenu + "')"
	);
	
	var titulo = $("<div/>").addClass('titulo_tabela')
		.text(tituloPainelCadastro(2, eval('pegaNomeColunas' + nomeTabela + '(3)')));
	
	var tituloTabela = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(titulo);
	
	var divProcura1 = $('<div/>')
		.addClass('col-md-12')
		.append(formularioRelatorio);
		
	var divProcura2 = $('<div/>')
		.addClass('col-md-12')
		.append(tituloTabela);
		
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
