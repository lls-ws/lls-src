/* =========================================================
 * eventoSalvarFaturamilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarFaturamilho(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "fa-check", true);
	
	var faturamilho = pegaDadosFormularioFaturamilho(nomeTabela, 2);
	
	$.ajax({
		type: "POST",
		url: "executa" + nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(faturamilho),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( resposta.mensagem );
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioFaturamilho();
				
				faturamilho["nomeTabela"] = "Movimentomilho";
				
				novoFormulario(faturamilho.nomeTabela, "Data", pegaPosicaoItemMenu(), "click-off");
				
				setDadosFormularioRelatorio(faturamilho);
				
				$('#dataInicial' + faturamilho.nomeTabela).datepicker( "option", "maxDate", faturamilho.dataFinal );
				$('#dataInicial' + faturamilho.nomeTabela).datepicker("setDate", faturamilho.dataInicial);
				
				$('#dataFinal' + faturamilho.nomeTabela).datepicker( "option", "minDate", faturamilho.dataInicial );
				$('#dataFinal' + faturamilho.nomeTabela).datepicker("setDate", faturamilho.dataFinal);
				
				$('.ui-datepicker-current-day').click();
				
			}
			else {
				
				animacao("botao" + nomeTabela, "fa-check", false, number);
				
				$cor_texto = "texto_cor_vermelho";
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				"form",
				tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			animacao("botao" + nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
				
			);
		
		}
		
	})
	
}
