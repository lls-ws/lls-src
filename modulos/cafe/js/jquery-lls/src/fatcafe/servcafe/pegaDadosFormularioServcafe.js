/* =========================================================
 * pegaDadosFormularioServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioServcafe(dados) {
	
	var cadastro = {
		id: $("#id" + dados.nomeTabela).val(),
		data: $("#data" + dados.nomeTabela).datepicker("getDate"),
		sacas: $("#sacas" + dados.nomeTabela).val(),
		valor: formataNumeroSql($("#valor" + dados.nomeTabela).val()),
		obs: encodeURIComponent( unescape($("#observacao" + dados.nomeTabela).val()))
	}
	
	var idOscafe = {
		id: $("#id" + dados.nomeTabelaCadastro).val()
	}
	
	var idPreco = {
		id: $("#idnomeProcuraCadastro" + dados.nomeTabela + "Preco").val()
	}
	
	return {
		cadastro: cadastro,
		idOscafe: idOscafe,
		idPreco: idPreco
	};
	
}
