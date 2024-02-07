/* =========================================================
 * eventoSalvarCafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarCafe(dados) {
	
	var cafe = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(cafe),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			if (resposta.status == "200") {
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
				
				dados = menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados.id = resposta.id;
				
				dados["indexStatus"] = resposta.indexStatus;
				dados["data"] = cafe.cadastro.data;
				
				setDadosFormularioRelatorioCore(dados);
				
				if (dados.tipo == "GR") imprimirGuiaCafe(dados, mensagem, 1);
				else {
					
					mostraDialog(
						mensagem,
						"texto_cor_verde",
						"table",
						tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
					);
					
				}
				
			}
			else {
				
				mostraDialog(
					mensagem,
					"texto_cor_vermelho",
					"table",
					tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
				);
				
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
