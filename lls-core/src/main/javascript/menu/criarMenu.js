/* =========================================================
 * criarMenu.js
 * http://lls.net.br/
 * ========================================================= */

function criarMenu(menu, menuItens, posicaoMenu, nomesItensMenu, opcoesMenu) {
	
	menu.nomeMenu = 'Cadastro';
	menu.posicaoItem = 0;
	menu.qtdItensMenu = 0;
	
	if (opcoesMenu != null) {
		
		if (opcoesMenu.qtdItensMenu < 0) opcoesMenu.qtdItensMenu = 0;
		
		menu.nomeMenu = 'Formulario';
		menu.qtdItensMenu = opcoesMenu.qtdItensMenu;
		
	}
	else nomesItensMenu = {};
	
	jQuery.each( menuItens, function( i, value ) {
		
		menu.posicaoItem++;
		menu.qtdItensMenu++;
		
		var dados = eval ('menuOpcoes' + menu.projeto + '(posicaoMenu, menu.posicaoItem)');
		
		var item = 'novo' + menu.nomeMenu + 'Core(' + JSON.stringify(dados) + ')';
		
		nomesItensMenu[menu.qtdItensMenu] = {
			separator: menuItens[i].separator,
			titulo: menuItens[i].titulo,
			icone: menuItens[i].icone,
			texto: menuItens[i].texto,
			url: item
		}
	
	});
	
	if (opcoesMenu != null) {
		opcoesMenu.qtdItensMenu = menu.qtdItensMenu;
		return opcoesMenu;
	}
	else return nomesItensMenu;
	
}
