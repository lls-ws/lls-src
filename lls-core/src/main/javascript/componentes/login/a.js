/* =========================================================
 * a.js
 * http://lls.net.br/
 * ========================================================= */

function a(onclick, href, classes, id, data_toggle, role, aria_expanded) {
	
	return $('<a />')
		.attr('id', id)
		.attr('onclick', onclick)
		.attr('href', href)
		.attr('data-toggle', data_toggle)
		.attr('role', role)
		.attr('aria-expanded', aria_expanded)
		.addClass(classes);
	
}
