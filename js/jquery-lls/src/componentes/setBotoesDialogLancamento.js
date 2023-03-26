/* =========================================================
 * setBotoesDialogLancamento.js
 * http://lls.net.br/
 * ========================================================= */

function setBotoesDialogLancamento(lancamento) {
	
	if (lancamento.valorPago == 0) {
		
		if (lancamento.remover == 0) {
		
			$("#botaoRemover" + lancamento.nomeTabela).show();
		
		}
		else {
		
			$("#botaoRemover" + lancamento.nomeTabela).hide();
			
		}
		
		if (lancamento.baixar == 0) {
		
			$("#botaoBaixar" + lancamento.nomeTabela).show();
		}
		else {
			
			$("#botaoBaixar" + lancamento.nomeTabela).hide();
			
		}
		
		if (lancamento.alterar == 0) {
			
			$("#botaoAlterar" + lancamento.nomeTabela).show();
		}
		else {
			
			$("#botaoAlterar" + lancamento.nomeTabela).hide();
			
		}
		
	}
	else {
		
		$("#botaoRemover" + lancamento.nomeTabela).hide();
		$("#botaoAlterar" + lancamento.nomeTabela).hide();
		
		if (lancamento.valorRestante > 0) {
			
			if (lancamento.baixar == 0) {
			
				$("#botaoBaixar" + lancamento.nomeTabela).show();
			
			}
			else {
				
				$("#botaoBaixar" + lancamento.nomeTabela).hide();
				
			}
			
		}
		else {
			
			$("#botaoBaixar" + lancamento.nomeTabela).hide();
			
		}
		
	}
		
}
