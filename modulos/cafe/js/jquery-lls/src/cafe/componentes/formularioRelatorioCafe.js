/* =========================================================
 * formularioRelatorioCafe.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioCafe(dados) {
	
	var tipo = 3;
	
	if (dados.tipo != "GR") tipo = 4;
	
	return formularioRelatorioNomeDataTipoCore(
		dados,
		"FazendaProdutor",
		"Produtor",
		tipo
	);
	
}
