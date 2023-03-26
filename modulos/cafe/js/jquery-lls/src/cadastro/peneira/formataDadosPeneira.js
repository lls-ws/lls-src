/* =========================================================
 * formataDadosPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosPeneira(peneira) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	peneira.nome = decodeURIComponent(peneira.nome);
	
	peneira["alterar"] = 0;
	peneira["remover"] = 1;
	
	$('#nomeProcuraBotaoAdd').hide();
	
}
