/* =========================================================
 * eventoSalvarServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarServicomilho(tipoOperacao, nomeTabela) {
	
	var servicomilho = pegaDadosFormularioServicomilho(nomeTabela);
	
	var fazendaProdutor = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val(),
		nome: ""
	}
	
	var preco = {
		id: $("#idnomeProcuraCadastro" + nomeTabela + "Preco").val(),
		nome: ""
	}
	
	$.ajax({
		type: "POST",
		url: "salvaServicomilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({
			servicomilho: servicomilho,
			fazendaProdutor: fazendaProdutor,
			preco: preco
		}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				limpaDadosFormularioServicomilho();
								
				servicomilho["tipoOperacao"] = tipoOperacao;
				
				servicomilho["nomeTabela"] = nomeTabela;
				
				novoFormulario(servicomilho.nomeTabela, "Data", pegaPosicaoItemMenu(), "click-off");
				
				setDadosFormularioRelatorio(servicomilho);
				
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
