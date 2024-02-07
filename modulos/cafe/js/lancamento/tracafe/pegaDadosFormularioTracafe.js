/* =========================================================
 * pegaDadosFormularioTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioTracafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		lote: $("#lote" + nomeTabela).val(),
		sacas: $("#sacas" + nomeTabela).val(),
		peso: formataNumeroSql($("#peso" + nomeTabela).val()),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	var idFazendaDestino = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "DestinoFazendaProdutor").val()
	}
	
	return {
		cadastro: cadastro,
		idFazendaDestino: idFazendaDestino
	};
	
}
