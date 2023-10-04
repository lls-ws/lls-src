/* =========================================================
 * getTotalItensMenu.js
 * http://lls.net.br/
 * ========================================================= */

function getTotalItensMenu() {
	
	var idMenuUsuario = $('#menuUsuario').children('li').attr("id");
	
	var totalItensMenu = idMenuUsuario.replace('itemMenu', '');
	
	return totalItensMenu;
	
}
