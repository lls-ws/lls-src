/* =========================================================
 * formularioPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function formularioPeneira(idPeneira, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var $idTela = "div" + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela});
	
	var $campoNome = campoTextoHorizontal("nome" + nomeTabela, "text", "Nome", 9, 2, "", false, 50);
	
	$formTela.append($campoNome);
	
	var $formulario = formularioCadastro(idPeneira, nomeTabela, 2, 4, $formTela);
	
	return $formulario;
	
}
