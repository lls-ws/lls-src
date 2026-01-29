/* =========================================================
 * pegaNomeColunasUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasUmidade(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		codigo: "Codigo",
		desconto: "Desconto",
		valor: "Valor"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Umidade";
		
	}
	
	return nomesColunas;
	
}
