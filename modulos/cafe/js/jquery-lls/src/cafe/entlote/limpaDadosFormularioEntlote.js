/* =========================================================
 * limpaDadosFormularioEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioEntlote(dados) {
	
	limpaDadosFormularioDesdobrasCafe(dados);
	
	$("#lote" + dados.nomeTabela).val('');
	
}
