/* =========================================================
 * pegaNomeColunasTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasTracafe(tipo) {
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Transferência de Café";
			break;
	}
	
	return nomesColunas;
	
}
