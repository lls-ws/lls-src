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

function getTotalItensMenu() {
	
	var idMenuUsuario = $('#menuUsuario').children('li').attr("id");
	
	var totalItensMenu = idMenuUsuario.replace('itemMenu', '');
	
	return totalItensMenu;
	
}
