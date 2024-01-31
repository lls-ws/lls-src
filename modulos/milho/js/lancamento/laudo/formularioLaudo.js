/* =========================================================
 * formularioLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLaudo(idLaudo, nomeTabela) {
	
	var laudo = getJson("achaLaudo");
	
	var $idTela = "div" + nomeTabela;
	
	var $formTela = $("<div/>").attr({id: $idTela}).addClass("form-horizontal");
	
	var $campoLaudo = campoNumeroHorizontal("laudo" + nomeTabela, "Laudo",
		9, 2, 0, 11, false, false, "", "");
	
	$formTela.append($campoLaudo);
	
	var $formulario = formularioCadastro(idLaudo, nomeTabela, 2, 2, $formTela, 4);
	
	$formulario.find('#idLaudo').val(laudo.id);
	
	$formulario.find('#laudo' + nomeTabela).val(laudo.laudo);
	
	if (laudo.id == null) {
		
		$formulario.find('#laudo' + nomeTabela).attr('disabled', 'disabled');
		$formulario.find('#botao').hide();
		
	}
	
	return $formulario;
	
}
