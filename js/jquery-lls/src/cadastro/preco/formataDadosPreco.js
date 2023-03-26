/* =========================================================
 * formataDadosPreco.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosPreco(preco) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	preco.nome = decodeURIComponent(preco.nome);
	
	preco.valor = formataNumero(preco.valor, 2, false, false, "R$ ", "");
	
	preco["alterar"] = 0;
	preco["remover"] = 1;
	
	$('#nomeProcuraBotaoAdd').hide();
	
}
