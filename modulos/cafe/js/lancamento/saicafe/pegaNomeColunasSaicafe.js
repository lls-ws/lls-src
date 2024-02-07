/* =========================================================
 * pegaNomeColunasSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSaicafe(tipo) {
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Saída de Café";
			break;
	}
	
	return nomesColunas;
	
}
