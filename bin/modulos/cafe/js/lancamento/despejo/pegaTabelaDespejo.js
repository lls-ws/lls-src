/* =========================================================
 * pegaTabelaDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaDespejo(dados, formulario, tipo) {

	var ids = {
		idLote : {id: dados.id},
		idCadastro: {id: dados.idCadastro}
	}
	
	$.ajax({
		type: "POST",
		url: 'acha' + dados.nomeTabela + dados.nomeTabelaCadastro,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(ids),
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
