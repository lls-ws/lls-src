/* =========================================================
 * pegaNomeColunasOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasOscafe(tipo) {
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Serviço de Café";
			break;
	}
	
	return nomesColunas;
	
}
