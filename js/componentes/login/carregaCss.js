/* =========================================================
 * carregaCss.js
 * http://lls.net.br/
 * ========================================================= */

function carregaCss(file) {
	
	$('<link/>', {
	   rel: 'stylesheet',
	   type: 'text/css',
	   href: file
	}).appendTo('head');
        
}
