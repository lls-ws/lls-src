/* =========================================================
 * addEventoCampoProcuraCafe.js
 * http://lls.net.br/
 * ========================================================= */

function addEventoCampoProcuraCafe(dados, formulario, campoProcura) {
	
	var rule = {};
	
	switch (dados.nomeTabela) {
		case "Despejo":
			rule = {checkIdDespejoLote: true};
			break;
		case "Lote":
			rule = {checkIdLotePeneira: true};
			break;
		case "Entcafe":
			rule = {checkIdEntcafeFazendaProdutor: true};
			break;
		case "Oscafe":
			rule = {checkIdOscafeFazendaProdutor: true};
			break;
		case "Saicafe":
			rule = {checkIdSaicafeFazendaProdutor: true};
			break;
		case "Tracafe":
			rule = {checkIdTracafeFazendaProdutor: true};
			break;
		case "Servcafe":
			rule = {checkIdServcafePreco: true};
			break;
		case "Servicocafe":
			rule = {checkIdServicocafeFazendaProdutor: true};
			break;
	}
	
	formulario.find("#nomeProcuraCadastro" + dados.nomeTabela + campoProcura)
		.rules('add', rule);
	
}
