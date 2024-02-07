/* =========================================================
 * eventoSalvarPeso.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarPeso(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var peso = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela,
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
				
				dados["indexStatus"] = 0;
				dados["data"] = peso.cadastro.data;
				
				setDadosFormularioRelatorioCore(dados);
				
				if (peso.cadastro.tipoProduto == "CAFE" &&
					peso.cadastro.fazendaProdutor_id > 0 &&
					peso.cadastro.tipoPeso == "ENTRADA") {
					
					imprimirGuiaCafe(dados, mensagem, 1);
					
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
