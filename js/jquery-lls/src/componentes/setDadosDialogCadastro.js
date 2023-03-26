/* =========================================================
 * setDadosDialogCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogCadastro(cadastro, nomesColunasCadastro, trCadastro) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cadastro-tabela.js", "js");
	
	if (nomesColunasCadastro == null) {
		
		nomesColunasCadastro = eval ('pegaNomeColunas' + cadastro.nomeTabela + '(1)');
		
	}
	
	var tbodyCadastro = tbody('tbodyDialog' + cadastro.nomeTabela).append(trCadastro);
	
	var tabelaCadastro = tabela(
		'tableDialog' + cadastro.nomeTabela,
		nomesColunasCadastro
	).append(tbodyCadastro);
	
	var divTabela = $('<div />')
		.attr('id', 'divTabelaDialog' + cadastro.nomeTabela)
		.addClass('form-table table-responsive')
		.append(tabelaCadastro);
	
	var $urlBotaoAlterar = 'alteraCadastro("' + cadastro.id + '", "' + cadastro.nomeTabela + '")';
	var $urlBotaoRemover = "removeCadastro('" + cadastro.id + "', '" + cadastro.nome +
		"' , '" + cadastro.nomeTabela + "')";
	
	var idBotaoAlterar = 'botaoAlterar' + cadastro.nomeTabela;
	var idBotaoRemover = 'botaoRemover' + cadastro.nomeTabela;
	
	var botaoAlterar = botaoHorizontal(
		idBotaoAlterar,
		'Alterar', 'edit', 4, 0,
		'btn btn-warning',
		'button',
		$urlBotaoAlterar
	).addClass('col-xs-6');
	
	var botaoRemover = botaoHorizontal(
		idBotaoRemover,
		'Excluir', 'remove', 4, 8,
		'btn btn-danger',
		'button',
		$urlBotaoRemover
	).addClass('col-xs-6');
	
	var divBotoes = $('<div/>')
		.attr('id', 'divBotoes')
		.addClass('row')
		.append(botaoAlterar)
		.append(botaoRemover);
	
	var divDados = $("<div/>")
		.attr('id', 'divDialog' + cadastro.nomeTabela)
		.append(divTabela)
		.append(divBotoes);
	
	if (cadastro.remover == 0) {
		botaoRemover.find('#botaoRemover' + cadastro.nomeTabela).show();
	}
	else {
		botaoRemover.find('#botaoRemover' + cadastro.nomeTabela).hide();
	}
	
	if (cadastro.alterar == 0) {
		botaoAlterar.find('#botaoAlterar' + cadastro.nomeTabela).show();
	}
	else {
		botaoAlterar.find('#botaoAlterar' + cadastro.nomeTabela).hide();
	}
	
	mostraDialogAlterar(
		divDados,
		tituloPainelCadastro(4, eval('pegaNomeColunas' + cadastro.nomeTabela + '(3)')),
		'Visualiza' + cadastro.nomeTabela);
	
}
