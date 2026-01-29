/* =========================================================
 * setDadosFormularioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioServicomilho(servicomilho) {
	
	formataDadosServicomilho(servicomilho);
	
	$('#divDialogAlteraServicomilho').empty();
	$('#divDialogAlteraServicomilho').remove();
	
	var formulario = formularioAlteraServicomilho(servicomilho);
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, servicomilho.nomeTabela), 'Altera' + servicomilho.nomeTabela);
	
	formulario.find('#idServicomilho').val(servicomilho.id);
	formulario.find('#dataServicomilho').val(servicomilho.data);
	formulario.find('#liquidoServicomilho').val(servicomilho.liquido).attr('disabled', 'disabled');
	formulario.find('#valorServicomilho').val(servicomilho.valor);
	formulario.find('#observacaoServicomilho').val(servicomilho.obs);
	formulario.find('#produtorServicomilho').val(servicomilho.produtor).attr('disabled', 'disabled');
	formulario.find('#servicoServicomilho').val(servicomilho.servico).attr('disabled', 'disabled');
	formulario.find('#idnomeProcuraCadastroServicomilhoFazendaProdutor').val(servicomilho.idFazenda);
	formulario.find('#idnomeProcuraCadastroServicomilhoPreco').val(servicomilho.idServico);

	formulario.find('#valorServicomilho').focus();

}
