/* =========================================================
 * marcarMenu.js
 * http://lls.net.br/
 * ========================================================= */

function marcarMenu(posicaoItemMenu) {
	
	for(var i=1; i<=getTotalItensMenu(); i++){
		
		if (posicaoItemMenu != i) {
		
			$("#itemMenu" + i).removeClass("active");
			
		}
		else {
			
			$("#itemMenu" + i).addClass("active");
			
			break;
			
		}
		
	}
	
}
