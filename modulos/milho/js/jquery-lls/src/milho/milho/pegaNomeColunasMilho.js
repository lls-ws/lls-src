/* =========================================================
 * pegaNomeColunasMilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasMilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		produtor: "Produtor",
		fazenda: "Fazenda",
		entrada: "Entradas",
		saida: "Saídas",
		saldo: "Saldo Atual"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Saldo";
		
	}
	
	return nomesColunas;
	
}
