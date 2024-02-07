/* =========================================================
 * setDadosFormularioPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioPeneira(peneira) {
	
	formataDadosPeneira(peneira);
	
	$("#divDialogAlteraPeneira").empty();
	
	$("#divDialogAlteraPeneira").remove();
	
	var formulario = formularioPeneira(peneira.id, peneira.nomeTabela);
	
	mostraDialogAlterar(
		formulario,
		tituloPainelCadastro(1, eval('pegaNomeColunas' + peneira.nomeTabela + '(3)')), "Altera" + peneira.nomeTabela);
	
	formulario.find("#idPeneira").val(peneira.id);
	formulario.find("#nomePeneira").val(peneira.nome);
	
}
