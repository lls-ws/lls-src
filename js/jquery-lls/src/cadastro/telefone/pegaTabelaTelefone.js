/* =========================================================
 * pegaTabelaTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function pegaTabelaTelefone(tr, idTelefone) {
	
	var operadora = tr.find("#tdOperadora").find('a').text().toUpperCase();
	
	var tipo = tr.find("#tdTipo").find('p').text();
	
	tipo = tipo.substr(tipo.indexOf(' ')+1).toUpperCase();
	
	var telefone = {
		id: idTelefone,
		numero: pegaTelefoneNumeros(tr.find("#tdNumero").find('p').text()),
		responsavel: encodeURIComponent( unescape( tr.find("#tdResponsavel").find('p').text())),
		tipo: pegaValorCaixaCombinacao(tipo),
		operadora: pegaValorCaixaCombinacao(operadora)
	}
	
	return telefone;
	
}
