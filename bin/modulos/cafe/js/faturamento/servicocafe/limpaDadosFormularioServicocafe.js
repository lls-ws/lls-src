/* =========================================================
 * limpaDadosFormularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioServicocafe(nomeTabela) {
	
	var formulario = $('#' + nomeTabela.toLowerCase() + 'Form');
	
	formulario.find('#id' + nomeTabela).val('');
	formulario.find('#sacas' + nomeTabela).val('');
	formulario.find('#valor' + nomeTabela).val('');
	formulario.find('#lote' + nomeTabela).val('');
	formulario.find('#observacao' + nomeTabela).val('');
	
	limpaCampoSqlProcura("FazendaProdutor", "nome");
	
	limpaCampoSqlProcura("Preco", "nome");
	
}
