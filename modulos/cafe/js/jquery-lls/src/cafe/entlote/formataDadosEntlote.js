/* =========================================================
 * formataDadosEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosEntlote(dados) {
	
	if (dados.desdobras == 0) dados.desdobras++;
	
	eval ('formataDados' + dados.nomeTabelaLancamento[0] + '(dados.array)');
	
}
