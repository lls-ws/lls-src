/* =========================================================
 * validarFormularioPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioPeneira(tipoOperacao, nomeTabela, formulario) {
	
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
			nomePeneira: {required: true, noSpace: true}
        },
        messages: {
			nomePeneira: "É necessário informar o nome!"
		},
		invalidHandler: function(e, validator){
            if(validator.errorList.length)
				$('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
        },
        submitHandler: function(form) {
            eventoSalvarPeneira(tipoOperacao, nomeTabela);
        }
    });
	
	validarFormulario();
	
}
