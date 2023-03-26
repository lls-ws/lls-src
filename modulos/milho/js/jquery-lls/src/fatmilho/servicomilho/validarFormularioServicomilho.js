/* =========================================================
 * validarFormularioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioServicomilho(tipoOperacao, nomeTabela, formulario) {
	
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
			valorServicomilho: {
				required: true,
				maskNumber: true,
				checkValor: true
			},
			nomeProcuraCadastroServicomilhoFazendaProdutor: {checkIdFazendaProdutor: true},
			nomeProcuraCadastroServicomilhoPreco: {checkIdPreco: true}
        },
        messages: {
			valorServicomilho: {required: "É necessário informar o valor!"}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarServicomilho(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarId(nomeTabela);
	
	jQuery.validator.addMethod('checkValor',
		function (value, element) { 		
			
			var valor = formataNumeroSql($('#valorServicomilho').val());
			
			if (valor > 0) {
				
				return true;
				
			}
			else {
				
				$('#valorServicomilho').addClass('has-error');
				
				return false;
				
			}
			
		}, 'O valor não pode ser igual a zero!'
	);
	
}
