/* ================ menuRelatorioOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioOpcoes(nomesItensMenu, opcoesMenu) {
	opcoesMenu = menuRelatorioBalanca(nomesItensMenu, opcoesMenu);
	opcoesMenu = menuRelatorioCafe(nomesItensMenu, opcoesMenu);
	opcoesMenu = menuRelatorioMilho(nomesItensMenu, opcoesMenu);
	return opcoesMenu;
}

/* ================ menuRelatorioMilho.js ==================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioMilho(nomesItensMenu, opcoesMenu) {
	
	var $item1 = 'novoFormulario("Entmilho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	var $item2 = 'novoFormulario("Saimilho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	var $item3 = 'novoFormulario("Milho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	var $item5 = 'novoFormulario("Movimentomilho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	var $item6 = 'novoFormulario("Servicomilho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	var $item7 = 'novoFormulario("Sintetizamilho", "find", "' + opcoesMenu.posicaoMenu + '", "click")';
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		separator: true,
		titulo: "Milho",
		icone: "align-left",
		texto: "Relação de Entradas de Milho",
		url: $item1
	}
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "align-right",
		texto: "Relação de Saídas de Milho",
		url: $item2
	}
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "stats",
		texto: "Saldo Geral de Milho",
		url: $item3
	}
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "sort-by-attributes",
		texto: "Relação de Faturamentos de Milho",
		url: $item5
	}
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "sort-by-attributes-alt",
		texto: "Relação de Serviços de Milho",
		url: $item6
	}
	
	opcoesMenu.qtdItensMenu++;
	
	nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "indent-left",
		texto: "Relação Sintetizada de Serviços de Milho",
		url: $item7
	}
	
	return opcoesMenu;
	
}

/* ================ menuRelatorioCafe.js ==================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioCafe(nomesItensMenu, opcoesMenu) {
	
	var menu = {
		projeto: "Cafe",
		titulo: "Café"
	}
	
	var menuItens = [
		{
			separator: true,
			titulo: "Café",
			icone: "align-left",
			texto: "Relação de Entradas de " + menu.titulo
		},
		{
			icone: "align-center",
			texto: "Relação de Serviços de " + menu.titulo
		},
		{
			icone: "align-right",
			texto: "Relação de Saídas de " + menu.titulo
		},
		{
			icone: "align-justify",
			texto: "Relação de Transferências de " + menu.titulo
		},
		{
			icone: "sort-by-attributes-alt",
			texto: "Relação de Cobranças de " + menu.titulo
		},
		{
			icone: "sort-by-attributes",
			texto: "Relação de Faturamentos de " + menu.titulo
		},
		
		{
			icone: "list",
			texto: "Extrato do Produtor de " + menu.titulo
		},
		{
			icone: "stats",
			texto: "Saldo Geral de " + menu.titulo
		},
		{
			icone: "indent-left",
			texto: "Relação Sintetizada de Cobranças de " + menu.titulo
		}
	];
	
	return criarMenu(menu, menuItens, opcoesMenu.posicaoMenu, nomesItensMenu, opcoesMenu);
	
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
