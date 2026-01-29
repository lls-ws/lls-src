/* =========================================================
 * pegaDadosFormularioEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioEntcafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		lote: $("#lote" + nomeTabela).val(),
		nota: $("#nota" + nomeTabela).val(),
		valor: formataNumeroSql($("#valor" + nomeTabela).val()),
		placa: pegaPlacaTexto($("#placa" + nomeTabela).val().toUpperCase()),
		ticket: $("#ticket" + nomeTabela).val(),
		sacasNota: $("#sacas" + nomeTabela).val(),
		pesoNota: formataNumeroSql($("#peso" + nomeTabela).val()),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	var idFazenda = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val()
	}
	
	return {
		cadastro: cadastro,
		idFazenda: idFazenda
	};
		
}
