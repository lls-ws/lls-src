/* =========================================================
 * removeTotalTabelaSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaSaimilho(idLinha) {
	
	idLinha = idLinha.replace('#', '');
	
	var liquido = $('#tbodyListaSaimilho').find('#' + idLinha).find("#tdLiquido").find('p').text();
	
	liquido = formataNumeroSql(liquido);
	
	var totalLiquido = $('#tfoottableListaSaimilho')
		.find('#nomeRodapeSaimilho').find("#totalLiquido").find('p').text();
	
	totalLiquido = formataNumeroSql(totalLiquido);

	totalLiquido = totalLiquido - liquido;
	
	if (totalLiquido > 0) {
		
		var idFazenda = $('#idnomeProcuraSaimilhoFazendaProdutor').val();
		
		if (idFazenda > 0) {
			
			removeTotalTabelaSaldoMilho("Saimilho", 0 ,liquido);
			
		}
		
		totalLiquido = formataNumero(totalLiquido, 2, false, false, "", " kg");
		
		$('#tfoottableListaSaimilho')
			.find('#nomeRodapeSaimilho').find("#totalLiquido").find('p').empty();
	
		$('#tfoottableListaSaimilho')
			.find('#nomeRodapeSaimilho').find("#totalLiquido").find('p').text(totalLiquido);
			
	}
	else {
		
		$('#tfoottableListaSaimilho').empty();
		
		$('#nomeProcuraSaimilho').find('#spanGroupPrintSaimilhoFazendaProdutor').hide();
		
	}
	
}
