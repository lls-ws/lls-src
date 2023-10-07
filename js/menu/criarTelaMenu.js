/* =========================================================
 * criarTelaMenu.js
 * http://lls.net.br/
 * ========================================================= */

function criarTelaMenu(nomesItensMenu, opcoesMenu, menu) {
	
	opcoesMenu.posicaoMenu++;
	
	var opcaoMenuItens = opcaoMenu(
		menu.titulo, menu.icone, menu.posicao,
		opcoesMenu.posicaoMenu,
		eval ('menu' + menu.projeto + '(menu, opcoesMenu.posicaoMenu)')
	);
	
	nomesItensMenu.append(opcaoMenuItens);
	
	return opcoesMenu;
	
}
