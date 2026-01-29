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
