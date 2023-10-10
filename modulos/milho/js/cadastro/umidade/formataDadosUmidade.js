/* =========================================================
 * formataDadosUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosUmidade(umidade) {
	
	umidade.codigo = formataNumero(umidade.codigo, 2, false, false, "", " %");
	
	umidade.desconto = formataNumero(umidade.desconto, 2, false, true, " ", " %");
	
	umidade.valor = formataNumero(umidade.valor, 2, false, true, "R$", "");
	
	umidade["alterar"] = 0;
	umidade["remover"] = 1;
	
	$('#nomeProcuraBotaoAdd').hide();
	
}
