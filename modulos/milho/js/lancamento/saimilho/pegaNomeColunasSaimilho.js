/* =========================================================
 * pegaNomeColunasSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSaimilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		data: "Data",
		laudo: "Nota N.E",
		produtor: "Produtor",
		fazenda: "Fazenda",
		placa: "Placa",
		destino: "Destino",
		liquido: "Liquido"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Saída de Milho";
		
	}
	
	return nomesColunas;
	
}
