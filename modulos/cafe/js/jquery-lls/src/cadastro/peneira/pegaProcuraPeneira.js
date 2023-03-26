/* =========================================================
 * pegaProcuraPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraPeneira(pagina) {
	
	var dados = {
		"id": pagina,
		"nome": $("#nomeProcura").val()
	}
	
	return dados;
	
}
