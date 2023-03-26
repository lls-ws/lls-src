/* =========================================================
 * eventoSalvarUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarUmidade(tipoOperacao, nomeTabela) {
	
	var umidade = pegaDadosFormularioUmidade(nomeTabela);
	
	$.ajax({
		type: "POST",
		url: 'salvaUmidade',
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify({umidade: umidade}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent(escape(resposta.mensagem));
			
			var $cor_texto = '';
			
			if (resposta.status == "200") {
				
				$cor_texto = 'texto_cor_verde';
				
				limpaDadosFormularioUmidade();
				
				$('#divDialogAlteraUmidade').empty();
				
				$('#divDialogAlteraUmidade').remove();
				
				$('#divDialogAlteraUmidade').dialog( "close" );
				
				umidade["tipoOperacao"] = tipoOperacao;
				
				if (tipoOperacao == 0) {
					
					$('#nomeProcura').val(formataNumero(umidade.codigo, 2, false, true, "", " %"));
					
					eventoListaCadastro(1, nomeTabela);
					
				}
				else {
				
					setDadosTabelaUmidade(umidade);
					
				}
				
			}
			else {
				
				$cor_texto = 'texto_cor_vermelho';
				
			}
			
			mostraDialog(
				$mensagem,
				$cor_texto,
				'table',
				tituloPainelCadastro(0, eval('pegaNomeColunas' + nomeTabela + '(3)'))
			);
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}
