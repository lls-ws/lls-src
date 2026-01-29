/* =========================================================
 * eventoSalvarCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarCafeFormacao(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var cafe = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados)');
	
	$.ajax({
		type: "POST",
		url: "salva" + dados.nomeTabela + dados.nomeTabelaCadastro,
		dataType: "json",
		contentType: "application/json",
		mimeType: "application/json",
		data: JSON.stringify(cafe),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var cor_texto = "texto_cor_vermelho";
			
			if (resposta.status == "200") {
				
				cor_texto = "texto_cor_verde";
				
				cafe.lote["data"] = cafe.cadastro.data;
				cafe.lote["indexStatus"] = resposta.indexStatus;
				cafe.lote["idCadastro"] = resposta.idCadastro;
				cafe.lote["posicaoItem"] = dados.posicaoItem;
				cafe.lote["posicaoItemMenu"] = dados.posicaoItemMenu;
				cafe.lote["tipoOperacao"] = dados.tipoOperacao;
				cafe.lote["nomeTabela"] = dados.nomeTabela;
				cafe.lote["nomeTabelaCadastro"] =  dados.nomeTabelaCadastro;
				cafe.lote["nomeTabelaLancamento"] =  dados.nomeTabelaLancamento;
				
				if (dados.campoProcura == "Peneira") {
					cafe.lote["peneira"] = $("#nomeProcuraCadastro" + dados.nomeTabela + dados.campoProcura).val();
				}
				else {
					cafe.lote["peneira"] = $('#nome' + dados.nomeTabela + dados.campoProcura + 'Mensagem').text();
					cafe.lote.lote = $("#nomeProcuraCadastro" + dados.nomeTabela + dados.campoProcura).val();
				}
				
				limpaDadosFormularioCafeFormacao(dados);
				
				if($('#tbody' + dados.nomeTabela)
					.find("#" + dados.nomeTabela + 
						  "_" + resposta.id).length > 0) {
					
					dados.tipoOperacao = 1;
					
					if (cafe.lote.id == 0) {
					
						cafe.lote.id = resposta.id;
						
						var valores = pegaValoresTabelaCafeFormacao(cafe.lote);
						
						cafe.lote.sacas = Number(cafe.lote.sacas) + valores.sacas;
						cafe.lote.peso = cafe.lote.peso + valores.peso;
						
					}
					
				}
				
				cafe.lote.id = resposta.id;
				
				if (dados.tipoOperacao == 0) {
					
					setLinhaTabelaCafeFormacao(cafe.lote);
					addTotalTabelaCafeFormacao(cafe.lote);
					
				}
				else {
					
					mudaLinhaTabelaCafeFormacao(cafe.lote);
					alteraTotalTabelaCafeFormacao(cafe.lote);
					
				}
				
				$("#divDialogAltera" + dados.nomeTabela).dialog( "close" );
				
				$('#' + dados.nomeTabelaCadastro.toLowerCase() + 'Form')
					.find("#spanGroupSearch" + dados.nomeTabelaCadastro + "FazendaProdutor")
						.unbind();
				
				eval ("setDadosTabela" + dados.nomeTabelaCadastro + "(cafe.lote)");
				
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
