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
