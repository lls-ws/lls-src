/* =========================================================
 * setDadosFormularioCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioCore(dados) {
	
	eval ("formataDados" + dados.nomeTabela + "(dados)");
	
	var formulario = eval ("formulario" + dados.nomeTabela + "(dados)");
	
	mostraDialogAlterar(formulario,
						tituloPainelCadastro(0,
							eval('pegaNomeColunas' + dados.nomeTabela + '(4)')),
						'Altera' + dados.nomeTabela);
	
	jQuery.each( dados.array, function( i, value ) {
		
		formulario.find('#' + i + dados.nomeTabela).val(value);
		
	});
	
	$('#divDialogVisualiza' + dados.nomeTabelaCadastro).empty();
	$('#divDialogVisualiza' + dados.nomeTabelaCadastro).remove();
	$('#divDialogVisualiza' + dados.nomeTabelaCadastro).dialog( "close" );
	
	dados.tipoOperacao = 0;
	
	setDadosTabelaLancamentoCore(dados);
	
}
