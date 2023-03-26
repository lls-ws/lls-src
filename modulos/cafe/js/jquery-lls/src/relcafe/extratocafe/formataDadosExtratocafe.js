/* =========================================================
 * formataDadosExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosExtratocafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	dados.data = formataData(dados.data);
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.peneira = decodeURIComponent(dados.peneira);
	dados.sacas = formataNumeroSacasCafe(dados.sacas);
	dados.peso = formataNumero(dados.peso, 2, false, true, "", " kg");
	
}
