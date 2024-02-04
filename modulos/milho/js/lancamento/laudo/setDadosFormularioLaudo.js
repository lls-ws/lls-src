/* =========================================================
 * setDadosFormularioLaudo.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioLaudo(laudo) {
	
	if ( (laudo.id == null) || (laudo.id == 0) ) {
		
		laudo.formulario.find('#laudo' + laudo.nomeTabela).attr('disabled', 'disabled');
		laudo.formulario.find('#botao' + laudo.nomeTabela).hide();
		
	}
	else {
		
		laudo.formulario.find('#idLaudo').val(laudo.id);
		
		laudo.formulario.find("#data" + laudo.nomeTabela)
			.datepicker('setDate', formataData(laudo.data));
	
		if (laudo.nomeTabela == "Saimilho") {
			
			laudo.formulario.find('#laudo' + laudo.nomeTabela).val(0);
			
		}
		else {
		
			laudo.formulario.find('#laudo' + laudo.nomeTabela)
				.val(laudo.laudo)
				.css("font-weight", "Bold")
				.css("font-size", "15px");
				
		}
		
	}
	
}
