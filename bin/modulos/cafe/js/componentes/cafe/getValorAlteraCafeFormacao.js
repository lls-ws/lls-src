/* =========================================================
 * getValorAlteraCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function getValorAlteraCafeFormacao(campo, formulario, nomeTabela) {
	
	var valorAltera = formulario.find('#' + campo.toLowerCase() + 'Altera' + nomeTabela).val();
	
	if (valorAltera == null) valorAltera = 0;
	
	return valorAltera;
	
}
