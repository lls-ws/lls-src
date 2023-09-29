/* =========================================================
 * eventoRemover.js
 * http://lls.net.br/
 * ========================================================= */

function eventoRemover(titulo, id, nomeTabela, url) {
	
	if (url == null) url = 'remove' + nomeTabela;
	
	var $idLinhaRemover = '#div' + nomeTabela + ' #table' + nomeTabela + ' #tbody' + nomeTabela;
	
	var idLinhaTabela = '#' + nomeTabela.toLowerCase() + '_' + id;

	var dados = {
		id: id,
		nome: ''
	}

	$.ajax({
		type: "POST",
		url: url,
		dataType: "json",
		contentType: 'application/json',
		mimeType: 'application/json',
		data: JSON.stringify(dados),
		success: function(resposta) {
			
			var $cor_texto = 'texto_cor_vermelho';
			
			if (resposta.status == "200") {
			
				$cor_texto = 'texto_cor_verde';
				
				$('#divDialogVisualiza' + nomeTabela).empty();
				$('#divDialogVisualiza' + nomeTabela).remove();
				$('#divDialogVisualiza' + nomeTabela).dialog( "close" );
				
				eval ('removeTotalTabela' + nomeTabela + '("' + idLinhaTabela +
					'", "' + nomeTabela + '")');
				
				$(idLinhaTabela).remove();
				
				if ($idLinhaRemover != '' || $idLinhaRemover != null) {
					
					$($idLinhaRemover + ' ' + idLinhaTabela).remove();
					
				}
				
			}
			
			mostraDialog(
				resposta.mensagem,
				$cor_texto,
				'thead',
				tituloPainelCadastro(3, eval('pegaNomeColunas' + nomeTabela + '(3)'))
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
