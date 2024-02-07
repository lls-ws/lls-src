/* =========================================================
 * nomeTabsOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function nomeTabsOscafe(tipo) {
	
	switch (tipo) {
		case 1: 
			return { 
				tabOscafe1: "Dados",
				tabOscafe2: "Despejo",
				tabOscafe3: "Instruções",
				tabOscafe4: "Observações"
			};
			
			break;
		case 2: 
			return { 
				tabOscafe1: "Dados",
				tabOscafe2: "Despejo",
				tabOscafe3: "Lotes",
				tabOscafe4: "Cobrança"
			};

			break;
	}
	
}
