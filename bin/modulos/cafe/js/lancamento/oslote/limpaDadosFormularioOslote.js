/* =========================================================
 * limpaDadosFormularioOslote.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioOslote(dados) {
	
	limpaDadosFormularioDesdobrasCafe(dados);
	
	$('#lote' + dados.nomeTabela).val('');
	$('#sacas' + dados.nomeTabela).val(0);
	$('#peso' + dados.nomeTabela).val(0);
	
}
