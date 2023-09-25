/* =========================================================
 * head.js
 * http://lls.net.br/
 * ========================================================= */

function head() {
	
	$('meta[name=description]')
		.attr('content', nomeProjeto())
		.after(title());
	
}
