/* =========================================================
 * readPesoBalanca.js
 * http://lls.net.br/
 * ========================================================= */

async function readPesoBalanca(port, textoPeso, nomeTabela) {
	
	try {
			
		await port.open({
			baudRate: 9600,
			stopBits: 1,
			dataBits: 8,
			parity: "none",
			flowControl: "none"
		});
	
	} catch (error) {}
	
	let keepReading = true;
	let reader;

	async function readUntilClosed() {
	  while (port.readable && keepReading) {
		reader = port.readable.getReader();
		try {
		  while (true) {
			const { value, done } = await reader.read();
			if (done) {
			  break;
			}
			if (value) {
			  formataPesoBalanca(value, textoPeso);
			}
		  }
		} catch (error) {}
		  finally {
			reader.releaseLock();
		}
	  }

	  try {
		await port.close();
	  } catch (error) {}
	}

	const closedPromise = readUntilClosed();
	
	$('#botaoPararLeitura').click(async function() {
			
		keepReading = false;

		reader.cancel();
		await closedPromise;

		$('#botaoPararLeitura').hide();
		$('#botaoIniciarLeitura').show();

		textoPeso.text('.')
			.removeClass('texto_cor_verde')
			.removeClass('texto_cor_vermelho')
			.removeClass('texto_cor_amarelo')
			.addClass('texto_cor_branco');
			   
		$('div#divDialogAltera' + nomeTabela).off('dialogclose');
			   
	});
	
	$('div#divDialogAltera' + nomeTabela).on('dialogclose', async function(event) {
		
		keepReading = false;

		reader.cancel();

		await closedPromise;
				
	});
	
}
