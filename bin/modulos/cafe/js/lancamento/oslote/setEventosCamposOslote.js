/* =========================================================
 * setEventosCamposOslote.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposOslote(dados, formulario) {
	
	setEventoDesdobrasCafeFormacao(dados, formulario);
	
	var valores = {
		sacas: dados.array.sacasDespejo,
		peso: formataNumeroSql(dados.array.pesoDespejo)
	}
	
	var campos = {
		quebra: "Quebra",
		acrescimo: "Acrescimo"
	}
	
	jQuery.each( campos, function( i, campo ) {
		
		var tipos = {
			sacas: "sacas",
			peso: "peso"
		}
		
		jQuery.each( tipos, function( j, campoTipo ) {
		
			var input = formulario.find('#' + j + campo + dados.nomeTabela);
			
			input.bind("propertychange change click keyup input paste", function(event) {
				
				input.valid();
				
				eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
				
			});
			
			var valorTexto = valores[j];
			
			if (campoTipo == "peso") {
				
				valorTexto = formataNumero(valores[j], 2, false, true, "", " kg");
				
				input.on('focusout',function () {
						
						var valor = { peso: formataNumeroSql(input.val()) }
						
						arredondaPesoCafe(valor);
						
						input.val(formataNumero(valor.peso, 2, false, true, "", " kg"));
						
				});
				
			}
			
			input.rules('add', {
				number: true,
				max: valores[j],
				messages: { 
					max: "Quantidade de " + campo.toLowerCase() + " maior que " + valorTexto
				}
			});
		
		});
		
	});
	
	var rule = {checkLotesOslote: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaLancamento[0])
		.rules('add', rule);
	
	formulario.find('#linha_tab' + dados.nomeTabela + '3').click(function(e){
		
		var desdobras = $('#desdobras' + dados.nomeTabela).val();
		
		var rowCount = formulario.find('#tbody' + dados.nomeTabelaLancamento[0]).find('tr').length;
		
		if (rowCount != desdobras || desdobras == 0) {
			formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[1]).hide();
		}
		else formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[1]).show();
		
	});
	
}
