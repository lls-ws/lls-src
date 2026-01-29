/* =========================================================
 * pegaTabelaCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaCadastro(cadastros, nomeTabela) {
	
	var $tabela = tabela(
		'tableDialog' + nomeTabela,
		eval ('pegaNomeColunas' + nomeTabela + '(1)')
	);
	
	var $tbody = tbody('tbodyDialog' + nomeTabela);
	
	$tabela.append($tbody);
	
	for(var j = 0; j < cadastros.length; j++) {
		
		cadastros[j]["nomeTabela"] = nomeTabela;
		
		eval ('setLinhaTabela' + nomeTabela + '(cadastros[j], $tbody, null)');
		
	}
	
	var $divTabela = $('<div />')
		.attr('id', 'divTabelaDialog' + nomeTabela)
		.addClass('form-table table-responsive')
		.append($tabela);
	
	return $divTabela;
	
}
