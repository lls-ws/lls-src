/* =========================================================
 * menuMilho.js
 * http://lls.net.br/
 * ========================================================= */

function menuMilho(posicaoMenu) {
	
	var $nomesItensMenu = {};
	
	var $item1 = 'novoCadastro("Entmilho", "click", "' + posicaoMenu + '")';
	var $item2 = 'novoCadastro("Saimilho", "click", "' + posicaoMenu + '")';
	var $item3 = 'novoCadastro("Tramilho", "click", "' + posicaoMenu + '")';
	var $item4 = 'novoCadastro("Laudo", "click", "' + posicaoMenu + '")';
	var $item5 = 'novoCadastro("Servicomilho", "click", "' + posicaoMenu + '")';
	var $item6 = 'novoCadastro("Faturamilho", "click", "' + posicaoMenu + '")';
	
	$nomesItensMenu[0] = {
		separator: true,
		titulo: "Lançamentos",
		icone: "import",
		texto: "Entrada de Milho",
		url: $item1
	}
	
	$nomesItensMenu[1] = {
		icone: "export",
		texto: "Saída de Milho",
		url: $item2
	}
	
	$nomesItensMenu[2] = {
		icone: "transfer",
		texto: "Transferência de Milho",
		url: $item3
	}
	
	$nomesItensMenu[3] = {
		icone: "edit",
		texto: "Número do Laudo",
		url: $item4
	}
	
	$nomesItensMenu[4] = {
		separator: true,
		titulo: "Serviço",
		icone: "save",
		texto: "Entrada de Serviço de Milho",
		url: $item5
	}
	
	$nomesItensMenu[5] = {
		separator: true,
		titulo: "Faturamento",
		icone: "usd",
		texto: "Efetuar Faturamento de Milho",
		url: $item6
	}
	
	return $nomesItensMenu;
	
}
