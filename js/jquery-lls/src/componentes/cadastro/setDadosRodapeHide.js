/* =========================================================
 * setDadosRodapeHide.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeHide(nomeTabela, colspan, th1) {
	
	var idFazenda = $('#idnomeProcura' + nomeTabela + 'FazendaProdutor').val();
	
	var colunas = colspan.inicio;
	
	if (idFazenda > 0) {
		
		if ($('#spanIconClear' + nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
			
			colunas = colunas - 1;
			
		}
		else {
			
			colunas = colunas - 2;
			
		}
		
	}
	
	th1.attr('colspan', colunas);
	
}
