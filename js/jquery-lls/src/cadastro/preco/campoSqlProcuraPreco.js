/* =========================================================
 * campoSqlProcuraPreco.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraPreco(suggestion, tipo) {
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<h5 class="' + 'list-group-item-heading"' + '>' + suggestion.value + '</h5>' +
			'<p class="' + 'list-group-item-text"' + '><b><i>' +
				suggestion.data.valor + ' ' + '</i></b></p>' +
		'</div>';
					
	}
	else {
		
		return {
			texto: suggestion.data.valor,
			valor: suggestion.value
		};
		
	}
	
}
