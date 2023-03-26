/* =========================================================
 * limpaDadosFormularioEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioEntcafe(nomeTabela) {
	
	var formulario = limpaDadosFormularioCafe(nomeTabela);
	
	formulario.find('#nota' + nomeTabela).val('');
	formulario.find('#valor' + nomeTabela).val('');
	formulario.find('#placa' + nomeTabela).val('');
	formulario.find('#tiket' + nomeTabela).val('');
	formulario.find('#sacasNota' + nomeTabela).val('');
	formulario.find('#pesoNota' + nomeTabela).val('');
	
}
