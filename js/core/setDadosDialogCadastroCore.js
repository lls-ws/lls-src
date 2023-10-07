/* =========================================================
 * setDadosDialogCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogCadastroCore(dados, nomesColunasCadastro, trDados) {
	
	var tbodyCadastro = tbody('tbodyDialog' + dados.nomeTabela).append(trDados);
	
	var tabelaCadastro = tabela(
		'tableDialog' + dados.nomeTabela,
		nomesColunasCadastro
	).append(tbodyCadastro);
	
	var divTabela = $('<div />')
		.attr('id', 'divTabelaDialog' + dados.nomeTabela)
		.addClass('form-table table-responsive')
		.append(tabelaCadastro);
	
	dados.tipoOperacao = 1;
	
	var urlBotaoAlterar = 'eventoAcharCadastroCore(' + JSON.stringify(dados) + ')';
	var urlBotaoRemover = 'removeCadastroCore(' + JSON.stringify(dados) + ')';
	
	var idBotaoAlterar = 'botaoAlterar' + dados.nomeTabela;
	var idBotaoRemover = 'botaoRemover' + dados.nomeTabela;
	
	var botaoAlterar = botaoHorizontal(
		idBotaoAlterar,
		'Alterar', 'edit', 4, 0,
		'btn btn-warning',
		'button',
		urlBotaoAlterar
	).addClass('col-xs-9');
	
	var botaoRemover = botaoHorizontal(
		idBotaoRemover,
		'Excluir', 'remove', 4, 8,
		'btn btn-danger',
		'button',
		urlBotaoRemover
	).addClass('col-xs-3');
	
	var divBotoes = $('<div/>')
		.attr('id', 'divBotoes' + dados.nomeTabela)
		.addClass('row')
		.append(botaoAlterar)
		.append(botaoRemover);
	
	var divDados = $("<div/>")
		.attr('id', 'divDialog' + dados.nomeTabela)
		.append(divTabela)
		.append(divBotoes);
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	botaoRemover.find('#botaoRemover' + dados.nomeTabela)
		.attr('title', 'Excluir ' + titulo + ': ' + dados.array.titulo);
	botaoAlterar.find('#botaoAlterar' + dados.nomeTabela)
		.attr('title', 'Alterar ' + titulo + ': ' + dados.array.titulo);
	
	if (dados.array.remover == 0) {
		botaoRemover.find('#botaoRemover' + dados.nomeTabela).show();
	}
	else {
		botaoRemover.find('#botaoRemover' + dados.nomeTabela).hide();
	}
	
	if (dados.array.alterar == 0) {
		botaoAlterar.find('#botaoAlterar' + dados.nomeTabela).show();
	}
	else {
		botaoAlterar.find('#botaoAlterar' + dados.nomeTabela).hide();
	}
	
	mostraDialogAlterar(
		divDados,
		tituloPainelCadastro(4, titulo),
		'Visualiza' + dados.nomeTabela);
	
}
