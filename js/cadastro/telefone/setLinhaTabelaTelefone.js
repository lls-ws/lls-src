/* =========================================================
 * setLinhaTabelaTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaTelefone(telefone, tbody, arrayColunaBotoes) {
	
	formataDadosTelefone(telefone);
	
	telefone["texto"] = telefone.numero;
	
	var tr = setIdTabelaCadastro(telefone, tbody);
	
	telefone = setOperadoraImagem(telefone);
	
	if (arrayColunaBotoes != null) {
		
		tr.append(tabelaBotoes(telefone.id, telefone.texto, arrayColunaBotoes));
		
	}
	
	tr.append(tabelaCelula(telefone.numero, 'text-center', 'texto', 'tdNumero'));
	tr.append(tabelaCelula(telefone.responsavel, 'text-left', 'texto', 'tdResponsavel'));
	tr.append(tabelaCelula(telefone.tipo, 'text-center', 'texto', 'tdTipo'));
	tr.append(telefone.tdOperadora);
	
	tbody.append(tr);
	
}
