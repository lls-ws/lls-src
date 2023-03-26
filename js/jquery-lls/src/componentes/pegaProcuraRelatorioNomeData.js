/* =========================================================
 * pegaProcuraRelatorioNomeData.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraRelatorioNomeData(pagina, nomeTabela) {
	
	var dadosRelatorio = pegaProcuraRelatorioNome(pagina, nomeTabela);
	
	dadosRelatorio["dataInicial"] = $("#dataInicial" + nomeTabela).datepicker("getDate");
	dadosRelatorio["dataFinal"] = $("#dataFinal" + nomeTabela).datepicker("getDate");
	
	return dadosRelatorio;
	
}
