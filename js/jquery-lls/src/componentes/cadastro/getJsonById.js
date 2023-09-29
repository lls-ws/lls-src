/* =========================================================
 * getJsonById.js
 * http://lls.net.br/
 * ========================================================= */

function getJsonById(url, id) {
	
	var result= "";
	
	var dados = {
		"id": id
	}
	
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
