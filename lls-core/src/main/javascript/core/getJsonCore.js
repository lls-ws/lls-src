/* =========================================================
 * getJsonCore.js
 * http://lls.net.br/
 * ========================================================= */

function getJsonCore(url, dados) {
	
	var result= "";
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(dados),
		async: false,
		success: function(resposta) {
			
			result = resposta;
			
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
