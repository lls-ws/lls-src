/* =========================================================
 * setEventosCamposSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposSaicafe(dados, formulario) {
	
	setEventosCamposCafe(dados, formulario);
	
	var input = formulario.find('#destino' + dados.nomeTabela);
		
	input.bind("propertychange change click keyup input paste", function(event) {
		
		input.valid();
		
	});
	
	input.rules('add', {
		messages: { required: "É necessário informar o destino" }
	});
	
	addEventoCampoProcuraCafe(dados, formulario, "FazendaProdutor");
	
	formulario.find('#linha_tab' + dados.nomeTabela + '2').click(function(e){
		
		checkValoresCafeFormacao(dados, formulario);
		
	});
	
	var rule = {checkLotesSaicafe: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaCadastro)
		.rules('add', rule);
	
}
