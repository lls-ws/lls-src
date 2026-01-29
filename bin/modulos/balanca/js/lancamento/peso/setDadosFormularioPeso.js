/* =========================================================
 * setDadosFormularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioPeso(dados) {
	
	eval ("formataDados" + dados.nomeTabela + "(dados.array)");
	
	var formulario = eval ("formulario" + dados.nomeTabela + "(dados)");
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, eval('pegaNomeColunas' + dados.nomeTabela + '(3)')),
		'Altera' + dados.nomeTabela
	);
	
	jQuery.each( dados.array, function( i, value ) {
		
		formulario.find('#' + i + dados.nomeTabela).val(value);
		
	});
	
	eval ('setValoresFormulario' + dados.nomeTabela + '(dados, formulario)');
	
	eval ('setEventosCamposCafe' + dados.nomeTabela + '(dados, formulario)');
	
	formulario.find('#'+ dados.nomeTabela.toLowerCase() + 'Label')
		.text(dados.array.peso);
	
	formulario.find("#spanGroupSearch" + dados.nomeTabela + "FazendaProdutor")
		.unbind();
	
	formulario.find('#tipo' + dados.nomeTabela + 'RadioFormGroup').hide();
	
	formulario.find('#peso' + dados.nomeTabela).attr('disabled', 'disabled');
	formulario.find('#produto' + dados.nomeTabela).attr('disabled', 'disabled');
	formulario.find('#descricao' + dados.nomeTabela).prop('disabled', false);
	
	formulario.find('#observacao' + dados.nomeTabela).focus();

}
