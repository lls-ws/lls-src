/* =========================================================
 * menuCadastros.js
 * http://lls.net.br/
 * ========================================================= */

function menuCadastros(posicaoMenu) {
	
	var opcoesMenu = {
		posicaoMenu: posicaoMenu,
		qtdItensMenu: 0
	};
	
	var $nomesItensMenu = {};
	
	var $item1 = 'novoCadastro("Empresa", "click", "' + posicaoMenu + '")';
	var $item2 = 'novoFormulario("Produtor", "Nome", "' + posicaoMenu + '", "click")';
	var $item3 = 'novoFormulario("Preco", "Nome", "' + posicaoMenu + '", "click")';
	
	$nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "home",
		texto: "Cadastro de Empresa",
		url: $item1
	}
	
	opcoesMenu.qtdItensMenu++;
	
	$nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "user",
		texto: "Cadastro de Produtores",
		url: $item2
	}
	
	opcoesMenu.qtdItensMenu++;
	
	$nomesItensMenu[opcoesMenu.qtdItensMenu] = {
		icone: "usd",
		texto: "Tabela de Preços",
		url: $item3
	}
	
	menuCadastrosOpcoes($nomesItensMenu, opcoesMenu);
	
	return $nomesItensMenu;
	
}
