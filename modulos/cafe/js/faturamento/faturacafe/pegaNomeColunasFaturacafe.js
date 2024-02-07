/* =========================================================
 * pegaNomeColunasFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasFaturacafe(tipo) {
	
	var nomesColunas = { 
		produtor: "Produtor",
		fazenda: "Fazenda",
		data: "Data",
		anterior: "Anterior",
		entradas: "Entradas",
		saidas: "Saídas",
		quebras: "Quebras",
		acrescimos: "Acréscimos",
		recebidas: "Recebidas",
		emitidas: "Emitidas",
		saldo: "Saldo",
		armazenagem: "Armazenagem",
		servicos: "Serviços",
		total: "Total"
	};
	
	switch (tipo) {
		case 1: 
			delete nomesColunas["visualizar"];
			break;
		case 3: 
			nomesColunas = "Faturamento de Café";
			break;
	}
	
	return nomesColunas;
	
}
