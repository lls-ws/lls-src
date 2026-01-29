/* =========================================================
 * campoSqlProcuraPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraPeneira(suggestion, tipo) {
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<h5 class="' + 'list-group-item-heading"' + '>' + suggestion.value + '</h5>' +
		'</div>';
					
	}
	else {
		
		return {
			texto: "",
			valor: suggestion.value
		};
		
	}
	
}
