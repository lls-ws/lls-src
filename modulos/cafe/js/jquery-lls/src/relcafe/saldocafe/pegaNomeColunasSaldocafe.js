/* =========================================================
 * pegaNomeColunasSaldocafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSaldocafe(tipo) {
	
	var nomesColunas = { 
		produtor: "Produtor",
		fazenda: "Fazenda",
		sacas: "Sacas",
		peso: "Peso",
		media: "Média",
		servico: "Em Serviço",
		saida: "A Sair",
		transferida: "A Transferir",
		total: "Total"
	};
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Saldo de Café";
			break;
	}
	
	return nomesColunas;
	
}
