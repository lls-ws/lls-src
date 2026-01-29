/* =========================================================
 * limpaDadosFormularioOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioOscafe(nomeTabela) {
	
	var formulario = limpaDadosFormularioCafe(nomeTabela);
	
	formulario.find('#autorizacao' + nomeTabela).val('');
	formulario.find('#instrucoes' + nomeTabela).val('');
	
}
