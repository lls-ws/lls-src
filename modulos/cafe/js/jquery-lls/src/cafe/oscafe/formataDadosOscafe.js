/* =========================================================
 * formataDadosOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosOscafe(oscafe) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	oscafe.data = formataData(oscafe.data);
	oscafe.peso = formataNumero(oscafe.peso, 2, false, true, "", " kg");
	oscafe.pesoQuebra = formataNumero(oscafe.pesoQuebra, 2, false, true, "", " kg");
	oscafe.pesoAcrescimo = formataNumero(oscafe.pesoAcrescimo, 2, false, true, "", " kg");
	oscafe.pesoResultado = formataNumero(oscafe.pesoResultado, 2, false, true, "", " kg");
	oscafe.produtor = decodeURIComponent(oscafe.produtor);
	oscafe.fazenda = decodeURIComponent(oscafe.fazenda);
	oscafe.instrucoes = decodeURIComponent(oscafe.instrucoes);
	oscafe.observacao = decodeURIComponent(oscafe.observacao);
	oscafe.usuario = decodeURIComponent(oscafe.usuario);
	
	oscafe["titulo"] = oscafe.lote;
	
	oscafe["alterar"] = 0;
	oscafe["lancamento"] = 0;
	oscafe["imprimir"] = 0;
	oscafe["remover"] = 0;
	
}
