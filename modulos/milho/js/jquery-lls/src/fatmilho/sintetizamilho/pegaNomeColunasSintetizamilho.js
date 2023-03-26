/* =========================================================
 * pegaNomeColunasSintetizamilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSintetizamilho(tipo) {
	
	var nomesColunas = { 
		produtor: "Produtor",
		fazenda: "Fazenda",
		armazenagem: "Armazenagem",
		recepcao: "Recepção",
		limpeza: "Limpeza",
		secagem: "Secagem",
		carga: "Carga",
		total: "Total"
	};
	
	if (tipo == 3) {
		
		nomesColunas = "Serviço de Milho";
		
	}
	
	return nomesColunas;
	
}
