/* =========================================================
 * campoAreaTexto.js
 * http://lls.net.br/
 * ========================================================= */

function campoAreaTexto(id, placeholder, linhas, maxlength) {
	
	var $campoAreaTexto = campoHorizontal(id, '', 2);
	
	var $textarea = $('<textarea/>').attr({id: id, name: id, type: 'text', placeholder : placeholder, maxlength: maxlength});
	
	var $idSpan = id + "1";
	
	var $span = span('glyphicon form-control-feedback').attr('id', $idSpan);
	
	var $divInput = divInput(id, '');
	
	$textarea.attr('rows', linhas);
	
	$textarea.addClass('form-control');
	$textarea.addClass('input-xlarge');
	
	$divInput.append($textarea);
	$divInput.append($span);
	
	$campoAreaTexto.append($divInput);
	
	return $campoAreaTexto;
	
}
