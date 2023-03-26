/* =========================================================
 * formularioPreco.js
 * http://lls.net.br/
 * ========================================================= */

function formularioPreco(idPreco, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	var $idTela = "div" + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela});
	
	var $campoNome = campoTextoHorizontal("nome" + nomeTabela, "text", "Nome", 9, 2, "", false, 50);
	
	var $campoValor = campoNumeroHorizontal("valor" + nomeTabela, "Valor", 9, 2, 2, 4, false, false, "R$ ", "");
	
	$formTela.append($campoNome);
	
	$formTela.append($campoValor);
	
	var $formulario = formularioCadastro(idPreco, nomeTabela, 2, 4, $formTela);
	
	return $formulario;
	
}
