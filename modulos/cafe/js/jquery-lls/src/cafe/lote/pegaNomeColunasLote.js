/* =========================================================
 * pegaNomeColunasLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaNomeColunasLote(tipo) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe-formacao.js", "js");
	
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
