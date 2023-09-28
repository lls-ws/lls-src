/* =========================================================
 * campoCpfCnpjHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoCpfCnpjHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, required) {
						      
	var $campoHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $inputGroup = $('<div />').addClass('input-group');
	
	var $idSpan = id + "1";
	
	var $span = span('glyphicon form-control-feedback').attr('id', $idSpan);
	
	var $inputGroupAddon = span('input-group-addon').attr('id', id + 'Radio');
	
	var $inputRadioCpf = input('radio', 'radio', '', '', false, 1).css( 'cursor', 'pointer');
	
	var $inputRadioCnpj = input('radio', 'radio', '', '', false, 1).css( 'cursor', 'pointer');
	
	var $inputCpfCnpj = input(id, 'text', 'form-control', '', required, 20);
	
	var $labelCpf = label(id + 'RadioCpf', ' CPF ', '');
	
	var $labelCnpj = label(id + 'RadioCnpj', ' CNPJ ', '');
	
	var $separador = span('label');
	
	$inputRadioCpf.attr('id', id + 'RadioCpf');
	
	$inputRadioCnpj.attr('id', id + 'RadioCnpj');
	
	$inputRadioCpf.attr('checked', 'true');
	
	$inputCpfCnpj.mask("999.999.999-99");
		
	$inputCpfCnpj.attr('placeholder', '___.___.___-__');
	
	$inputRadioCpf.click(function(){
		
		$inputCpfCnpj.mask("999.999.999-99");
		
		$inputCpfCnpj.attr('placeholder', '___.___.___-__');
		
		$inputCpfCnpj.focus();
		
		$campoHorizontal.find('#' + id + 'Label').text('CPF');
		
    });
    
    $inputRadioCnpj.click(function(){
		
		$inputCpfCnpj.mask("99.999.999/9999-99");
		
		$inputCpfCnpj.attr('placeholder', '__.___.___/____-__');
		
		$inputCpfCnpj.focus();
		
		$campoHorizontal.find('#' + id + 'Label').text('CNPJ');
		
    });
	
	$separador.append('|');
	
	$inputGroupAddon.append($inputRadioCpf);
	
	$inputGroupAddon.append($labelCpf);
	
	$inputGroupAddon.append($separador);
	
	$inputGroupAddon.append($inputRadioCnpj);
	
	$inputGroupAddon.append($labelCnpj);
	
	$inputGroup.append($inputGroupAddon);
	
	$inputGroup.append($inputCpfCnpj);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($inputGroup);
	
	$divInput.append($span);
	
	$campoHorizontal.append($divInput);
	
	return $campoHorizontal;
	
}
