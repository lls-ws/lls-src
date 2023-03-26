/* =========================================================
 * telaTabela.js
 * http://lls.net.br/
 * ========================================================= */

function telaTabela(nomeTabela, nomeTabelaCadastro) {
	
	var idTabela = 'table' + nomeTabela;
	
	var botaoTabela = botao('botaoNovo' + nomeTabela,
		'', 'plus', '0',
		'btn btn-xs btn-primary',
		'button',
		'telaTabelaNovoItem("' + nomeTabela + '", "' + nomeTabelaCadastro + '")'
	).attr('title', 'Adicionar novo registro');
	
	var nomeColunas = eval('pegaNomeColunas' + nomeTabela + '(2)');
	
	var tabelaCadastro = tabela(
		idTabela,
		nomeColunas,
		nomeTabela
	);
	
	var paragrafo2 = paragrafo('text-center texto_grande', 'texto_label')
		.append(tituloPainelCadastro(2, nomeTabela));
	
	var thTitulo = th().append(paragrafo2);
	
	var paragrafo1 = paragrafo('text-center texto_grande', 'texto_label')
		.append(botaoTabela);
	
	var thBotao = th().append(paragrafo1);
	
	var trAdd = tr('addColunas' + idTabela, '')
		.append(thBotao)
		.append(thTitulo);
	
	thTitulo.attr('colspan', tabelaCadastro.find('#nomeColunas' + idTabela + ' th').length - 1);
	
	tabelaCadastro.find('#theadtable' + nomeTabela + ' tr:last').before(trAdd);
	
	var tbodyTabela = tbody('tbody' + nomeTabela);
	
	var nomeTabelaCadastro = campoOculto('nomeTabela' + nomeTabela, nomeTabelaCadastro);
	
	tabelaCadastro.append(tbodyTabela);
	
	var divTela = $("<div/>")
		.attr({id: 'div' + nomeTabela})
		.addClass('form-table table-responsive')
		.append(tabelaCadastro)
		.append(nomeTabelaCadastro);
	
	return divTela;
	
}
