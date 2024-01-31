/* ================ telaMenuOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = telaMenuMilho(nomesItensMenu, opcoesMenu);
	return opcoesMenu;
}

/* ================ telaMenuMilho.js =======================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuMilho(nomesItensMenu, opcoesMenu) {
	
	var menu = {
		projeto: "Milho",
		titulo: "Milho",
		icone: "leaf",
		posicao: "left"
	}
	
	return criarTelaMenu(nomesItensMenu, opcoesMenu, menu);
		
}
