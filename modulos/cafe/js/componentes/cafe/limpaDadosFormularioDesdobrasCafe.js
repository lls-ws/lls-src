/* =========================================================
 * limpaDadosFormularioDesdobrasCafe.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioDesdobrasCafe(dados) {
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	var cadastro = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	var campos = cadastro.cadastro;
	
	jQuery.each( campos, function( i, value ) {
		
		formulario.find('#' + i + dados.nomeTabela).val('');
		
	});
	
}
