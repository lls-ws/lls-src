/* ================ menuRelatorioOpcoes.js ===========================
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorioOpcoes(nomesItensMenu, opcoesMenu) {
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
