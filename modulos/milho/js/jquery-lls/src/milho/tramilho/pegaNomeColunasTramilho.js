/* =========================================================
 * pegaNomeColunasTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasTramilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		tramilho: "Transferência de Milho"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Transferência de Milho";
		
	}
	
	return nomesColunas;
	
}
