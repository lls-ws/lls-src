/* =========================================================
 * campoSqlProcuraLote.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraLote(suggestion, tipo) {
	
	var peso = formataNumero(suggestion.data.peso, 2, false, false, "", " kg");
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<span class="' + 'badge"' + '><i>Sacas: ' + formataNumeroSacasCafe(suggestion.data.sacas) + '</i></span>' +
			'<h5 class="' + 'list-group-item-heading"' + '>' + suggestion.value + '</h5>' +
			'<p class="' + 'list-group-item-text"' + '><b><i>' +
				suggestion.data.peneira + ' ' + '</i></b></p>' +
		'</div>';
					
	}
	else {
		
		var texto = suggestion.data.sacas + '#' + peso + '#' +
			suggestion.data.sacasTotal + '#' + suggestion.data.pesoTotal + '#' +
			suggestion.data.observacao + '#' + suggestion.data.pilha + '#' + suggestion.data.peneira;
		
		return {
			texto: texto,
			valor: suggestion.value
		};
		
	}
	
}
