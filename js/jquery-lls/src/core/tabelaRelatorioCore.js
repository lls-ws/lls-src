/* =========================================================
 * tabelaRelatorioCore.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaRelatorioCore(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-titulo.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-procura.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var formularioTabelaRelatorio = formularioTabela(dados.nomeTabela);
	
	dados.pagina = 0;
	
	var paginacaoTabela = paginacaoCore(dados, 0);
	
	dados.pagina = 1;
	
	var formularioRelatorio = eval('formularioRelatorio' + dados.nomeTabela + '(dados)');
	
	var titulo = label(
		'tituloRelatorio' + dados.nomeTabela,
		tituloPainelCadastro(2, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')),
		'texto_label texto_grande'
	).addClass('col-md-12 col-xs-12');
	
	var divTitulo = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(titulo);
	
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
		
	var formulario = formularioHorizontal('lista' + dados.nomeTabela, 'formulario_cor')
		.append(divProcura);
	
	mudaPainel(formulario, dados.posicaoItemMenu);
	
	formulario.find('#nomeProcura' + dados.nomeTabela + 'FazendaProdutor').focus();
	
}
