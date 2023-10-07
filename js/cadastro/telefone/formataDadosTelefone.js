/* =========================================================
 * formataDadosProdutor.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosTelefone(telefone) {
	
	telefone.responsavel = decodeURIComponent(telefone.responsavel);
	
	telefone.numero = pegaTelefoneMascara(telefone.numero);
	
}
