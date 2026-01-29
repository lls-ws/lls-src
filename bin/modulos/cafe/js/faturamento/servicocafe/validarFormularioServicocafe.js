/* =========================================================
 * validarFormularioServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormularioServicocafe(dados, formulario) {
	
	validarFormularioCore(dados, formulario);
	
	validarIdCore(dados.nomeTabela, 'FazendaProdutor');
	
	validarIdCore(dados.nomeTabela, 'Preco');
	
}
