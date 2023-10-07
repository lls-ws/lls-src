/* =========================================================
 * telaTabelaCore.js
 * http://lls.net.br/
 * ========================================================= */

function telaTabelaCore(dados, tipo, index) {
	
	if (index == null) index = 0;
	
	var arrayTabela = [];
	
	if (tipo == 1) arrayTabela = dados.nomeTabelaCadastro[index];
	else arrayTabela = dados.nomeTabelaLancamento[index];
	
	var dadosTabela = {
		id: 0,
		posicaoItem: dados.posicaoItem,
		posicaoItemMenu: dados.posicaoItemMenu,
		tipoOperacao: 0,
		nomeTabela: arrayTabela,
		nomeTabelaCadastro: dados.nomeTabela,
		nomeTabelaLancamento: dados.nomeTabelaCadastro
	}
	
	var idTabela = 'table' + dadosTabela.nomeTabela;
	
	var titulo = eval('pegaNomeColunas' + dadosTabela.nomeTabela + '(3)');
	
	var botaoTabela = botao('botaoNovo' + dadosTabela.nomeTabela,
		'', 'plus', '0',
		'btn btn-xs btn-primary',
		'button',
		'telaTabelaNovoItemCore(' + JSON.stringify(dadosTabela) + ')'
	).attr('title', 'Adicionar ' + titulo + '!');
	
	var nomeColunas = eval('pegaNomeColunas' + dadosTabela.nomeTabela + '(2)');
	
	var tabelaCadastro = tabela(
		idTabela,
		nomeColunas
	);
	
	var tituloColunas = eval('pegaNomeColunas' + dadosTabela.nomeTabela + '(4)');
	
	var paragrafo2 = paragrafo('text-center texto_grande', 'texto_label')
		.append(tituloColunas);
	
	var thTitulo = th().append(paragrafo2);
	
	var paragrafo1 = paragrafo('text-center texto_grande', 'texto_label')
		.append(botaoTabela);
	
	var thBotao = th().append(paragrafo1);
	
	var trAdd = tr('addColunas' + idTabela, '')
		.append(thBotao)
		.append(thTitulo);
	
	thTitulo.attr('colspan',
		tabelaCadastro.find('#nomeColunas' + idTabela + ' th').length - 1);
	
	tabelaCadastro.find('#theadtable' + dadosTabela.nomeTabela + ' tr:last')
		.before(trAdd);
	
	var tbodyTabela = tbody('tbody' + dadosTabela.nomeTabela);
	
	var nomeTabelaCadastro = campoOculto('nomeTabela' + dadosTabela.nomeTabela, 0);
	
	tabelaCadastro.append(tbodyTabela);
	
	var telaTabela = $("<div/>")
		.attr({id: 'div' + dadosTabela.nomeTabela})
		.addClass('form-table table-responsive');
	
	telaTabela.append(tabelaCadastro).append(nomeTabelaCadastro);
		
	return telaTabela;
	
}
