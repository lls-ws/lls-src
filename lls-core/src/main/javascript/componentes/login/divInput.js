/* =========================================================
 * divInput.js
 * http://lls.net.br/
 * ========================================================= */

function divInput(id, colClass) {
	
	var $idDivInput = id + 'DivInput';
	
	var $divInput = $("<div/>").attr({id: $idDivInput});
	
	if (colClass == "5" || colClass == "9") {
		
		colClass = 'col-xs-9 col-md-7';
		
	}
	
	$divInput.addClass(colClass);
	
	return $divInput;
}
