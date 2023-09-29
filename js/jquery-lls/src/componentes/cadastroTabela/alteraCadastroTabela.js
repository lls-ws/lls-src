/* =========================================================
 * alteraCadastroTabela.js
 * http://lls.net.br/
 * ========================================================= */

function alteraCadastroTabela(idCadastro, nomeTabela, nomeTabelaCadastro) {
	
	var $formulario = eval('formulario' + nomeTabela + '(1, "' +
		nomeTabela + '", "' + nomeTabelaCadastro + '")'
	);
	
	mostraDialogAlterar($formulario, tituloPainelCadastro(1, nomeTabela), 'Altera' + nomeTabela);
	
	var $tr = $('#div' + nomeTabela + ' #table' + nomeTabela +
		' #tbody' + nomeTabela + ' #' + nomeTabela.toLowerCase() + '_' + idCadastro
	);
	
	eval('setDadosFormulario' + nomeTabela + '("' + idCadastro +
		'", "' + nomeTabela + '" , $tr, $formulario, "' + nomeTabelaCadastro + '")'
	);
	
}
