/* =========================================================
 * formularioLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLaudo(idLaudo, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-botao.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-tabela.js", "js");
	
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
