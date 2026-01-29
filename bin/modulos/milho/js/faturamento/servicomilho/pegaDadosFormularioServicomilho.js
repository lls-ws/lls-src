/* =========================================================
 * pegaDadosFormularioServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioServicomilho(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		liquido: formataNumeroSql($("#liquido" + nomeTabela).val()),
		valor: formataNumeroSql($("#valor" + nomeTabela).val()),
		automatico: 0,
		pago: 0,
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return dados;
	
}
