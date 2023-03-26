/* =========================================================
 * validarFormularioTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioTramilho(tipoOperacao, nomeTabela, formulario) {
	
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
            liquidoTramilho: {
				required: true,
				maskNumber: true,
				checkLiquidoTramilho: true,
				checkSaldoTramilho: true,
				checkFazendaTramilho: true
			},
			nomeProcuraCadastroTramilhoMilho: {checkIdMilho: true},
			nomeProcuraCadastroTramilhoFazendaProdutor: {checkIdFazendaProdutor: true},
			observacaoTramilho: {required: true}
        },
        messages: {
			liquidoTramilho: {required: "É necessário informar o peso liquido!"},
			observacaoTramilho: {required: "É necessário informar o histórico!"}
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarTramilho(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
	validarId(nomeTabela);
	
	jQuery.validator.addMethod('checkLiquidoTramilho',
		function (value, element) { 		
			
			var valor = formataNumeroSql($('#liquidoTramilho').val());
			
			if (valor > 0) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'O valor líquido não pode ser igual a zero!'
	);
	
	jQuery.validator.addMethod('checkSaldoTramilho',
		function (value, element) { 		
			
			var saldo = formataNumeroSql($('#saldoTramilho').val());
			
			if (saldo >= 0) {
				
				return true;
				
			}
			else {
				
				$('#saldoSaimilho').addClass('has-error');
				
				return false;
				
			}
			
		}, 'O peso de saída não pode ser maior que o saldo!'
	);
	
	jQuery.validator.addMethod('checkFazendaTramilho',
		function (value, element) { 		
			
			var idFazendaEntrada = $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val();
			var idFazendaSaida = $("#idnomeProcuraCadastro" + nomeTabela + "Milho").val();
			
			if (idFazendaEntrada != idFazendaSaida) {
				
				return true;
				
			}
			else {
				
				return false;
				
			}
			
		}, 'A fazenda de saída não pode ser igual a fazenda de entrada!'
	);
	
}
