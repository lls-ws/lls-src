/* =========================================================
 * menuUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function menuUsuario(posicaoMenu) {
	
	var $nomesItensMenu = {};
	
	var $item1 = 'novoCadastro("Usuario", "click", "' + posicaoMenu + '")';
	var $item2 = 'logout()';
	
	$nomesItensMenu[0] = {
		icone: "lock",
		texto: "Alterar Senha",
		url: $item1
	}
	
	$nomesItensMenu[1] = {
		icone: "log-out",
		texto: "Desconectar",
		url: $item2
	}
	
	return $nomesItensMenu;
	
}
