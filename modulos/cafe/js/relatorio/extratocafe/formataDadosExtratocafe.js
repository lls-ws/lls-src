/* =========================================================
 * formataDadosExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosExtratocafe(dados) {
	
	dados.data = formataData(dados.data);
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.peneira = decodeURIComponent(dados.peneira);
	dados.sacas = formataNumeroSacasCafe(dados.sacas);
	dados.peso = formataNumero(dados.peso, 2, false, true, "", " kg");
	
}
