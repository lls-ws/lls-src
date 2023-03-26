/* =========================================================
 * eventoAcharCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharCadastro(idCadastro, tipoOperacao, nomeTabela) {
	
	var dados = {	
		"url": "acha" + nomeTabela,
		"nomeTabela": nomeTabela,
		"id": idCadastro,
		"nome": $('#nomeProcura').val()
	}
	
	$.ajax({
		type: "POST",
		url: dados.url,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(dados),
		success: function(resposta) {
			
			if (resposta.status == "200") {
			
				resposta["nomeTabela"] = nomeTabela;
				
				if (tipoOperacao == "0") {
				
					eval('setDadosDialog' + dados.nomeTabela + '(' + JSON.stringify(resposta) + ')');
					
				}
				else {
				
					eval('setDadosFormulario' + dados.nomeTabela + '(' + JSON.stringify(resposta) + ')');
					
				}
				
				
				
			}
			else {
				
				mostraDialog(
					resposta.mensagem,
					'texto_cor_vermelho',
					'table',
					tituloPainelCadastro(2, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
				);
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
						 
		}
		
	})
	
}
