/* =========================================================
 * validarFormularioDespejoCafe.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioDespejoCafe(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'FazendaProdutor');
	
	checkLotesTabelaCafeFormacao(dados, formulario);
	
}
