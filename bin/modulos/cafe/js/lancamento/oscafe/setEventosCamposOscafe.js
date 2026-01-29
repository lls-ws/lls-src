/* =========================================================
 * setEventosCamposOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposOscafe(dados, formulario) {
	
	setEventosCamposCafe(dados, formulario);
	
	addEventoCampoProcuraCafe(dados, formulario, "FazendaProdutor");
	
	formulario.find('#linha_tab' + dados.nomeTabela + '2').click(function(e){
		
		checkValoresCafeFormacao(dados, formulario);
		
	});
	
	var rule = {checkLotesOscafe: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaCadastro)
		.rules('add', rule);
	
}
