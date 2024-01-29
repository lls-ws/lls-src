/* =========================================================
 * formularioUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function formularioUmidade(idUmidade, nomeTabela) {
	
	var $idTela = 'div' + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela});
	
	var $campoCodigo = campoNumeroHorizontal("codigo" + nomeTabela, "Codigo", 9, 2, 2, 4, false, false, "", " %");
	
	var $campoDesconto = campoNumeroHorizontal("desconto" + nomeTabela, "Desconto", 9, 2, 2, 4, false, true, " ", " %");
	
	var $campoValor = campoNumeroHorizontal("valor" + nomeTabela, "Valor", 9, 2, 2, 6, false, true, "R$ ", "");
	
	$formTela.append($campoCodigo);
	
	$formTela.append($campoDesconto);
	
	$formTela.append($campoValor);
	
	var $formulario = formularioCadastro(idUmidade, nomeTabela, 2, 4, $formTela);
	
	return $formulario;
	
}
