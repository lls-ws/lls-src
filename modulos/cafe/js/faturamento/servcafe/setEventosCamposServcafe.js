/* =========================================================
 * setEventosCamposServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposServcafe(dados, formulario) {
	
	var sacas = $('#sacas' + dados.nomeTabelaCadastro).val();
	
	var input = formulario.find('#sacas' + dados.nomeTabela);
	
	input.val(sacas).css("font-weight", "Bold").css("font-size", "15px");
	
	input.bind("propertychange change click keyup input paste", function(event) {
		
		input.valid();
		
		calculaValorServicoCafe(dados);
		
	});
	
	addEventoCampoProcuraCafe(dados, formulario, "Preco");
	
	formulario.find('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco2').val(1);
	
	formulario.find('#nomeProcuraCadastro' + dados.nomeTabela + 'PrecoDivInput span').on('change', function() {
		
		calculaValorServicoCafe(dados);
		
	});
	
	input = formulario.find('#valor' + dados.nomeTabela);

	input.css("font-weight", "Bold").css("font-size", "15px");

	input.bind("propertychange change click keyup input paste", function(event) {
		
		input.valid();
		
	});

	input.rules('add', {
		required: true,
		number: true,
		min: 1,
		messages: { 
			required: "É necessário informar o valor!",
			min: "Valor menor que R$ 1,00"
		}
	});

}
