/* =========================================================
 * pegaDadosSqlProcuraMilho.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosSqlProcuraMilho(resposta) {
	
	return $.map(resposta.cadastros, function(data) {
			
		return {
			value: data[3],
			data: {
				id: data[0],
				fazenda: data[1],
				saldo: data[2],
				id2: data[4]
			}
		};
		
	});

}
