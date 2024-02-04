/* =========================================================
 * eventoSalvarEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarEntmilho(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "fa-check", true);
	
	var entmilho = pegaDadosFormularioEntmilho(nomeTabela);
	
	var fazendaProdutor = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val(),
		nome: ""
	}
	
	var umidade = {
		id: $("#idnumeroProcuraCadastro" + nomeTabela + "Umidade").val(),
		nome: ""
	}
	
	$.ajax({
		type: "POST",
		url: "salvaEntmilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({
			entmilho: entmilho,
			fazendaProdutor: fazendaProdutor,
			umidade: umidade
		}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioEntmilho();
				
				entmilho["tipoOperacao"] = tipoOperacao;
				
				entmilho["nomeTabela"] = nomeTabela;
				
				novoFormulario(entmilho.nomeTabela, "Data", pegaPosicaoItemMenu(), "click-off");
				
				setDadosFormularioRelatorio(entmilho);
				
				$('.ui-datepicker-current-day').click();
				
			}
			else {
				
				animacao("botao" + nomeTabela, "fa-check", false, number);
				
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
			
			animacao("botao" + nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
