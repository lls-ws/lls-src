/* =========================================================
 * pegaTabelaLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaLote(dados, formulario, tipo) {

	var id = {"id": dados.id}
	
	$.ajax({
		type: "POST",
		url: 'acha' + dados.nomeTabela + dados.nomeTabelaCadastro,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(id),
		success: function(result) {
			
			if (result.status == '200') {
	
				dados["lotes"] = result;
				
				setDadosFormularioCafeFormacao(dados, formulario, tipo);
	
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
