/* =========================================================
 * telaEnderecoFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function telaEnderecoFazenda(nomeTabela) {
	
	var $telaEndereco = telaEndereco(nomeTabela);
	
	var $campoIE = campoTextoHorizontal(
		'ieFazenda', 'text', 'I.E.', 9, 2, '', false, 20);
	
	var $campoCpfCnpj = campoCpfCnpjHorizontal(
		'cpfcnpjFazenda', 'CPF',
		'col-xs-9 col-md-7', 'col-xs-2', false
	);
	
	$telaEndereco.append($campoIE);
	
	$telaEndereco.append($campoCpfCnpj);
	
	return $telaEndereco;
	
}
