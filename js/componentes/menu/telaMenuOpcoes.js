/* ================ telaMenuOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = telaMenuBalanca(nomesItensMenu, opcoesMenu);
	opcoesMenu = telaMenuCafe(nomesItensMenu, opcoesMenu);
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

/* ================ telaMenuCafe.js =======================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuCafe(nomesItensMenu, opcoesMenu) {
	
	var menu = {
		projeto: "Cafe",
		titulo: "Café",
		icone: "grain",
		posicao: "left"
	}
	
	return criarTelaMenu(nomesItensMenu, opcoesMenu, menu);
	
}





























/* ================ telaMenuBalanca.js =======================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuBalanca(nomesItensMenu, opcoesMenu) {
	
	var menu = {
		projeto: "Balanca",
		titulo: "Balança",
		icone: "scale",
		posicao: "left"
	}
	
	return criarTelaMenu(nomesItensMenu, opcoesMenu, menu);
	
}
