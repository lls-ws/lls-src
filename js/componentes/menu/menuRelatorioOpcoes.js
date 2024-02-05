/* ================ menuRelatorioOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = menuRelatorioBalanca(nomesItensMenu, opcoesMenu);
	return opcoesMenu;
}

/* ================ menuRelatorioBalanca.js ==================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioBalanca(nomesItensMenu, opcoesMenu) {
	
	var menu = {
		projeto: "Balanca",
		titulo: "Balança"
	}
	
	var menuItens = [
		{
			separator: true,
			titulo: menu.titulo,
			icone: "list",
			texto: "Relação de Pesagens da " + menu.titulo
		}
	];
	
	return criarMenu(menu, menuItens, opcoesMenu.posicaoMenu, nomesItensMenu, opcoesMenu);
	
}
