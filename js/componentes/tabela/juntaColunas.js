/* =========================================================
 * juntaColunas.js
 * http://lls.net.br/
 * ========================================================= */

function juntaColunas(array, posicaoTexto, corTexto, id) {
	
	var tdColuna = td('alinhamento_vertical_meio').attr('id', id);
	
	jQuery.each( array, function( i, coluna ) {
		
		tdColuna.append(paragrafo(posicaoTexto, corTexto)
			.attr('id', i)
			.append(coluna));
		
	});
	
	return tdColuna;
	
}
