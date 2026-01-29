/* =========================================================
 * formataDadosOslote.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosOslote(dados) {
	
	if (dados.desdobras == 0) dados.desdobras++;
	
	eval ('formataDados' + dados.nomeTabelaLancamento[0] + '(dados.array)');
	
	dados.array.pesoDespejo = formataNumero(dados.array.pesoDespejo, 2, false, false, "", " kg");
	dados.array.pesoQuebra = formataNumero(dados.array.pesoQuebra, 2, false, true, "", " kg");
	dados.array.pesoAcrescimo = formataNumero(dados.array.pesoAcrescimo, 2, false, true, "", " kg");
	
}
