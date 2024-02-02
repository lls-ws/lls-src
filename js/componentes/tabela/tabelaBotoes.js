/* =========================================================
 * tabelaBotoes.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaBotoes(id, nome, arrayUrls) {
	
	var size = Object.keys(arrayUrls).length;
	
	var row = $('<div/>').addClass('row');
	
	var count = 0;
	
	jQuery.each( arrayUrls, function( i, urlBotao ) {
		
		var colClasse = 'col-xs-12';
		
		count++;
		
		if (i == 'altera') {
			
			if (urlBotao) urlBotao += '("' + id + '")';
			
			var botaoTabela = botao('botaoAlterar_' + id, '', 'fa-edit', '0',
				'btn btn-xs btn-warning', 'button', urlBotao
			);
			
			botaoTabela.attr('title', "Alterar");
			
		}
		else {
			
			if (urlBotao) urlBotao += "('" + id + "', '" + nome + "')";
			
			var botaoTabela = botao('botaoRemover_' + id, '', 'fa-trash-alt', '0',
				'btn btn-xs btn-danger', 'button', urlBotao
			);
			
			botaoTabela.attr('title', "Excluir");
			
		}
		
		if (size > 1) colClasse = 'col-xs-12 col-sm-6';
		
		var divBotao = $('<div/>')
			.addClass(colClasse)
			.addClass('text-center')
			.append(botaoTabela);
		
		row.append(divBotao);
		
	});
	
	var tdBotoes = td('alinhamento_vertical_meio')
		.attr('id', 'tdBotoes')
		.append(row);
	
	return tdBotoes;
	
}
