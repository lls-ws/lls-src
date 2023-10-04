/* =========================================================
 * pegaPosicaoItemMenu.js
 * http://lls.net.br/
 * ========================================================= */

function pegaPosicaoItemMenu() {
	
	var posicaoItemMenu = 0;
	
	for(var i=1; i<=getTotalItensMenu(); i++){
		
		if ($("#itemMenu" + i).hasClass("active")) {
		
			posicaoItemMenu = i;
			
			break;
			
		}
		
	}
	
	return posicaoItemMenu;
	
}
