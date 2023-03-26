/* =========================================================
 * formataData.js
 * http://lls.net.br/
 * ========================================================= */

function formataData(data) {
	
	if (data != null && data != '') {
	
		var parts = data.split("-");
	
		var dataFormatada = parts[2] + "/" + parts[1] + "/" + parts[0];
		
	}
	else {
		
		var dataFormatada = "";
		
	}
	
	return dataFormatada;
	
}
