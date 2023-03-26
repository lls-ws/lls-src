/* =========================================================
 * pegaDadosFormularioBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioBaixamilho(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		valor: formataNumeroSql($("#valor" + nomeTabela).val()),
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return dados;
	
}
