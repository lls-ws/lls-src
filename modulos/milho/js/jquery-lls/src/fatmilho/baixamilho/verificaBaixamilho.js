/* =========================================================
 * verificaBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function verificaBaixamilho(totalValor, totalPago) {
	
	var tipoServico = $("#tipoServicomilho").val();
	
	if (tipoServico == 0 ) {
		
		if (totalValor == 0) {
		
			$('#nomeProcuraServicomilho').find('#spanGroupPrintServicomilhoFazendaProdutor').hide();
		
		}
		else {
		
			$('#nomeProcuraServicomilho').find('#spanGroupPrintServicomilhoFazendaProdutor').show();
		
		}
	}
	
	if (tipoServico == 1 ) {
		
		if (totalPago == 0) {
		
			$('#nomeProcuraServicomilho').find('#spanGroupPrintServicomilhoFazendaProdutor').hide();
		
		}
		else {
		
			$('#nomeProcuraServicomilho').find('#spanGroupPrintServicomilhoFazendaProdutor').show();
		
		}
	}
	
}
