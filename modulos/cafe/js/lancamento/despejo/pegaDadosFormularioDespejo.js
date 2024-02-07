/* =========================================================
 * pegaDadosFormularioDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioDespejo(dados) {
	
	var despejo = pegaDadosFormularioCafeFormacao(dados);
	
	despejo.lote["saldoSacas"] = $("#sacasAltera" + dados.nomeTabela).val();
	despejo.lote["saldoPeso"] = $("#pesoAltera" + dados.nomeTabela).val();
	
	var idFazenda = {
		id: $("#idnomeProcuraCadastro" + dados.nomeTabelaCadastro + "FazendaProdutor").val()
	}
	
	var idFazendaDestino = {
		id: $("#idnomeProcuraCadastro" + dados.nomeTabelaCadastro + "DestinoFazendaProdutor").val()
	}
	
	if (idFazendaDestino != null) despejo["idFazendaDestino"] = idFazendaDestino;
	
	despejo["idFazenda"] = idFazenda;
	
	return despejo;
	
}
