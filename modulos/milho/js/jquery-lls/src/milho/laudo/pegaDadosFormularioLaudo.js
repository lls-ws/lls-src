/* =========================================================
 * pegaDadosFormularioLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioLaudo(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		laudo: $("#laudo" + nomeTabela).val()
	}
	
	return dados;
	
}
