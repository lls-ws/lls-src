/* =========================================================
 * pegaNomeColunasSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasSaicafe(tipo) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Saída de Café";
			break;
	}
	
	return nomesColunas;
	
}
