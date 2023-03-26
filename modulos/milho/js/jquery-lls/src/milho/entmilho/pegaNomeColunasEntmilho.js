/* =========================================================
 * pegaNomeColunasEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasEntmilho(tipo) {
	
	var nomesColunas = { 
		visualizar: "Ver",
		data: "Data",
		laudo: "Laudo",
		produtor: "Produtor",
		fazenda: "Fazenda",
		bruto: "Peso Bruto",
		impureza: "Impureza",
		valorImpureza: "Impureza Descontada",
		umidade: "Indice Umidade",
		descontoUmidade: "Umidade",
		valorUmidade: "Umidade Descontada",
		quirela: "Quirela",
		valorQuirela: "Quirela Descontada",
		chocho: "Ardido",
		valorChocho: "Ardido Descontado",
		liquido: "Peso Líquido",
		recepcao: "Recepcao",
		limpeza: "Limpeza",
		secagem: "Secagem",
		carga: "Carga",
		total: "Valor Total"
	};
	
	if (tipo == 1) {
		
		delete nomesColunas["visualizar"];
		
	}
	
	if (tipo == 3) {
		
		nomesColunas = "Entrada de Milho";
		
	}
	
	return nomesColunas;
	
}
