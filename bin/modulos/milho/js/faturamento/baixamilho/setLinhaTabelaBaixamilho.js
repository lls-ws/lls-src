/* =========================================================
 * setLinhaTabelaBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setLinhaTabelaBaixamilho(baixamilho, tbody, arrayColunaBotoes) {
	
	arrayColunaBotoes = { 
		"remove": "remove" + baixamilho.nomeTabela
	};
	
	formataDadosBaixamilho(baixamilho);
	
	var tr = setIdTabelaCadastro(baixamilho, tbody);
		
	if (arrayColunaBotoes != null) {
		
		tr.append(tabelaBotoes(baixamilho.id, baixamilho.texto, arrayColunaBotoes));
		
	}
	
	tr.append(tabelaCelula(baixamilho.data, 'text-center', 'texto', 'tdData'));
	tr.append(tabelaCelula(baixamilho.valor, 'text-center', 'texto', 'tdValor'));
	tr.append(tabelaCelula(baixamilho.obs, 'text-left', 'texto', 'tdObs'));
	
	tbody.append(tr);
	
}
