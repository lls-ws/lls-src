/* =========================================================
 * tabelaCelula.js
 * http://lls.net.br/
 * ========================================================= */

function tabelaCelula(texto, posicaoTexto, corTexto, id) {
	
	if (texto != null) {
	
		if (texto.constructor === String) {
			texto = texto.replace(/\n/g, "<br />");
		}
	
	}
		
	var paragrafoTexto = paragrafo(posicaoTexto, corTexto).append(texto);
	
	return tdTexto = td('alinhamento_vertical_meio')
		.attr('id', id)
		.append(paragrafoTexto);
		
}
