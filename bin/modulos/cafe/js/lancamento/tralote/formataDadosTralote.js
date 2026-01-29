/* =========================================================
 * formataDadosTralote.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosTralote(dados) {
	
	if (dados.desdobras == 0) dados.desdobras++;
	
	eval ('formataDados' + dados.nomeTabelaLancamento[0] + '(dados.array)');
	
}
