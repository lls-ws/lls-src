/* =========================================================
 * pegaDadosSqlProcuraPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosSqlProcuraPeneira(resposta) {
	
	return $.map(resposta.cadastros, function(data) {
		
		return {
			value: data.nome,
			data: {
				id: data.id
			}
		};
		
	});

}
