/* =========================================================
 * validarFormularioCadastroSenha.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioCadastroSenha(dados, formulario) {
	
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
			senhaNova: {checkSenhaMin: true,
						checkSenhaFraca: true,
						checkSenhaForte: true},
			senhaConfirma: {checkSenhaConfirma: true},
			codigoSeguranca: {checkCodigoSegurancaMin: true}
        },
        messages: {
			email: 'Email informado de forma errada!',
			codigoSeguranca: {required: 'É necessário informar o código de segurança!'},
			senhaNova: {required: 'É necessário informar a nova senha!'},
			senhaConfirma: {required: 'É necessário confirmar a nova senha!'}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
			eval(dados.urlBotao + '(dados)');
        }
    });
	
	validarFormularioSenha();
	
}
