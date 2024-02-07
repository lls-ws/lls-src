/* =========================================================
 * setDadosFormularioGuiaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioGuiaPeso(guiaPeso) {
	
	guiaPeso.formulario.find("#data" + guiaPeso.nomeTabela)
			.datepicker('setDate', formataData(guiaPeso.data));
	
	guiaPeso.formulario.find('#ticket' + guiaPeso.nomeTabela).val(guiaPeso.ticket);
	guiaPeso.formulario.find('#lote' + guiaPeso.nomeTabela).val(guiaPeso.lote);
	
}
