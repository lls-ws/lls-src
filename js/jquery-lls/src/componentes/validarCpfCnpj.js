/* =========================================================
 * validarCpfCnpj.js
 * http://lls.net.br/
 * ========================================================= */

function validarCpfCnpj() {
	
	jQuery.validator.addMethod("validacpfcnpj", function(value, element) {
		
		var $validacao = 'false';
		
		if (element.value.length == 14 || element.value.length == 0) {
		
			var $cpf = element.value.replace('.', '');
			$cpf = $cpf.replace('.', '');
			$cpf = $cpf.replace('-', '');
			$cpf = $cpf.replace('_', '');
			
			$validacao = validarCpf($cpf);
				
		}
		else if (element.value.length == 18) {
			
			var $cnpj = element.value.replace('.', '');
			$cnpj = $cnpj.replace('.', '');
			$cnpj = $cnpj.replace('/', '');
			$cnpj = $cnpj.replace('-', '');
			
			$validacao = validarCnpj($cnpj);
			
		}
		
		return $validacao;
		
		}, "Valor incorreto!"
	);
	
}
