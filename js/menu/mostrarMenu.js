/* =========================================================
 * mostrarMenu.js
 * http://lls.net.br/
 * ========================================================= */

function mostrarMenu() {
	
	for(var i=1; i<6; i++){
		
		$("#itemMenu" + i).show();
			
	}
	
}

function esconderMenu(posicaoMenu) {
	
	for(var i=1; i<posicaoMenu; i++){
		
		$("#itemMenu" + i).hide();
			
	}
	
}
