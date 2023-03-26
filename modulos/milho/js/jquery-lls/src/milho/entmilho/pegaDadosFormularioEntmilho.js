/* =========================================================
 * pegaDadosFormularioEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioEntmilho(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		data: $("#data" + nomeTabela).datepicker("getDate"),
		laudo: $("#laudo" + nomeTabela).val(),
		tiket: $("#tiket" + nomeTabela).val(),
		placa: pegaPlacaTexto($("#placa" + nomeTabela).val().toUpperCase()),
		bruto: formataNumeroSql($("#bruto" + nomeTabela).val()),
		impureza: formataNumeroSql($("#impureza" + nomeTabela).val()),
		chocho: formataNumeroSql($("#chocho" + nomeTabela).val()),
		quirela: formataNumeroSql($("#quirela" + nomeTabela).val()),
		liquido: formataNumeroSql($("#liquido" + nomeTabela).val()),
		limpeza: formataNumeroSql($("#limpeza" + nomeTabela).val()),
		secagem: formataNumeroSql($("#secagem" + nomeTabela).val()),
		carga: formataNumeroSql($("#carga" + nomeTabela).val()),
		recepcao: formataNumeroSql($("#recepcao" + nomeTabela).val()),
		total: formataNumeroSql($("#total" + nomeTabela).val()),
		obs: encodeURIComponent( unescape($("#observacao" + nomeTabela).val())),
		cilo: $("#cilo" + nomeTabela).val()
	}
	
	return dados;
	
}
