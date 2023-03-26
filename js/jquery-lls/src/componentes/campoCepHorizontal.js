/* =========================================================
 * campoCepHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function campoCepHorizontal(id, textoLabel, tamanhoCampo, tamanhoLabel, required) {
						      
	var $campoCepHorizontal = campoHorizontal(id, textoLabel, tamanhoLabel);
	
	var $campoCep = campoCep(id, required);
	
	var $divInput = divInput(id, tamanhoCampo);
	
	$divInput.append($campoCep);
	
	$campoCepHorizontal.append($divInput);
	
	return $campoCepHorizontal;
	
}
