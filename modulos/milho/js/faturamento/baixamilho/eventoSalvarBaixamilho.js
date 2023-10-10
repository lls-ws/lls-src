/* =========================================================
 * eventoSalvarBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarBaixamilho(tipoOperacao, nomeTabela) {
	
	var baixamilho = pegaDadosFormularioBaixamilho(nomeTabela);
	
	var servico = {
		id: $("#idServicomilho").val(),
		nome: ""
	}
	
	$.ajax({
		type: "POST",
		url: "salvaBaixamilho",
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify({
			baixamilho: baixamilho,
			servico: servico
		}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = "";
			
			if (resposta.status == "200") {
				
				$cor_texto = "texto_cor_verde";
				
				baixamilho["tipoOperacao"] = tipoOperacao;
				
				baixamilho["nomeTabela"] = "Baixamilho";
				
				setDadosFormularioBaixamilho(baixamilho);
				
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
