/* =========================================================
 * setValoresCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setValoresCafeFormacao(dados, formulario, tipo) {
	
	var campos = {
		sacas: "Sacas",
		peso: "Peso"
	}
	
	if (tipo > 1) delete campos["peso"];
	
	jQuery.each( campos, function( key, campo ) {
		
		var valor = getTotalRestanteCafeFormacao(dados, formulario, campo, tipo);
		
		var msgExcedida = "";
		
		if (valor.min > valor.max) msgExcedida = "Quantidade excedida de " +
			campo.toLowerCase() + "!";
		
		jQuery.each( valor, function( i, value ) {
			
			if (!msgExcedida) {
				
				var texto = " menor que ";
				if (i == 'max') texto = " maior que ";
				
				var valorTexto = value;
				if (campo == "Peso") valorTexto = formataNumero(valorTexto, 2, false, true, "", " kg");
				
				msg = "Quantidade de " + campo.toLowerCase() + texto + valorTexto;
				
			}
			else msg = msgExcedida;
			
			var input = formulario.find('#' + campo.toLowerCase() + dados.nomeTabela);
			
			var rule = {};
			
			if (i == "min") rule = {min: value, messages: {min: msg}};
			else rule = {max: value, messages: {max: msg}};
			
			input.rules('remove', i)
			input.rules('add', rule);
			
		});
		
	});
	
}
