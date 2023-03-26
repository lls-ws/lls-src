/* =========================================================
 * pegaTabelaServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaServcafe(dados) {

	return getJsonById(
		"acha" + dados.nomeTabela + dados.nomeTabelaCadastro,
		dados.id
	);
	
}
