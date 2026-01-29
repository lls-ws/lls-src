/* =========================================================
 * pegaNomeColunasFaturamilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasFaturamilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		faturamilho: "Faturamento de Milho"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Faturamento de Milho";
		
	}
	
	return nomesColunas;
	
}
