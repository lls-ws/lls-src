/* =========================================================
 * eventoSalvarFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarFaturacafe(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var faturacafe = eval ("pegaDadosFormulario" + dados.nomeTabela + "(dados.nomeTabelaExecuta)");
	
	$.ajax({
		type: "POST",
		url: "executa" + dados.nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(faturacafe),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( resposta.mensagem );
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				eval ("limpaDadosFormulario" + dados.nomeTabela + "()");
				
				dados = menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados["data"] = faturacafe.dataFinal;
				
				setDadosFormularioRelatorioCore(dados);
				
			}
			else {
				
				animacao("botao" + dados.nomeTabela, "fa-check", false, number);
				
				$cor_texto = "texto_cor_vermelho";
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				"form",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			animacao("botao" + dados.nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
				
			);
		
		}
		
	})
	
}
