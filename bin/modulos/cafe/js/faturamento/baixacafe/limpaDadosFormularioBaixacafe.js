/* =========================================================
 * limpaDadosFormularioBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioBaixacafe(nomeTabela) {
	
	var formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	formulario.find('#id' + nomeTabela).val('');
	formulario.find('#data' + nomeTabela).val('');
	formulario.find('#produtor' + nomeTabela).val('');
	formulario.find('#fazenda' + nomeTabela).val('');
	formulario.find('#servico' + nomeTabela).val('');
	formulario.find('#sacas' + nomeTabela).val('');
	formulario.find('#total' + nomeTabela).val('');
	formulario.find('#pago' + nomeTabela).val('');
	formulario.find('#valor' + nomeTabela).val('');
	formulario.find('#observacao' + nomeTabela).val('');
	
}
