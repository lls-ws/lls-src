/* =========================================================
 * validarFormularioUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioUsuario(tipoOperacao, nomeTabela, formulario) {
	
	formulario.validate({
        ignore: ".ignore",
        highlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).addClass('glyphicon-remove');
			jQuery(element).closest('.form-group').addClass('has-error has-feedback');
			
		},
		unhighlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).removeClass('glyphicon-remove');
			jQuery(element).closest('.form-group').removeClass('has-error has-feedback');
			
		},
        validClass:'success',
        errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.form-group').length) {
				error.insertAfter(element.parent());
			} else {
				
				error.insertAfter(element);
				
			}
		},
		rules: {
			senhaNovaUsuario: {checkSenhaMin: true,
							   checkSenhaFraca: true,
							   checkSenhaForte: true,
							   checkSenhaAtual: true},
			senhaConfirmaUsuario: {checkSenhaConfirma: true}
        },
        messages: {
			senhaAtualUsuario: {required: 'É necessário informar a senha atual!'},
			senhaNovaUsuario: {required: 'É necessário informar a nova senha!'},
			senhaConfirmaUsuario: {required: 'É necessário confirmar a nova senha!'}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
			eventoSalvarUsuario(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarFormularioSenha();
	
	jQuery.validator.addMethod("checkSenhaAtual", function(value, element) {
		
		var $validacao = false;

		var $senhaAtual = $('#senhaAtualUsuario').val();
		
		if (value == $senhaAtual) {
			$validacao = false;
		} else {
			$validacao = true;
		}
		
		return $validacao;
		
		}, "Senha nova igual a senha atual!"
	);
	
	jQuery.validator.addMethod("checkSenhaConfirma", function(value, element) {
		
		var $validacao = false;

		var $senhaNova = $('#senhaNovaUsuario').val();
		
		if (value == $senhaNova) {
			$validacao = true;
		} else {
			$validacao = false;
		}
		
		return $validacao;
		
		}, "Confirmação de senha incorreta!"
	);
	
}
