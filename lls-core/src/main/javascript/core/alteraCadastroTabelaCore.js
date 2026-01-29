/* =========================================================
 * alteraCadastroTabelaCore.js
 * http://lls.net.br/
 * ========================================================= */

function alteraCadastroTabelaCore(dados) {
	
	dados["array"] = {};
	dados.array["titulo"] = dados.lote;
	
	var formulario = eval('formulario' + dados.nomeTabela + '(dados)');
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, dados.nomeTabela),
		'Altera' + dados.nomeTabela
	);
	
	eval('setDadosFormulario' + dados.nomeTabela + '(dados, formulario)');
	
}
