/* =========================================================
 * limpaDadosFormularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioPeso(dados) {
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	formulario.find('#id' + dados.nomeTabela).val(0);
	formulario.find('#ticket' + dados.nomeTabela).val(0);
	formulario.find('#peso' + dados.nomeTabela).val('');
	formulario.find('#placa' + dados.nomeTabela).val('');
	formulario.find('#motorista' + dados.nomeTabela).val('');
	formulario.find('#produto' + dados.nomeTabela).val('');
	formulario.find('#descricao' + dados.nomeTabela).val('');
	formulario.find('#observacao' + dados.nomeTabela).val('');
	
	formulario.find('#' + dados.nomeTabela.toLowerCase() + 'Label').text("0,00 kg");
	
	formulario.find("input[name='tipo" + dados.nomeTabela + "']").prop('checked', false);
	
	dados.campoProcura = "FazendaProdutor";
	
	limpaCampoSqlProcuraCore(dados, "nome");
	
}
