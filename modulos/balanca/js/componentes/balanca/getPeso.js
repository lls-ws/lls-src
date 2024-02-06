/* =========================================================
 * getPeso.js
 * http://lls.net.br/
 * ========================================================= */

async function getPeso(port, textoPeso) {
	
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
			  formataPeso(value, textoPeso);
			}
		  }
		} catch (error) {
			console.log(error);
		} finally {
			reader.releaseLock();
		}
	  }

	  await port.close();
	}

	const closedPromise = readUntilClosed();
	
	document.querySelector('#botaoPararLeitura').addEventListener('click', async () => {
	  
	  console.log(keepReading);
	  
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
	  
	});
	
}
