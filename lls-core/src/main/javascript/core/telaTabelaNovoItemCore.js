/* =========================================================
 * telaTabelaNovoItemCore.js
 * http://lls.net.br/
 * ========================================================= */

function telaTabelaNovoItemCore(dados) {
	
	$('#divDialogAltera' + dados.nomeTabela).empty();
	$('#divDialogAltera' + dados.nomeTabela).remove();
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	titulo = titulo.split(' ');
	titulo = titulo[0];
	
	mostraDialogAlterar(eval ('formulario' + dados.nomeTabela + '(dados)'),
		tituloPainelCadastro(0, titulo),
		'Altera' + dados.nomeTabela
	);
	
}
