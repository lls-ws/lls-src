/* =========================================================
 * setEventosCamposCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposCafe(dados, formulario, tipo) {
	
	var campos = {
		sacas: "Sacas",
		peso: "Peso"
	}
	
	if (tipo != null) delete campos["peso"];
	
	jQuery.each( campos, function( i, value ) {
	
		var input = formulario.find('#' + i + dados.nomeTabela);
		
		input.bind("propertychange change click keyup input paste", function(event) {
			
			input.valid();
			
			if (i == "sacas") formulario.find('#peso' + dados.nomeTabela).valid();
			
		});
		
		var valorTexto = 1;
		if (i == "peso") valorTexto = formataNumero(valorTexto, 2, false, true, "", " kg");
		
		input.rules('add', {
			required: true,
			number: true,
			min: 1,
			messages: { 
				required: "É necessário informar a quantidade de " + i + "!",
				min: "Quantidade de " + i + " menor que " + valorTexto
			}
		});
	
	});
	
}
