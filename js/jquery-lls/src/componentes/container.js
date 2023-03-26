/* =========================================================
 * container.js
 * http://lls.net.br/
 * ========================================================= */

function container() {
	
	$('body').find('.container').remove();
	
	var container = $("<div/>").addClass('container');
	
	$('body').append(container);
	
}
