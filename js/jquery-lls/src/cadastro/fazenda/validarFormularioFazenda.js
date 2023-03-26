/* =========================================================
 * validarFormularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioFazenda(tipoOperacao, nomeTabela, formulario) {
	
	formulario.validate({
        ignore: ".ignore",
        highlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).addClass('glyphicon-remove');
			
			jQuery(element).closest('.form-group').addClass('has-error has-feedback');
			
			if (jQuery(element).attr('id') == 'cpfcnpjFazenda') {
					
				jQuery(element).parent().parent().addClass('has-error has-feedback');
				
			}
			
		},
		unhighlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).removeClass('glyphicon-remove');
			
			jQuery(element).closest('.form-group').removeClass('has-error has-feedback');
			
			if (jQuery(element).attr('id') == 'cpfcnpjFazenda') {
					
				jQuery(element).parent().parent().removeClass('has-error has-feedback');
					
			}
			
		},
        validClass:'success',
        errorElement: 'span',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			if(element.parent('.form-group').length) {
				error.insertAfter(element.parent());
			} else {
				
				if (element.attr('id') == 'cpfcnpjFazenda') {
					
					error.insertAfter(element.parent());
					
				}
				else {
				
					error.insertAfter(element);
				}
			}
		},
		rules: {
            nomeFazenda: {required: true,
						  noSpace: true},
			siteFazenda: {checkurl: true},
			ieFazenda: {required: true},
			cpfcnpjFazenda: {validacpfcnpj: true}
        },
        messages: {
			nomeFazenda: 'É necessário informar o nome da ' + nomeTabela.toLowerCase() + '!',
			siteFazenda: 'Site informado de forma errada!',
			ieFazenda: 'É necessário preencher esse campo!',
			cpfcnpjFazenda: 'É necessário preencher esse campo!'
		},
		submitHandler: function(form) {
            eventoInserirTabela(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarCpfCnpj();
	
}
