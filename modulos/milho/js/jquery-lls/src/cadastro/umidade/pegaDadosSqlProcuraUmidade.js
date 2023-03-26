/* =========================================================
 * pegaDadosSqlProcuraUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosSqlProcuraUmidade(resposta) {
	
	return $.map(resposta.cadastros, function(data) {
		
		var $codigo = formataNumero(data[1], 2, false, false, "", " %");
		
		var $desconto = formataNumero(data[2], 2, false, true, "", " %");
		
		var $valor = formataNumero(data[3], 2, false, true, "R$ ", "");
		
		return {
			value: '"' + $codigo + '"',
			data: {
				id: data[0],
				desconto: '"' + $desconto + '"',
				valor: '"' + $valor + '"'
			}
		};
		
	});

}
