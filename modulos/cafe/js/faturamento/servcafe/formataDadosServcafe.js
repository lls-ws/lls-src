/* =========================================================
 * formataDadosServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosServcafe(dados) {
	
	dados.data = formataData(dados.data);
	dados.servico = decodeURIComponent(dados.servico);
	dados.observacao = decodeURIComponent(dados.observacao);
	dados.valor = formataNumero(dados.valor, 2, true, true, "R$ ", "");
	
	dados["titulo"] = dados.servico;
	
	dados["alterar"] = 0;
	dados["remover"] = 0;
	
}
