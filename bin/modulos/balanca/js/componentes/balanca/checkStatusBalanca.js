/* =========================================================
 * checkStatusBalanca.js
 * http://lls.net.br/
 * ========================================================= */

async function checkStatusBalanca(textoPeso, nomeTabela) {

	textoPeso.removeClass('texto_cor_verde')
		.removeClass('texto_cor_amarelo')
		.addClass('texto_cor_vermelho');
	
	if ("serial" in navigator) {
	
		try {
		
			const ports = await navigator.serial.getPorts();
			
			const port = ports[0];
			
			if (port == null) {
				
				textoPeso.text("Desconectada!");
				
				$('div#divDialogAltera' + nomeTabela).off('dialogclose');
				
				$('#botaoIniciarLeitura').hide();
				$('#botaoPararLeitura').hide();
				$('#botaoDesconectar').hide();
				
				$('#botaoConectar').show();
				
			}
			else {
				
				textoPeso.text("Conectada!")
					 .removeClass('texto_cor_vermelho')
					 .removeClass('texto_cor_amarelo')
					 .addClass('texto_cor_verde');
				
				$('#botaoPararLeitura').off('click');
				$('div#divDialogAltera' + nomeTabela).off('dialogclose');
				
				readPesoBalanca(port, textoPeso, nomeTabela);
				
				$('#botaoConectar').hide();
				$('#botaoIniciarLeitura').hide();
				$('#botaoDesconectar').show();
				$('#botaoPararLeitura').show();
				
			}
		} catch (error) {}
	}
	else {
		
		textoPeso.text("API Web Serial API não é suportada!");
		
		$('#botaoIniciarLeitura').hide();
		$('#botaoPararLeitura').hide();
		$('#botaoConectar').hide();
		$('#botaoDesconectar').hide();
		
	}
	
}
