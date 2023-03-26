/* =========================================================
 * pegaProcuraPreco.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraPreco(pagina) {
	
	var dados = {
		"id": pagina,
		"nome": $("#nomeProcura").val()
	}
	
	return dados;
	
}
