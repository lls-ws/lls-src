/* ================ menuCadastrosOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function menuCadastrosOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = menuCadastrosMilho(nomesItensMenu, opcoesMenu);
	return opcoesMenu;
}




/* ================ menuCadastrosMilho.js ==================
 * http://lls.net.br/
 * ========================================================= */
 
function menuCadastrosMilho(nomesItensMenu, opcoesMenu) {
	
	var $item1 = 'novoFormulario("Umidade", "Codigo", "' + opcoesMenu.posicaoMenu + '", "click")';
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		separator: true,
		titulo: "Milho",
		icone: "scale",
		texto: "Tabela de Umidades de Milho",
		url: $item1
	}

	return opcoesMenu;
	
}
