/* ================ telaMenuOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function telaMenuOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = telaMenuBalanca(nomesItensMenu, opcoesMenu);
	return opcoesMenu;
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
