/* =========================================================
 * limpaDadosFormularioSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioSaicafe(nomeTabela) {
	
	var formulario = limpaDadosFormularioCafe(nomeTabela);
	
	formulario.find('#destino' + nomeTabela).val('');
	
}
