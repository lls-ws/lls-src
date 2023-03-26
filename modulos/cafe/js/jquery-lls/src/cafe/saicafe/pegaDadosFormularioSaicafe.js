/* =========================================================
 * pegaDadosFormularioSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioSaicafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		lote: $("#lote" + nomeTabela).val(),
		sacas: $("#sacas" + nomeTabela).val(),
		peso: formataNumeroSql($("#peso" + nomeTabela).val()),
		destino: encodeURIComponent( unescape($("#destino" + nomeTabela).val())),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return {
		cadastro: cadastro
	};
	
}
