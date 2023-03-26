/* =========================================================
 * campoCnpjHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoCnpjHorizontal(id, textoLabel, tamanhoLabel, required) {
	
	var $campoCnpjHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $input = input(id, 'text', 'form-control', '__.___.___/____-__', required, '18');
	
	$input.mask("99.999.999/9999-99");
	
	$input.focusout(function (event) {  
		
		var target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
		
		var $cnpj = target.value.replace('.', '');
		$cnpj = $cnpj.replace('.', '');
		$cnpj = $cnpj.replace('/', '');
		$cnpj = $cnpj.replace('-', '');
		
		var element = $(target);
		
		var resposta = validarCnpj($cnpj);
		
		if(!validarCnpj($cnpj)) {  
			
			element.val('');
			
		}
		
	});
	
	var $divInput = divInput(id, '3');
	
	$divInput.append($input);
	
	$campoCnpjHorizontal.append($divInput);
	
	return $campoCnpjHorizontal;
	
}
