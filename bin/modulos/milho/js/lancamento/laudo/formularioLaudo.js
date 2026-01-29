/* =========================================================
 * formularioLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLaudo(idLaudo, nomeTabela) {
	
	var $idTela = "div" + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela}).addClass("form-horizontal");
	
	var $campoLaudo = campoNumeroHorizontal("laudo" + nomeTabela, "Laudo",
		9, 2, 0, 6, false, false, "", "");
	
	$formTela.append($campoLaudo);
	
	var $formulario = formularioCadastro(idLaudo, nomeTabela, 2, 2, $formTela, 4);
	
	var laudo = {
		nomeTabela: nomeTabela,
		formulario: $formulario
	};
	
	eventoAcharLaudo(laudo);
	
	return $formulario;
	
}
