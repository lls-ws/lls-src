/* =========================================================
 * setDadosFormularioUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioUmidade(umidade) {
	
	formataDadosUmidade(umidade);
	
	$('#divDialogAlteraUmidade').empty();
	
	$('#divDialogAlteraUmidade').remove();
	
	var formulario = formularioUmidade(umidade.id, umidade.nomeTabela);
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, umidade.nomeTabela), 'Altera' + umidade.nomeTabela);
	
	formulario.find('#idUmidade').val(umidade.id);
	formulario.find('#codigoUmidade').val(umidade.codigo);
	formulario.find('#descontoUmidade').val(umidade.desconto);
	formulario.find('#valorUmidade').val(umidade.valor);
	
}
