/* =========================================================
 * eventoRemoverCore.js
 * http://lls.net.br/
 * ========================================================= */

function eventoRemoverCore(dados) {
	
	$.ajax({
		type: "POST",
		url: dados.url,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(dados),
		success: function(resposta) {
			
			var cor_texto = 'texto_cor_vermelho';
			
			if (resposta.status == "200") {
			
				cor_texto = 'texto_cor_verde';
				
				dados["indexStatus"] = resposta.indexStatus;
				
				eval ('removeTotalTabela' + dados.nomeTabela + '(dados)');
				
			}
			
			mostraDialog(
				resposta.mensagem,
				cor_texto,
				'thead',
				tituloPainelCadastro(3, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
						 
		}
		
	})
	
}
