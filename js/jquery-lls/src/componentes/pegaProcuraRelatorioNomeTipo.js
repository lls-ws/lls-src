/* =========================================================
 * pegaProcuraRelatorioNomeTipo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraRelatorioNomeTipo(pagina, nomeTabela) {
	
	var dados = pegaProcuraRelatorioNome(pagina, nomeTabela);
	
	dados["tipo"] = $("#tipo" + nomeTabela).val();
	
	return dados;
	
}
