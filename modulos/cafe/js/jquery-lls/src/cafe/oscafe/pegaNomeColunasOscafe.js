/* =========================================================
 * pegaNomeColunasOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasOscafe(tipo) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	var nomesColunas = pegaNomeColunasCafe();
	
	switch (tipo) {
		case 3: 
			nomesColunas = "Serviço de Café";
			break;
	}
	
	return nomesColunas;
	
}
