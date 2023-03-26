/* =========================================================
 * validarFormularioDespejo.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioDespejo(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'Lote');
	
}
