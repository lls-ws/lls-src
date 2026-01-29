/* =========================================================
 * campoSqlProcuraMilho.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraMilho(suggestion, tipo) {
	
	var $saldo = formataNumero(suggestion.data.saldo, 2, false, false, "", " kg")
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<span class="' + 'badge"' + '><i>Saldo: ' + $saldo + '</i></span>' +
			'<h5 class="' + 'list-group-item-heading"' + '>' + suggestion.value + '</h5>' +
			'<p class="' + 'list-group-item-text"' + '><b><i>' +
				suggestion.data.fazenda + ' ' + '</i></b></p>' +
		'</div>';
					
	}
	else {
		
		return {
			texto: 'Saldo: ' + $saldo + '\n' + suggestion.data.fazenda,
			valor: suggestion.value
		};
		
	}
	
}
