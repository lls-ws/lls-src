/* =========================================================
 * getJson.js
 * http://lls.net.br/
 * ========================================================= */

function getJson(url) {
	
	var result= "";
	
	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
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
