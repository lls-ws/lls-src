/* =========================================================
 * eventoSalvarCadastroTabela.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarCadastroTabela(cadastro, tbody, arrayColunaBotoes) {
	
	var number = animacao("botao" + nomeTabela, "spinner", true);
	
	var $nomeTabelaCadastro = $('#nomeTabela' + cadastro.nomeTabela).val();
	
	var $url = "adiciona" + cadastro.nomeTabela + $nomeTabelaCadastro;
	
	var idCadastro = cadastro.idCadastro;
	
	var nomeTabela = cadastro.nomeTabela;
	
	var tipoOperacao = cadastro.tipoOperacao;
	
	var idCadastro = $('#id' + $nomeTabelaCadastro).val();
	
	cadastro[$nomeTabelaCadastro.toLowerCase()] = null;
	
	delete cadastro["nomeTabela"];
	
	delete cadastro["tipoOperacao"];
	
	delete cadastro["idCadastro"];
	
	$.ajax({
		type: "POST",
		url: $url,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify({cadastro: cadastro, id: {id: idCadastro}}),
		success: function(resposta) {
			
			if (resposta.status == "200") {
				
				cadastro["nomeTabela"] = nomeTabela;
				
				cadastro["id"] = resposta.id;
				
				arrayColunaBotoes = pegaColunaBotoesTabela(cadastro.nomeTabela, cadastro.id);
	
				eval ('setLinhaTabela' + nomeTabela + '(cadastro , tbody, arrayColunaBotoes)');
				
			}
			else {
				
				animacao("botao" + nomeTabela, "check", false, number);
				
				mostraDialog(
					resposta.mensagem,
					'texto_cor_vermelho',
					'table',
					tituloPainelCadastro(tipoOperacao, nomeTabela)
				);
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			animacao("botao" + nomeTabela, "check", false, number);
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
						 
		}
		
	})
	
}
