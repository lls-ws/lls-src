/* =========================================================
 * validarFormularioEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioEmpresa(tipoOperacao, nomeTabela, formulario) {
	
	formulario.validate({
        ignore: ".ignore",
        highlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).addClass('glyphicon-remove');
			jQuery(element).closest('.form-group').addClass('has-error has-feedback');
			
			if (jQuery(element).attr('id') == 'cpfcnpj' + nomeTabela) {
					
				jQuery(element).parent().parent().addClass('has-error has-feedback');
				
			}
			
		},
		unhighlight: function(element) {
			
			var id_attr = "#" + jQuery(element).attr("id") + "1";
			
			$(id_attr).removeClass('glyphicon-remove');
			jQuery(element).closest('.form-group').removeClass('has-error has-feedback');
			
			if (jQuery(element).attr('id') == 'cpfcnpj' + nomeTabela) {
					
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
				if (element.attr('id') == 'cpfcnpj' + nomeTabela) {
					
					error.insertAfter(element.parent());
					
				}
				else {
				
					error.insertAfter(element);
				}
			}
		},
		rules: {
            nomeEmpresa: {required: true,
						   noSpace: true},
			siteEmpresa: {checkurl: true},
			cpfcnpjEmpresa: {validacpfcnpj: true}
        },
        messages: {
			nomeEmpresa: 'É necessário informar o nome da ' + nomeTabela.toLowerCase() + '!',
			numeroEmpresa: 'É necessário informar o número do telefone!',
			siteEmpresa: 'Site informado de forma errada!',
			emailEmpresa: 'Email informado de forma errada!',
			cpfcnpjEmpresa: 'É necessário preencher esse campo!'
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarEmpresa(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarCpfCnpj();
	
}
