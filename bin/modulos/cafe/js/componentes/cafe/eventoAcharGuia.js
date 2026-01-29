/* =========================================================
 * eventoAcharGuia.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharGuia(dados, formulario) {
	
	$.ajax({
		type: "POST",
		url: 'getGuia' + dados.nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		success: function(result) {
			
			dados.lote = result.lote;
			
			if (result.status == '200') {
	
				setFormularioCafe(dados, formulario);
				
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
