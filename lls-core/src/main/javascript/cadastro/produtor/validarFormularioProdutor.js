/* =========================================================
 * validarFormularioProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioProdutor(tipoOperacao, nomeTabela, formulario) {
	
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
            nomeProdutor: {required: true,
						   noSpace: true},
			siteProdutor: {checkurl: true},
			cpfcnpjProdutor: {validacpfcnpj: true},
			nomeTabelaFazenda: {checkrowfazenda: true}
        },
        messages: {
			nomeProdutor: 'É necessário informar o nome do ' + nomeTabela.toLowerCase() + '!',
			emailProdutor: 'Email informado de forma errada!',
			siteProdutor: 'Site informado de forma errada!',
			cpfcnpjProdutor: 'É necessário preencher esse campo!'
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarProdutor(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarCpfCnpj();
	
	jQuery.validator.addMethod("checkrowfazenda", function(value, element) {
		
		var $rowCount = jQuery($('#tbodyFazenda')).find('tr').length;
		
		if ($rowCount > 0) {
			
			return true;
			
		}
		else {
			
			mostraDialog(
				'É necessário adicionar uma fazenda!',
				'texto_cor_vermelho',
				'table',
				tituloPainelCadastro(0, nomeTabela)
			);
			
			return false;
			
		}
		
		}, ""
	);
	
}
