/* =========================================================
 * nomeTabsEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function nomeTabsEntcafe(tipo) {
	
	switch (tipo) {
		case 1: 
			return { 
				tabEntcafe1: "Dados",
				tabEntcafe2: "Observações"
			};
			
			break;
		case 2: 
			return { 
				tabEntcafe1: "Dados",
				tabEntcafe2: "Desdobras",
				tabEntcafe3: "Cobrança"
			};

			break;
	}
	
}
