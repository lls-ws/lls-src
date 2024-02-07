/* =========================================================
 * setEventosCamposServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposServicocafe(dados, formulario) {
	
	formulario.find('#lote' + dados.nomeTabela).addClass("text-uppercase");
	
	addEventoCampoProcuraCafe(dados, formulario, "FazendaProdutor");
	
	formulario.find("#nomeProcuraCadastro" + dados.nomeTabela + "Preco")
		.rules('add', {checkIdServicocafePreco: true});
	
	formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco2').val(1);
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'PrecoDivInput span').on('change', function() {
		
		calculaValorServicoCafe(dados);
		
	});
	
	var campos = {
		sacas: "Sacas",
		valor: "Valor"
	}
	
	jQuery.each( campos, function( i, value ) {
	
		var input = formulario.find('#' + i + dados.nomeTabela);
	
		input.css("font-weight", "Bold").css("font-size", "15px");
	
		input.bind("propertychange change click keyup input paste", function(event) {
			
			input.valid();
			
			if (i == "sacas") {
				
				calculaValorServicoCafe(dados);
				
			}
			
		});
	
		var texto = {
			valor: 1,
			msg1: "a quantidade de ",
			msg2: "Quantidade de " + i
		};
		
		if (i == "valor") {
			
			texto.valor = formataNumero(texto.valor, 2, false, true, "R$ ", "");
			texto.msg1 = "o ";
			texto.msg2 = "Valor ";
			
		}
		
		input.rules('add', {
			required: true,
			number: true,
			min: 1,
			messages: { 
				required: "É necessário informar " + texto.msg1 + i + "!",
				min: texto.msg2 + " menor que " + texto.valor
			}
		});

	});

}
