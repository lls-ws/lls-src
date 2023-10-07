/* =========================================================
 * telaObservacao.js
 * http://lls.net.br/
 * ========================================================= */

function telaObservacao(nomeTabela, id) {
	
	if (id == null) id = "observacao";
	
	return campoAreaTexto(
		id + nomeTabela,
		'',
		10, 255);
	
}
