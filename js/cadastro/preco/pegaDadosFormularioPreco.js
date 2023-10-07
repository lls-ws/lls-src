/* =========================================================
 * pegaDadosFormularioPreco.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioPreco(nomeTabela) {
	
	var dados = {
		id: $("#id" + nomeTabela).val(),
		nome: encodeURIComponent( unescape($("#nome" + nomeTabela).val())),
		valor: formataNumeroSql($("#valor" + nomeTabela).val())
	}
	
	return dados;
	
}
