/* =========================================================
 * setDadosFormularioPreco.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioPreco(preco) {
	
	formataDadosPreco(preco);
	
	$("#divDialogAlteraPreco").empty();
	
	$("#divDialogAlteraPreco").remove();
	
	var formulario = formularioPreco(preco.id, preco.nomeTabela);
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, eval('pegaNomeColunas' + preco.nomeTabela + '(3)')), "Altera" + preco.nomeTabela);
	
	formulario.find("#idPreco").val(preco.id);
	formulario.find("#valorPreco").val(preco.valor);
	formulario.find("#nomePreco").val(preco.nome);
	
}
