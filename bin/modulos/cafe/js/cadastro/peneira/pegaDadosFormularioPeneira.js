/* =========================================================
 * pegaDadosFormularioPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioPeneira(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		nome: encodeURIComponent( unescape($("#nome" + nomeTabela).val()))
	}
	
	return dados;
	
}
