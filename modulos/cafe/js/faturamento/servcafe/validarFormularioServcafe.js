/* =========================================================
 * validarFormularioServcafe.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioServcafe(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'Preco');
	
}
