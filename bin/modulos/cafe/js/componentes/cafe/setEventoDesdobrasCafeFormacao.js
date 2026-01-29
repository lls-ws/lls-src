/* =========================================================
 * setEventoDesdobrasCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function setEventoDesdobrasCafeFormacao(dados, formulario) {
	
	var input = formulario.find('#desdobras' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	input.bind("propertychange change click keyup input paste", function(event) {
			
		input.valid();
		
		eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
		
	});
	
	input.rules('add', {
		required: true,
		number: true,
		min: 1,
		messages: { 
			required: "É necessário informar a quantidade de desdobras!",
			min: "Quantidade de desdobras menor que {0}!"
		}
	});
	
	formulario.find('#linha_tab' + dados.nomeTabela + '2').click(function(e){
		
		eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
		
	});
	
}
