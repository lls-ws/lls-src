/* =========================================================
 * pegaDadosSqlProcuraPreco.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosSqlProcuraPreco(resposta) {
	
	return $.map(resposta.cadastros, function(data) {
		
		var $valor = formataNumero(data.valor, 2, false, false, "R$ ", "");
		
		return {
			value: data.nome,
			data: {
				id: data.id,
				valor: $valor
			}
		};
		
	});

}
