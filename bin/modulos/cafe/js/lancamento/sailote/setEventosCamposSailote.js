/* =========================================================
 * setEventosCamposSailote.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposSailote(dados, formulario) {
	
	var input = formulario.find('#ticket' + dados.nomeTabela);
		
	input.bind("propertychange change click keyup input paste", function(event) {
		
		input.valid();
		
	});
	
	input.rules('add', {
		messages: { required: "É necessário informar o número do ticket" }
	});
	
	input = formulario.find('#sacas' + dados.nomeTabela);
	
	input.bind("propertychange change click keyup input paste", function(event) {
			
		eval ("checkValores" + dados.nomeTabela + "(dados, formulario)");
		
		input.valid();
		
	});
		
	input = formulario.find('#peso' + dados.nomeTabela);
			
	input.on('focusout',function () {
			
		var valor = { peso: formataNumeroSql(input.val()) }
		
		arredondaPesoCafe(valor);
		
		input.val(formataNumero(valor.peso, 2, false, true, "", " kg"));
			
	});
	
}
