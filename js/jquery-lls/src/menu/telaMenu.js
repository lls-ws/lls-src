/* =========================================================
 * telaMenu.js
 * http://lls.net.br/
 * ========================================================= */

function telaMenu() {
	
	var opcoesMenu = {
		posicaoMenu: 1,
		qtdItensMenu: 0
	};
	
	var $menu = $("<div/>").attr({id: "menu", role: 'navigation'});
	
	$menu.addClass('navbar navbar-inverse');
	
	var $menuContainer = $("<div/>").addClass('container-fluid');
	
	var $menuHeader = $("<div/>").addClass('navbar-header');
	
	var $imagemMenu = imagemMenu('imagem-menu');
	
	var $botaoMenu = botaoMenu();
	
	var $menuCollapse = $("<div/>").addClass('navbar-collapse collapse');
	
	var $menuCadastros = opcaoMenu('Cadastros ', 'folder-open', 'left', opcoesMenu.posicaoMenu, menuCadastros(opcoesMenu.posicaoMenu));
	
	$menuCollapse.append($menuCadastros);
	
	opcoesMenu = telaMenuOpcoes($menuCollapse, opcoesMenu);
	
	opcoesMenu.posicaoMenu++;
	
	var $menuRelatorio = opcaoMenu('Relatórios ', 'blackboard', 'left', opcoesMenu.posicaoMenu, menuRelatorio(opcoesMenu.posicaoMenu));
	
	opcoesMenu.posicaoMenu++;
	
	var $menuUsuario = opcaoMenu('', 'user', 'right', opcoesMenu.posicaoMenu, menuUsuario(opcoesMenu.posicaoMenu));
	
	$menuCollapse.append($menuRelatorio);
	$menuCollapse.append($menuUsuario);
	
	$menuHeader.append($botaoMenu);
	$menuHeader.append($imagemMenu);
	$menuContainer.append($menuHeader);
	$menuContainer.append($menuCollapse);
	$menu.append($menuContainer);
	
	eventoMenuUsuario(opcoesMenu.posicaoMenu);
	
	return $menu;
	
}
