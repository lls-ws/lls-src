/* =========================================================
 * mudaLinhaTabelaTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function mudaLinhaTabelaTelefone(telefone, tr, arrayColunaBotoes) {
	
	formataDadosTelefone(telefone);
	
	telefone = setOperadoraImagem(telefone);
	
	tr.find("#tdNumero").replaceWith(tabelaCelula(telefone.numero, 'text-center', 'texto', 'tdNumero'));
	tr.find("#tdResponsavel").replaceWith(tabelaCelula(telefone.responsavel, 'text-left', 'texto', 'tdResponsavel'));
	tr.find("#tdTipo").replaceWith(tabelaCelula(telefone.tipo, 'text-center', 'texto', 'tdTipo'));
	tr.find("#tdOperadora").replaceWith(telefone.tdOperadora);
	tr.find("#tdBotoes").replaceWith(tabelaBotoes(telefone.id, telefone.numero, arrayColunaBotoes));
	
}
