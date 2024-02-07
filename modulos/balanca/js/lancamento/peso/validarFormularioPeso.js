/* =========================================================
 * validarFormularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioPeso(dados, formulario) {
	
	validarFormularioCore(dados, formulario);

	jQuery.validator.addMethod("checkTipo" + dados.nomeTabela,
		function(value, element) {
			
			if (!$("input[name='tipo" + dados.nomeTabela + "']:checked").val()) {
				
				formulario.find('#tipo' + dados.nomeTabela + 'TaraLabel')
					.removeClass('texto_label')
					.addClass('text-danger');
				
				formulario.find('#tipo' + dados.nomeTabela + 'BrutoLabel')
					.removeClass('texto_label')
					.addClass('text-danger');
					
				return false;
				
			}
			else {
				
				formulario.find('#tipo' + dados.nomeTabela + 'TaraLabel')
					.removeClass('text-danger')
					.addClass('texto_label');
				
				formulario.find('#tipo' + dados.nomeTabela + 'BrutoLabel')
					.removeClass('text-danger')
					.addClass('texto_label');
					
				return true;
				
			}
		
		}, "É necessário selecionar o tipo de pesagem!"
	);
	
	jQuery.validator.addMethod("checkPlaca" + dados.nomeTabela,
		function(value, element) {
		
			value = value.split("_").join("");
			value = value.replace("-", "");
			
			if (value.length == 7) return true;
			else return false;
			
		}, "É necessário informar a placa!"
	
	);
	
	jQuery.validator.addMethod("checkBalanca" + dados.nomeTabela,
		function(value, element) {
		
			var pesoBalanca = {
				value: $('#texto' + dados.nomeTabela).text(),
				check: $('#texto' + dados.nomeTabela).hasClass("texto_cor_verde")
			}
			
			if (pesoBalanca.value <= 0) return false;
			if (!pesoBalanca.check) return false;
			
		}, "Pesagem não permitida!"
	
	);
	
}
