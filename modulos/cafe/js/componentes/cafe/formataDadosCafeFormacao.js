/* =========================================================
 * formataDadosCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosCafeFormacao(dados) {
	
	dados.peso = formataNumero(dados.peso, 2, false, false, "", " kg");
	dados.observacao = decodeURIComponent(dados.observacao);
	
	dados["titulo"] = dados.lote;
	
	dados["alterar"] = 0;
	dados["remover"] = 0;
	
}
