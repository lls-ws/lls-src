/* =========================================================
 * telaTabelaNovoItem.js
 * http://lls.net.br/
 * ========================================================= */

function telaTabelaNovoItem(nomeTabela, nomeTabelaCadastro) {
	
	$('#divDialogAltera' + nomeTabela).empty();
	
	$('#divDialogAltera' + nomeTabela).remove();
	
	mostraDialogAlterar(eval (
		'formulario' + nomeTabela + '(0, "' + nomeTabela + '", "' + nomeTabelaCadastro + '")'),
		tituloPainelCadastro(0, nomeTabela),
		'Altera' + nomeTabela
	);
	
}
