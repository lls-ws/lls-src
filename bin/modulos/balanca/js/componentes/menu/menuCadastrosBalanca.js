/* ================ menuCadastrosBalanca.js ==================
 * http://lls.net.br/
 * ========================================================= */
 
function menuCadastrosBalanca(nomesItensMenu, opcoesMenu) {
	
	var $item1 = 'novoCadastro("Balanca", "click", "' + opcoesMenu.posicaoMenu + '")';
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		separator: true,
		titulo: "Balanca",
		icone: "scale",
		texto: "Conectar Balança",
		url: $item1
	}

	return opcoesMenu;
	
}
