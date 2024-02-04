/* =========================================================
 * eventoAcharLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharLaudo(laudo) {
	
	$.ajax({
		type: "POST",
		url: 'achaLaudo',
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(result) {
			
			laudo.id = result.id;
			laudo.laudo = result.laudo;
			laudo.data = result.data;
			
			if (result.status == '200') {
	
				setDadosFormularioLaudo(laudo);
				
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
