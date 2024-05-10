/* =========================================================
 * eventoSalvarDesdobrasCafe.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarDesdobrasCafe(dados) {
	
	var number = animacao("botao" + dados.nomeTabela, "fa-check", true);
	
	var cafe = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	$.ajax({
		type: "POST",
		url: 'salva' + dados.nomeTabela,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(cafe),
		success: function(resposta) {
			
			var mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			if (resposta.status == "200") {
				
				$('#divDialogAltera' + dados.nomeTabela).empty();
				$('#divDialogAltera' + dados.nomeTabela).remove();
				$('#divDialogAltera' + dados.nomeTabela).dialog( "close" );
				
				eval ('limpaDadosFormulario' + dados.nomeTabela + '(dados)');
				
				var qtdTipo = $('#tipo' + dados.nomeTabelaCadastro).find("option").length;
				
				dados["indexStatus"] = qtdTipo - 2;
				
				setTipoRelatorioCafe(dados);
				
				dados = menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem);
				
				eventoListaCadastroCore(dados);
				
				dados.id = cafe.cadastro.id;
				
				imprimirGuiaCafe(dados, mensagem);
					
			}
			else {
				
				animacao("botao" + dados.nomeTabela, "fa-check", false, number);
				
				mostraDialog(
					mensagem,
					"texto_cor_vermelho",
					'table',
					tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
				);
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			animacao("botao" + dados.nomeTabela, "fa-check", false, number);
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
