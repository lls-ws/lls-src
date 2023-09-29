/* =========================================================
 * caixaCombinacaoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function caixaCombinacaoHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, required, nomesOpcoes) {
	
	var $caixaCombinacao = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $select = $('<select />').attr({id: id, name: id});
	
	$select.addClass('form-control');
	
	jQuery.each( nomesOpcoes, function( value, nomeOpcao ) {
	
		var $option = $('<option />').val(value).text(nomeOpcao);
	
		$select.append($option);
	
	});
	
	var $divSelect = divInput(id, tamanhoCampo);
	
	$divSelect.append($select);
	
	$caixaCombinacao.append($divSelect);
	
	return $caixaCombinacao;
	
}
