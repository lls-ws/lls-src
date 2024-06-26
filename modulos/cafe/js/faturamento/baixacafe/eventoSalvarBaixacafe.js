/* =========================================================
 * eventoSalvarBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarBaixacafe(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var baixa = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(baixa),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var cor_texto = "texto_cor_vermelho";
			
			if (resposta.status == "200") {
				
				cor_texto = "texto_cor_verde";
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
				
				$("#data" + dados.nomeTabela).val(resposta.data);
				
				baixa.cadastro.data = $("#data" + dados.nomeTabela).datepicker("getDate");
				
				dados = menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados.id = resposta.id;
				
				dados["indexStatus"] = resposta.indexStatus;
				dados["data"] = baixa.cadastro.data;
				
				setDadosFormularioRelatorioCore(dados);
				
			}
			
			animacao("botao" + dados.nomeTabela, "fa-check", false, number);
			
			mostraDialog(
				mensagem,
				cor_texto,
				"table",
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
