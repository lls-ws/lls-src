/* =========================================================
 * pegaProcuraUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraUmidade(pagina) {
	
	var dados = {
		"id": pagina,
		"nome": $("#nomeProcura").maskMoney("unmasked")[0]
	}
	
	return dados;
	
}
