/* =========================================================
 * campoSqlProcuraFazendaProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraFazendaProdutor(suggestion, tipo) {
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<h5 class="' + 'list-group-item-heading"' + '>' + suggestion.value + '</h5>' +
			'<p class="' + 'list-group-item-text"' + '><b><i>' +
				suggestion.data.fazenda + ' ' + '</i></b></p>' +
		'</div>';
					
	}
	else {
		
		return {
			texto: suggestion.data.fazenda,
			valor: suggestion.value
		};
		
	}
	
}
