/* =========================================================
 * menuRelatorio.js
 * http://lls.net.br/
 * ========================================================= */

function menuRelatorio(posicaoMenu) {
	
	var opcoesMenu = {
		posicaoMenu: posicaoMenu,
		qtdItensMenu: -1
	};
	
	var nomesItensMenu = {};
	
	menuRelatorioOpcoes(nomesItensMenu, opcoesMenu);
	
	return nomesItensMenu;
	
}
