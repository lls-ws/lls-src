/* =========================================================
 * telaEnderecoFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function telaEnderecoFazenda(nomeTabela) {
	
	var $telaEndereco = telaEndereco(nomeTabela);
	
	var $campoIE = campoTextoHorizontal(
		'ieFazenda', 'text', 'I.E.', 9, 2, '', false, 20);
	
	var $campoIM = campoTextoHorizontal(
		'cpfcnpjFazenda', 'text', 'I.M.', 9, 2, '', false, 20);
	
	$telaEndereco.append($campoIE);
	
	$telaEndereco.append($campoIM);
	
	return $telaEndereco;
	
}
