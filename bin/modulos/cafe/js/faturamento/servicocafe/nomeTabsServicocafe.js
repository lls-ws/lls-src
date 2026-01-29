/* =========================================================
 * nomeTabsServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function nomeTabsServicocafe(tipo) {
	
	switch (tipo) {
		case 1: 
			return { 
				tabServicocafe1: "Dados",
				tabServicocafe2: "Observações"
			};
			
			break;
		case 2: 
			
			return { 
				tabServicocafe1: "Dados",
				tabServicocafe2: "Pagamentos"
			};

			break;
	}
	
}
