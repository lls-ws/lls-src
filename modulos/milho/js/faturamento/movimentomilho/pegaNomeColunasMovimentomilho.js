/* =========================================================
 * pegaNomeColunasMovimentomilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasMovimentomilho(tipo) {
	
	var nomesColunas = { 
		produtor: "Produtor",
		fazenda: "Fazenda",
		data: "Data",
		anterior: "Saldo Anterior",
		entradas: "Peso Entradas",
		saidas: "Peso Saídas",
		saldo: "Saldo Atual",
		armazenagem: "Armazenagem",
		limpeza: "Limpeza",
		secagem: "Secagem",
		carga: "Carga",
		recepcao: "Recepção",
		total: "Total"
	};
	
	if (tipo == 3) {
		
		nomesColunas = "Faturamento de Milho";
		
	}
	
	return nomesColunas;
	
}
