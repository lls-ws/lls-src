/* =========================================================
 * checkStatusBalanca.js
 * http://lls.net.br/
 * ========================================================= */

async function checkStatusBalanca(textoPeso) {

	textoPeso.removeClass('texto_cor_verde')
		.removeClass('texto_cor_amarelo')
		.addClass('texto_cor_vermelho');
	
	if ("serial" in navigator) {
	
		const ports = await navigator.serial.getPorts();
		
		const port = ports[0];
		
		if (port == null) {
			
			textoPeso.text("Desconectada!");
			
			$('#botaoIniciarLeitura').hide();
			$('#botaoPararLeitura').hide();
			
		}
		else {
			
			textoPeso.text("Conectada!")
				 .removeClass('texto_cor_vermelho')
				 .removeClass('texto_cor_amarelo')
				 .addClass('texto_cor_verde');
			
			getPeso(port, textoPeso);
			
			$('#botaoIniciarLeitura').hide();
			$('#botaoPararLeitura').show();
			
		}
	}
	else {
		
		textoPeso.text("API Web Serial API não é suportada!");
		
	}
	
}
