/* =========================================================
 * telaEnderecoProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function telaEnderecoProdutor(nomeTabela) {
	
	var $telaEndereco = telaEndereco(nomeTabela);
	
	var $campoEmail = campoTextoHorizontal('emailProdutor', 'email', 'Email', 9 , 2, '', false, 50);
	
	var $campoSite = campoTextoHorizontal('siteProdutor', 'text', 'Site', 9 , 2, '', false, 50);
	
	var $campoCpfCnpj = campoCpfCnpjHorizontal(
		'cpfcnpjProdutor', 'CPF',
		'col-xs-9 col-md-7', 'col-xs-2', false
	);
	
	$telaEndereco.append($campoCpfCnpj);
	
	$telaEndereco.append($campoEmail);
	
	$telaEndereco.append($campoSite);
	
	return $telaEndereco;
	
}
