/* =========================================================
 * formataDadosPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosPeneira(peneira) {
	
	peneira.nome = decodeURIComponent(peneira.nome);
	
	peneira["alterar"] = 0;
	peneira["remover"] = 1;
	
	$('#nomeProcuraBotaoAdd').hide();
	
}
