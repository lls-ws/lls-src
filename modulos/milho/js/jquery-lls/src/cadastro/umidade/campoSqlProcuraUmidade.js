/* =========================================================
 * campoSqlProcuraUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraUmidade(suggestion, tipo) {
	
	var $codigo = suggestion.value;
	var $desconto = suggestion.data.desconto;
	var $valor = suggestion.data.valor;
	
	$codigo = $codigo.replace(/\"/g, '');
	$desconto = $desconto.replace(/\"/g, '');
	$valor = $valor.replace(/\"/g, '');
	
	if (tipo == 1) {
		
		return '<div class="' + 'list-group-item"'+ '>'+
			'<h5 class="' + 'list-group-item-heading"' + '>' + $codigo + '</h5>' +
			'<span class="' + 'badge"' + '><i>' + $desconto + '</i></span>' +
			'<p class="' + 'list-group-item-text"' + '><b><i>' + $valor + '</i></b></p>' +
		'</div>';
					
	}
	else {
		
		return {
			texto: 'Desconto: ' + $desconto + ' | ' + $valor,
			valor: $codigo
		};
		
	}
	
}
