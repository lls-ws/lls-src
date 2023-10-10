/* =========================================================
 * validarFormularioEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioEntmilho(tipoOperacao, nomeTabela, formulario) {
	
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
			brutoEntmilho: {
				checkLiquido: true,
				checkLaudo: true,
				checkTotal: true
			},
			nomeProcuraCadastroEntmilhoFazendaProdutor: {checkIdFazendaProdutor: true},
			numeroProcuraCadastroEntmilhoUmidade: {checkIdUmidade: true}
        },
        messages: {
			laudoEntmilho: {required: "É necessário informar o laudo!"}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarEntmilho(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarId(nomeTabela);
	
	jQuery.validator.addMethod('checkLiquido',
		function (value, element) { 		
			
			var valor = formataNumeroSql($('#liquidoEntmilho').val());
			
			if (valor > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'O valor líquido não pode ser igual a zero!'
	);
	
	jQuery.validator.addMethod('checkTotal',
		function (value, element) { 		
			
			var valor = formataNumeroSql($('#totalEntmilho').val());
			
			var valorBruto = formataNumeroSql($('#brutoEntmilho').val());
			
			if (valorBruto > 0) {
			
				if (valor > 0) {
				
					return true;
					
				}
				else {
					
					return false;
					
				}
				
			}
			else {
				return true;
			}
			
		}, 'O valor total não pode ser igual a zero!'
	);
	
	jQuery.validator.addMethod('checkLaudo',
		function (value, element) { 		
			
			var laudo = $('#laudoEntmilho').val();
			
			if (laudo > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'O laudo não pode ser igual a zero!'
	);
	
}
