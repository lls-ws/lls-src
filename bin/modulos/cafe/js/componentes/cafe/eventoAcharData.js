/* =========================================================
 * eventoAcharData.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharData(dados, formulario) {
	
	$.ajax({
		type: "POST",
		url: 'getData',
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(result) {
			
			if (result.status == '200') {
	
				formulario.find("#data" + dados.nomeTabela)
					.datepicker('setDate', formataData(result.data));
				
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
