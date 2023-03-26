/* =========================================================
 * validarFormularioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioSaimilho(tipoOperacao, nomeTabela, formulario) {
	
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
			liquidoSaimilho: {
				required: true,
				maskNumber: true,
				checkLiquidoSaimilho: true,
				checkSaldoSaimilho: true
			},
			destinoSaimilho: {required: true},
			nomeProcuraCadastroSaimilhoMilho: {checkIdMilho: true}
        },
        messages: {
			liquidoSaimilho: {required: "É necessário informar o peso liquido!"},
			destinoSaimilho: {required: "É necessário informar o destino!"}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarSaimilho(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();

	validarId(nomeTabela);
	
	jQuery.validator.addMethod('checkLiquidoSaimilho',
		function (value, element) { 		
			
			var valor = formataNumeroSql($('#liquidoSaimilho').val());
			
			if (valor > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'O valor líquido não pode ser igual a zero!'
	);
	
	jQuery.validator.addMethod('checkSaldoSaimilho',
		function (value, element) { 		
			
			var saldo = formataNumeroSql($('#saldoSaimilho').val());
			
			if (saldo >= 0) {
				
				return true;
				
			}
			else {
				
				$('#saldoSaimilho').addClass('has-error');
				
				return false;
				
			}
			
		}, 'O peso de saída não pode ser maior que o saldo!'
	);
	
}
