/* =========================================================
 * eventoAcharServicoBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharServicoBaixamilho(servicoBaixamilho) {
	
	$.ajax({
		type: "POST",
		url: "baixaServicomilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({"id": servicoBaixamilho.id}),
		success: function(result) {
			
			if (result.status == "200") {
				
				servicoBaixamilho.baixa = result;
				
				setDadosFormularioServicoBaixamilho(servicoBaixamilho);
								
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
