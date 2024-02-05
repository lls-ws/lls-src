/* =========================================================
 * getPeso.js
 * http://lls.net.br/
 * ========================================================= */

async function getPeso() {
    
	const port = await navigator.serial.requestPort();
	
	await port.open({
		baudRate: 9600,
		stopBits: 1,
		dataBits: 8,
		parity: "none",
		flowControl: "none"
	});
	
	while (port.readable) {
	  const textDecoder = new TextDecoderStream();
	  const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
	  const reader = textDecoder.readable.getReader();
	
	  try {
		while (true) {
		  const { value, done } = await reader.read();
		  if (done) {
			// Allow the serial port to be closed later.
			reader.releaseLock();
			break;
		  }
		  if (value) {
			//peso = value
			console.log(value);
		  }
		}
	  } catch (error) {
		// TODO: Handle non-fatal read error.
	  }
	}
	
	return port;
	
}

async function closePeso() {

	const port = await navigator.serial.requestPort();

	await port.close();

}
