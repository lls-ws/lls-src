/* =========================================================
 * pegaProcuraProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function pegaProcuraProdutor(pagina) {
	
	var dados = {
		"id": pagina,
		"nome": $("#nomeProcura").val()
	}
	
	return dados;
	
}
