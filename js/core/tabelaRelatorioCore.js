/* =========================================================
 * tabelaRelatorioCore.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaRelatorioCore(dados) {
	
	var formularioTabelaRelatorio = formularioTabela(dados.nomeTabela);
	
	dados.pagina = 0;
	
	var paginacaoTabela = paginacaoCore(dados, 0);
	
	dados.pagina = 1;
	
	var formularioRelatorio = eval('formularioRelatorio' + dados.nomeTabela + '(dados)');
	
	var titulo = $("<div/>").addClass('titulo_tabela')
		.text(tituloPainelCadastro(2, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')));

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
		
	var formulario = formularioHorizontal('lista' + dados.nomeTabela, 'formulario_cor')
		.append(divProcura);
	
	mudaPainel(formulario, dados.posicaoItemMenu);
	
	formulario.find('#nomeProcura' + dados.nomeTabela + 'FazendaProdutor').focus();
	
}
