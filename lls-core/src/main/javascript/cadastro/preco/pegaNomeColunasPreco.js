/* =========================================================
 * pegaNomeColunasPreco.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasPreco(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		nome: "Nome",
		valor: "Valor"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Preço";
		
	}
	
	return nomesColunas;
	
}
