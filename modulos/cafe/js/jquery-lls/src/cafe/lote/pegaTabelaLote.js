/* =========================================================
 * pegaTabelaLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaLote(dados) {

	var lote = getJsonById("acha" + dados.nomeTabela + dados.nomeTabelaCadastro, dados.id);
	
	return lote;
	
}
