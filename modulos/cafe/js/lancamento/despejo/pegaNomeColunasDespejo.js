/* =========================================================
 * pegaNomeColunasDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasDespejo(tipo) {
	
	var nomesColunas = pegaNomeColunasCafeFormacao(tipo);
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Despejo de Lotes";
			break;
		case 4: 
			nomesColunas = "Despejos de Lotes de Café";
			break;
		case 5: 
			nomesColunas["sacasSaldo"] = "";
			nomesColunas["pesoSaldo"] = "";
			break;
	}
	
	return nomesColunas;
	
}
