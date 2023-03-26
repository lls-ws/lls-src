/* =========================================================
 * eventoSalvarTramilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarTramilho(tipoOperacao, nomeTabela) {
	
	var tramilho = pegaDadosFormularioTramilho(nomeTabela, 2);
	
	$.ajax({
		type: "POST",
		url: "salvaTramilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({tramilho: tramilho}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( resposta.mensagem);
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioTramilho();
				
				tramilho["tipoOperacao"] = tipoOperacao;
				
				tramilho["nomeTabela"] = "Entmilho";
				
				novoFormulario(tramilho.nomeTabela, "Data", pegaPosicaoItemMenu(), "click-off");
				
				setDadosFormularioRelatorio(tramilho);
				
				$('.ui-datepicker-current-day').click();
				
			}
			else {
				
				$cor_texto = "texto_cor_vermelho";
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				"table",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
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
