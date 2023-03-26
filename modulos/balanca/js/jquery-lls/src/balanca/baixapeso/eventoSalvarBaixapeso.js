/* =========================================================
 * eventoSalvarBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarBaixapeso(dados) {
	
	var nomeTabela = dados.nomeTabela;
	
	var peso = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados)');
	
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
				
				$("#data" + dados.nomeTabela).val(resposta.data);
				
				peso.cadastro.data = $("#data" + dados.nomeTabela).datepicker("getDate");
				
				dados = menuOpcoesBalanca(dados.posicaoItemMenu, dados.posicaoItem);
				
				dados.id = resposta.id;
				
				dados["indexStatus"] = resposta.indexStatus;
				dados["data"] = peso.cadastro.data;
				
				setDadosFormularioRelatorioCore(dados);
				
				dados.titulo = peso.cadastro.ticket;
				
				imprimirPeso(dados, mensagem);
				
			}
			else {
			
				mostraDialog(
					mensagem,
					cor_texto,
					"table",
					tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
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
