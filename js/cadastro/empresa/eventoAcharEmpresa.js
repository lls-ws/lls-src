/* =========================================================
 * eventoAcharEmpresa.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharEmpresa(formulario) {
	
	$.ajax({
		type: "POST",
		url: 'achaEmpresa',
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(result) {
			
			if (result.status == '200') {
	
				setDadosFormularioEmpresa(result, formulario);

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
