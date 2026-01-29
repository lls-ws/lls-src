/* ================ menuCadastrosOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function menuCadastrosOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = menuCadastrosBalanca(nomesItensMenu, opcoesMenu);
	opcoesMenu = menuCadastrosCafe(nomesItensMenu, opcoesMenu);
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
		icone: "dashboard",
		texto: "Tabela de Umidades de Milho",
		url: $item1
	}

	return opcoesMenu;
	
}

/* ================ menuCadastrosCafe.js ==================
 * http://lls.net.br/
 * ========================================================= */
 
function menuCadastrosCafe(nomesItensMenu, opcoesMenu) {
	
	var $item1 = 'novoFormulario("Peneira", "Nome", "' + opcoesMenu.posicaoMenu + '", "click")';
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		separator: true,
		titulo: "Café",
		icone: "filter",
		texto: "Cadastro de Peneiras de Café",
		url: $item1
	}
	
	return opcoesMenu;
	
}

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
