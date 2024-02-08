/* =========================================================
 * eventoSalvarBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarBaixapeso(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var peso = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados)');
	
	$("#divDialogAltera" + dados.nomeTabela).dialog( "close" );
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabelaCadastro,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(peso),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var cor_texto = "texto_cor_vermelho";
			
			if (resposta.status == "200") {
				
				cor_texto = "texto_cor_verde";
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados)');
				
				dados = menuOpcoesBalanca(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados.id = resposta.id;
				
				dados["indexStatus"] = resposta.indexStatus;
				dados["data"] = resposta.data;
				
				setDadosFormularioRelatorioCore(dados);
				
				dados.titulo = peso.cadastro.ticket;
				
				imprimirPeso(dados, mensagem);
				
			}
			else {
			
				animacao("botao" + dados.nomeTabela, "fa-check", false, number);
				
				mostraDialog(
					mensagem,
					cor_texto,
					"table",
					tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
				);
				
			}
					
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
