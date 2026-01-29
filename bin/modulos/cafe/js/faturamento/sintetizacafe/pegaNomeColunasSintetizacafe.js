/* =========================================================
 * pegaNomeColunasSintetizacafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSintetizacafe(tipo) {
	
	var nomesColunas = { 
		produtor: "Produtor",
		fazenda: "Fazenda",
		data: "Faturamento",
		armazenagem: "Armazenagem",
		recepcao: "Serviços",
		total: "Total"
	};
	
	if (tipo == 3) {
		
		nomesColunas = "Cobrança de Café";
		
	}
	
	return nomesColunas;
	
}
