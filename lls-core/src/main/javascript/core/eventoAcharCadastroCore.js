/* =========================================================
 * eventoAcharCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function eventoAcharCadastroCore(dados) {
	
	$.ajax({
		type: "POST",
		url: "acha" + dados.nomeTabela,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify({id: dados.id}),
		success: function(resposta) {
			
			if (resposta.status == "200") {
			
				dados.array = resposta;
				
				if (dados.tipoOperacao == "0") eval('setDadosDialog' + dados.nomeTabela + '(dados)');
				else eval('setDadosFormulario' + dados.nomeTabela + '(dados)');
				
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
