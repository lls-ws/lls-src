/* =========================================================
 * pegaDadosFormularioOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioOscafe(nomeTabela) {
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		lote: $("#lote" + nomeTabela).val(),
		sacas: $("#sacas" + nomeTabela).val(),
		peso: formataNumeroSql($("#peso" + nomeTabela).val()),
		instrucoes: encodeURIComponent( unescape($("#instrucoes" + nomeTabela).val())),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	return {
		cadastro: cadastro
	};
	
}
