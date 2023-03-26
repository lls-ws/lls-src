/* =========================================================
 * validarFormularioEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioEntcafe(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'FazendaProdutor');
	
}
