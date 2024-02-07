/* =========================================================
 * limpaDadosFormularioTralote.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioTralote(dados) {
	
	limpaDadosFormularioDesdobrasCafe(dados);
	
	$('#lote' + dados.nomeTabela).val('');
	
}
