/* =========================================================
 * menuBalanca.js
 * http://lls.net.br/
 * ========================================================= */

function menuBalanca(menu, posicaoMenu) {
	
	var menuItens = [
		{
			separator: true,
			titulo: "Lançamentos",
			icone: "record",
			texto: "Pesagem da " + menu.titulo
		}
	];
	
	return criarMenu(menu, menuItens, posicaoMenu);
	
}
