/* =========================================================
 * pegaNomeColunasLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasLote(tipo) {
	
	var nomesColunas = pegaNomeColunasCafeFormacao(tipo);
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Lote de Café";
			break;
		case 4: 
			nomesColunas = "Desdobras de Lotes de Café";
			break;
	}
	
	return nomesColunas;
	
}
