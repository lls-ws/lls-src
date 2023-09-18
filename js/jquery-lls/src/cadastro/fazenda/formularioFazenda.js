/* =========================================================
 * formularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function formularioFazenda(tipoOperacao, nomeTabela) {
	
	var $telaEndereco = telaEnderecoFazenda(nomeTabela);
	
	var $formulario = formularioCadastro(tipoOperacao, nomeTabela, tipoOperacao, 4, $telaEndereco);
	
	return $formulario;
	
}
