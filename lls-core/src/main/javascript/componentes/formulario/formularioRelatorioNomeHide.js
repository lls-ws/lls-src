/* =========================================================
 * formularioRelatorioNomeHide.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioNomeHide(nomeTabela, nomeTabelaProcura, urlSearch, formulario) {
	
	formulario.find('.limpa').on('change', function() {
		
		var produtor = formulario.find('#idnomeProcura' + nomeTabela + nomeTabelaProcura).val();
		
		var thProdutor = $('#nomeColunastableLista' + nomeTabela).find("#thprodutor");
		var thFazenda = $('#nomeColunastableLista' + nomeTabela).find("#thfazenda");
		
		if (produtor == 0) {
			
			$('#spanIconClear' + nomeTabela + nomeTabelaProcura)
				.removeClass('glyphicon-star-empty')
				.addClass('glyphicon-star');
				
			$('#spanGroupClear' + nomeTabela + nomeTabelaProcura)
				.attr('title', "Todas as Fazendas");
			
			thProdutor.show();
			thFazenda.show();
			
		}
		else {
			
			var display = $('#nome' + nomeTabela + nomeTabelaProcura + 'Mensagem').css("display");
			
			if (display != "none") {
			
				thFazenda.hide();
				
			}
			else {
				
				thFazenda.show();
				
			}
			
			thProdutor.hide();
			
		}
		
		eval(urlSearch);
		
	});
	
}
