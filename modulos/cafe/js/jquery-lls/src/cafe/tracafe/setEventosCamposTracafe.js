/* =========================================================
 * setEventosCamposTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposTracafe(dados, formulario) {
	
	dados.campoProcura = "FazendaProdutor";
	
	setEventosCamposCafe(dados, formulario);
	
	addEventoCampoProcuraCafe(dados, formulario, dados.campoProcura);
	
	formulario.find('#linha_tab' + dados.nomeTabela + '2').click(function(e){
		
		eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
		
	});
	
	var rule = {checkIdTracafeDestinoFazendaProdutor: true};
	
	formulario.find("#nomeProcuraCadastro" + dados.nomeTabela + "Destino" + dados.campoProcura)
		.rules('add', rule);
	
	rule = {checkIdIgualTracafeDestinoFazendaProdutor: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaCadastro)
		.rules('add', rule);
	
	rule = {checkLotesTracafe: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaCadastro)
		.rules('add', rule);
	
}
