/* =========================================================
 * pegaNomeColunasTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasTracafe(tipo) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Transferência de Café";
			break;
	}
	
	return nomesColunas;
	
}
