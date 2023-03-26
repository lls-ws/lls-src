/* =========================================================
 * nomesTipos.js
 * http://lls.net.br/
 * ========================================================= */

function nomesTipos(tipo) {
	
	switch (tipo) {
		
		case 1: 
			
			var nomesTipos = { 
				"0": "Abertos",
				"1": "Pagos",
				"2": "Todos"
			};
			
			break;
		
		case 2:
			
			var nomesTipos = { 
				"0": "Faturados",
				"1": "A Faturar",
				"2": "Todos"
			};
			
			break;
			
		case 3: 
			
			var nomesTipos = { 
				"0": "Abertas",
				"1": "Fechadas",
				"2": "Todas"
			};
			
			break;
		
		case 4: 
			
			var nomesTipos = { 
				"0": "Abertas",
				"1": "Despejadas",
				"2": "Fechadas",
				"3": "Todas"
			};
			
			break;
			
		case 5: 
			
			var nomesTipos = { 
				"0": "Abertos",
				"1": "Fechados",
				"2": "Todos"
			};
			
			break;
			
	}
	
	return nomesTipos;

}
