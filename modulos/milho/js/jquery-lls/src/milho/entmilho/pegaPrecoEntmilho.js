/* =========================================================
 * pegaPrecoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaPrecoEntmilho() {
	
	var result= "";
	
	$.ajax({
		type: "POST",
		url: "listaPrecoEntmilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		async: false,
		success: function(resposta) {
			
			if (resposta.status == "200") {
				
				var valorLimpeza = resposta.cadastros[0][2];
				var valorRecepcao = resposta.cadastros[1][2];
				var valorCarga = resposta.cadastros[2][2];
				
				result = {
					limpeza: valorLimpeza,
					recepcao: valorRecepcao,
					carga: valorCarga
				}
								
			}
			else {
				
				result = {
					limpeza: 0,
					recepcao: 0,
					carga: 0
				}
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
	return result;
	
}
