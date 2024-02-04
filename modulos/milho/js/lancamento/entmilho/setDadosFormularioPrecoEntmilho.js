/* =========================================================
 * setDadosFormularioPrecoEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioPrecoEntmilho(precoEntmilho) {
	
	precoEntmilho.campoBruto.find('#bruto' + precoEntmilho.nomeTabela).focusout(function() {
		
		verificaBrutoEntmilho(precoEntmilho.campoBruto, precoEntmilho.nomeTabela, precoEntmilho);
		
	});
	
	precoEntmilho.campoBruto.find('#bruto' + precoEntmilho.nomeTabela).on('keyup', function() {
		
		verificaBrutoEntmilho(precoEntmilho.campoBruto, precoEntmilho.nomeTabela, precoEntmilho);
		
	});
		
}
