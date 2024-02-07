/* =========================================================
 * menuCafe.js
 * http://lls.net.br/
 * ========================================================= */

function menuCafe(menu, posicaoMenu) {
	
	var menuItens = [
		{
			separator: true,
			titulo: "Lançamentos",
			icone: "import",
			texto: "Entrada de " + menu.titulo
		},
		{
			icone: "open",
			texto: "Serviço de " + menu.titulo
		},
		{
			icone: "export",
			texto: "Saída de " + menu.titulo
		},
		{
			icone: "transfer",
			texto: "Transferência de " + menu.titulo
		},
		{
			separator: true,
			titulo: "Cobrança",
			icone: "save",
			texto: "Entrada de Cobrança de " + menu.titulo
		},
		{
			separator: true,
			titulo: "Faturamento",
			icone: "usd",
			texto: "Efetuar Faturamento de " + menu.titulo
		}
	];
	
	return criarMenu(menu, menuItens, posicaoMenu);
	
}
