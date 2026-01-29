/* =========================================================
 * pegaDadosFormularioTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioTramilho(nomeTabela, tipoOperacao) {
	
	if (tipoOperacao == "1") {
		
		var dados = {
			produtorSaida: $("#nomeProcuraCadastro" + nomeTabela + "Milho").val(),
			produtorEntrada: $("#nomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val(),
			liquido: $("#liquido" + nomeTabela).val()
		}
		
	}
	else {
	
		var dados = {
			data: $("#data" + nomeTabela).datepicker("getDate"),
			idFazendaEntrada: $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val(),
			idFazendaSaida: $("#idnomeProcuraCadastro" + nomeTabela + "Milho").val(),
			liquido: formataNumeroSql($("#liquido" + nomeTabela).val()),
			obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
		}
	
	}
				
	return dados;
	
}
