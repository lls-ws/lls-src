/* =========================================================
 * validarFormularioTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioTelefone(tipoOperacao, nomeTabela, formulario) {
	
	jQuery.validator.addMethod("telefone", function(numero, element) {
		
		numero = numero.split("_").join("");
		numero = numero.replace("(", "");
		numero = numero.replace(")", "");
		numero = numero.replace(" ", "");
		numero = numero.replace("-", "");
		
		return this.optional(element) || numero.match(/^\d{10}$|^\d{11}$/);
	}, "Por favor digite um número válido!");
	
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
            numero: {required: true, telefone: true}
        },
        messages: {
			numero: 'Necessário informar o número!'
		},
		submitHandler: function(form) {
            eventoInserirTabela(tipoOperacao, nomeTabela);
        }
    });
	
}
