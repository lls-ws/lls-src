/* =========================================================
 * pegaDadosFormularioBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioBaixacafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		valor: formataNumeroSql($("#valor" + nomeTabela).val()),
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return {
		cadastro: cadastro
	};
	
}
