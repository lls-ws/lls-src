/* =========================================================
 * eventoInserirTabela.js
 * http://lls.net.br/
 * ========================================================= */

function eventoInserirTabela(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "spinner", true);
	
	var cadastro = eval ('pegaDadosFormulario' + nomeTabela + '("' + nomeTabela + '")');
	
	cadastro["nomeTabela"] = nomeTabela;
	
	cadastro["tipoOperacao"] = tipoOperacao;
	
	eval ('limpaDadosFormulario' + cadastro.nomeTabela + '("' + cadastro.nomeTabela + '")');
	
	$('#divDialogAltera' + cadastro.nomeTabela).empty();
	
	$('#divDialogAltera' + cadastro.nomeTabela).remove();
	
	$('#divDialogAltera' + cadastro.nomeTabela).dialog( "close" );

	addLinhaTabelaCadastro(cadastro);
	
}
