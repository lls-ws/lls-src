/* =========================================================
 * limpaDadosFormularioSailote.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioSailote(dados) {
	
	limpaDadosFormularioDesdobrasCafe(dados);
	
	$('#lote' + dados.nomeTabela).val('');
	
}
