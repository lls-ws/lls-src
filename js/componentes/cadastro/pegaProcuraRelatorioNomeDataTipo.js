/* =========================================================
 * pegaProcuraRelatorioNomeDataTipo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraRelatorioNomeDataTipo(pagina, nomeTabela) {
	
	var dadosRelatorio = pegaProcuraRelatorioNomeData(pagina, nomeTabela);
	
	dadosRelatorio["tipo"] = $("#tipo" + nomeTabela).val();
	
	return dadosRelatorio;
	
}
