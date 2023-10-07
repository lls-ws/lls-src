/* =========================================================
 * mudaPainel.js
 * http://lls.net.br/
 * ========================================================= */

function mudaPainel(novoPainel, posicaoItemMenu) {
	
	if (posicaoItemMenu > 0) {
	
		marcarMenu(posicaoItemMenu);
	
	}
	
	clearHtml();
	
	$('.autocomplete-suggestions').empty();
	
	$("#painel").empty();
	
	$("#painel").html(novoPainel);
	
}
