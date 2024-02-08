/* =========================================================
 * formataPesoBalanca.js
 * http://lls.net.br/
 * ========================================================= */

function formataPesoBalanca(value, textoPeso) {
    
	var string = new TextDecoder().decode(value);
			
	let status = string.charAt(0);
	let weight = string.substring(1);
	
	if (status == "D" || status == "E" || status == "F" || status == "0") {
		
		textoPeso.removeClass('texto_cor_vermelho')
			.removeClass('texto_cor_amarelo')
			.addClass('texto_cor_verde');
			
	}
	else if (status == "H" || status == "I" || status == "L" ||
			 status == "M" || status == "O" || status == "T") {
		
		textoPeso.removeClass('texto_cor_verde')
			.removeClass('texto_cor_amarelo')
			.addClass('texto_cor_vermelho');
	
	}
	else {
		
		textoPeso.removeClass('texto_cor_verde')
			.removeClass('texto_cor_vermelho')
			.addClass('texto_cor_amarelo');
		
	}
	
	weight = parseInt(weight) || 0;
	
	textoPeso.text(weight).change();
	
}
