/* =========================================================
 * pegaListaScripts.js
 * http://lls.net.br/
 * ========================================================= */

function pegaListaScripts() {
	
	var nomes = '';
	
	$('script').filter(function () {
		if ($(this).attr('src') != null) {
			nomes += $(this).attr('src') + '\n';
		}
	});
	
	return nomes;
	
}
