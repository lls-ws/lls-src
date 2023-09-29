/* =========================================================
 * juntaTexto.js
 * http://lls.net.br/
 * ========================================================= */

function juntaTexto(textoArray) {
	
	var $texto = '';
	
	jQuery.each( textoArray, function( i, texto ) {
		
		if (texto != '' && texto != null) {
			
			if ($texto != '') {
				
				$texto += ' - ' + texto;
				
			} else {
				
				$texto += texto;
				
			}
			
		}
		
	});
	
	return $texto;
	
}
