/* =========================================================
 * pegaDadosSqlProcuraLote.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosSqlProcuraLote(resposta) {
	
	return $.map(resposta.cadastros, function(data) {
		
		return {
			value: data[1],
			data: {
				id: data[0],
				sacas: data[2],
				peso: data[3],
				sacasTotal: data[4],
				pesoTotal: data[5],
				observacao: data[6],
				pilha: data[7],
				peneira: data[8]
			}
		};
		
	});

}
