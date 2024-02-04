/* =========================================================
 * eventoSalvarSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarSaimilho(tipoOperacao, nomeTabela) {
	
	var number = animacao("botao" + nomeTabela, "fa-check", true);
	
	var saimilho = pegaDadosFormularioSaimilho(nomeTabela);
	
	var fazendaProdutor = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "Milho").val(),
		nome: ""
	}
	
	$.ajax({
		type: "POST",
		url: "salvaSaimilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({
			saimilho: saimilho,
			fazendaProdutor: fazendaProdutor
		}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioSaimilho();
				
				saimilho["tipoOperacao"] = tipoOperacao;
				
				saimilho["nomeTabela"] = nomeTabela;
				
				novoFormulario(saimilho.nomeTabela, "Data", pegaPosicaoItemMenu(), "click-off");
				
				setDadosFormularioRelatorio(saimilho);
				
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
