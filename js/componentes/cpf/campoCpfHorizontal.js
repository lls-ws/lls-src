/* =========================================================
 * campoCpfHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoCpfHorizontal(id, textoLabel, tamanhoLabel, required) {
						      
	var $campoCpfHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $input = input(id, 'text', 'form-control', '___.___.___-__', required, '14');
	
	$input.mask("999.999.999-99");
	
	$input.focusout(function (event) {  
		
		var target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
		
		var $cpf = target.value.replace('.', '');
		$cpf = $cpf.replace('.', '');
		$cpf = $cpf.replace('-', '');
		
		var element = $(target);
		
		var resposta = validarCpf($cpf);
		
		if(!validarCpf($cpf)) {  
			
			element.val('');
			
		}
		
	});
	
	var $divInput = divInput(id, '3');
	
	$divInput.append($input);
	
	$campoCpfHorizontal.append($divInput);
	
	return $campoCpfHorizontal;
	
}
