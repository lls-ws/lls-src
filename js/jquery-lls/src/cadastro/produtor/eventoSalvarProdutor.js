/* =========================================================
 * eventoSalvarProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function eventoSalvarProdutor(tipoOperacao, nomeTabela) {
	
	var produtor = pegaDadosFormularioProdutor(nomeTabela);
	
	var fazendasArray = pegaDadosTabelaCadastro('Fazenda');
	
	var telefonesArray = pegaDadosTabelaCadastro('Telefone');
	
	$.ajax({
		type: "POST",
		url: 'salvaProdutor',
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify({produtor: produtor, telefones: telefonesArray, fazendas: fazendasArray}),
		success: function(resposta) {
			
			var $mensagem = decodeURIComponent( unescape(resposta.mensagem));
			
			var $cor_texto = '';
			
			if (resposta.status == "200") {
				
				$("body").find('#ui-datepicker-div').remove();
				
				$cor_texto = 'texto_cor_verde';
				
				limpaDadosFormularioProdutor();
				
				$('#divDialogAlteraProdutor').empty();
				
				$('#divDialogAlteraProdutor').remove();
				
				$('#divDialogAlteraProdutor').dialog( "close" );
				
				produtor["tipoOperacao"] = tipoOperacao;
				
				if (tipoOperacao == 0) {
					
					$('#nomeProcura').val(decodeURIComponent(produtor.nome));
					
					eventoListaCadastro(1, nomeTabela);
					
				}
				else {
					
					setDadosTabelaProdutor(produtor);
					
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
