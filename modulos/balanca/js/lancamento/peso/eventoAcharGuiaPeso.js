/* =========================================================
 * eventoAcharGuiaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharGuiaPeso(guiaPeso) {
	
	$.ajax({
		type: "POST",
		url: 'getGuiaPeso',
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(result) {
			
			if (result.status == '200') {
				
				guiaPeso.lote = result.lote;
				guiaPeso.ticket = result.ticket;
				guiaPeso.data = result.data;
	
				setDadosFormularioGuiaPeso(guiaPeso);
				
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
