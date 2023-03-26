/* =========================================================
 * pegaDadosFormularioSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioSaimilho(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		laudo: $("#laudo" + nomeTabela).val(),
		tiket: $("#tiket" + nomeTabela).val(),
		placa: pegaPlacaTexto($("#placa" + nomeTabela).val().toUpperCase()),
		liquido: formataNumeroSql($("#liquido" + nomeTabela).val()),
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val())),
		cilo: $("#cilo" + nomeTabela).val(),
		destino: encodeURIComponent( unescape($("#destino" + nomeTabela).val()))
	}
	
	return dados;
	
}
