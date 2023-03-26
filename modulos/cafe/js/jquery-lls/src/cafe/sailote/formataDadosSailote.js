/* =========================================================
 * formataDadosSailote.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSailote(dados) {
	
	dados.array.pesoDespejo = formataNumero(dados.array.pesoDespejo, 2, false, false, "", " kg");
	
}
