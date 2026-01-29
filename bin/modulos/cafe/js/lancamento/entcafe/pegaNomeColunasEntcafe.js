/* =========================================================
 * pegaNomeColunasEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasEntcafe(tipo) {
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Entrada de Café";
			break;
	}
	
	return nomesColunas;
	
}
