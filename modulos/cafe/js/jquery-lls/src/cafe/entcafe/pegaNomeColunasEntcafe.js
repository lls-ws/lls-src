/* =========================================================
 * pegaNomeColunasEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasEntcafe(tipo) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Entrada de Café";
			break;
	}
	
	return nomesColunas;
	
}
