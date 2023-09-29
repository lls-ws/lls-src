/* =========================================================
 * validarFormularioSenha.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioSenha() {
	
	jQuery.validator.addMethod("checkSenhaMin", function(value, element) {
		
		var $validacao = false;
		
		var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		
		if (false == enoughRegex.test(value)) {
			$validacao = false;
		} else {
			$validacao = true;
		}
		
		return $validacao;
		
		}, "Senha menor que 6 caracteres!"
	);
	
	jQuery.validator.addMethod("checkCodigoSegurancaMin", function(value, element) {
		
		var $validacao = false;
		
		var enoughRegex = new RegExp("(?=.{6,}).*", "g");
		
		if (false == enoughRegex.test(value)) {
			$validacao = false;
		} else {
			$validacao = true;
		}
		
		return $validacao;
		
		}, "Código de Segurança menor que 6 caracteres!"
	);
	
	jQuery.validator.addMethod("checkSenhaFraca", function(value, element) {
		
		var $validacao = false;
		
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		
		if (mediumRegex.test(value)) {
			$validacao = true;
		} else {
			$validacao = false;
		}
		
		return $validacao;
		
		}, "Senha muito fraca! Use letras maiúsculas, minúsculas, símbolos e números!"
	);
	
	jQuery.validator.addMethod("checkSenhaForte", function(value, element) {
		
		var $validacao = false;
		
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		
		if (strongRegex.test(value)) {
			$validacao = true;
		} else {
			$validacao = false;
		}
		
		return $validacao;
		
		}, "Senha média! Use letras maiúsculas, minúsculas, símbolos e números!"
	);
	
	jQuery.validator.addMethod("checkSenhaConfirma", function(value, element) {
		
		var $validacao = false;

		var $senhaNova = $('#senhaNova').val();
		
		if (value == $senhaNova) {
			$validacao = true;
		} else {
			$validacao = false;
		}
		
		return $validacao;
		
		}, "Confirmação de senha incorreta!"
	);
	
}
