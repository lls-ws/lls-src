/* =========================================================
 * pegaDadosFormularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioServicocafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		lote: $("#lote" + nomeTabela).val().toUpperCase(),
		sacas: $("#sacas" + nomeTabela).val(),
		valor: formataNumeroSql($("#valor" + nomeTabela).val()),
		automatico: 0,
		pago: 0,
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	var idFazenda = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val()
	}
	
	var idPreco = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "Preco").val()
	}
	
	return {
		cadastro: cadastro,
		idFazenda: idFazenda,
		idPreco: idPreco
	};
	
}
