/* =========================================================
 * eventoAcharPrecoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharPrecoEntmilho(precoEntmilho) {
	
	$.ajax({
		type: "POST",
		url: "listaPrecoEntmilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(resposta) {
			
			if (resposta.status == "200") {
				
				precoEntmilho.limpeza = resposta.cadastros[0][2];
				precoEntmilho.recepcao = resposta.cadastros[1][2];
				precoEntmilho.carga = resposta.cadastros[2][2];
				
				setDadosFormularioPrecoEntmilho(precoEntmilho);
								
			}
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
