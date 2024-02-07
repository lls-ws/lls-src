/* =========================================================
 * eventoSalvarServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarServicocafe(dados) {
	
	var servico = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(servico),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var cor_texto = "texto_cor_vermelho";
			
			if (resposta.status == "200") {
				
				cor_texto = "texto_cor_verde";
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
								
				dados = menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados.id = resposta.id;
				
				dados["indexStatus"] = 0;
				dados["data"] = servico.cadastro.data;
				
				setDadosFormularioRelatorioCore(dados);
				
			}
			
			mostraDialog(
				mensagem,
				cor_texto,
				"table",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
