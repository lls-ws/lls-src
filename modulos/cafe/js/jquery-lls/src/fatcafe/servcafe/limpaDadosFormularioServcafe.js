/* =========================================================
 * limpaDadosFormularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioServcafe(dados) {
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	formulario.find('#id' + dados.nomeTabela).val('');
	formulario.find('#sacas' + dados.nomeTabela).val('');
	formulario.find('#valor' + dados.nomeTabela).val('');
	formulario.find('#observacao' + dados.nomeTabela).val('');
	
	limpaCampoSqlProcura("Preco", "nome");
	
}
