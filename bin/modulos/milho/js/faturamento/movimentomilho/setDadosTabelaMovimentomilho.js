/* =========================================================
 * setDadosTabelaMovimentomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaMovimentomilho(movimentomilho) {
	
	formataDadosMovimentomilho(movimentomilho);
	
	var $idLinha = "movimentomilho_" + movimentomilho.id;
	
	var $tbody = $("#listaMovimentomilhoForm #tableListaMovimentomilho #tbodyListaMovimentomilho");
	
	var $tr = tr($idLinha, "");
	
	setDadosColunaHide("Movimentomilho", movimentomilho, $tr);
	
	$tr.append(tabelaCelula(movimentomilho.data, "text-center", "texto", "tdData"));
	$tr.append(tabelaCelula(movimentomilho.anterior, "text-right", "texto", "tdAnterior"));
	$tr.append(tabelaCelula(movimentomilho.entradas, "text-right", "texto", "tdEntradas"));
	$tr.append(tabelaCelula(movimentomilho.saidas, "text-right", "texto", "tdSaidas"));
	$tr.append(tabelaCelula(movimentomilho.saldo, "text-right", "texto", "tdSaldo"));
	
	$tr.append(tabelaCelula(movimentomilho.armazenagem, "text-right", "texto", "tdArmazenagem"));
	$tr.append(tabelaCelula(movimentomilho.limpeza, "text-right", "texto", "tdLimpeza"));
	$tr.append(tabelaCelula(movimentomilho.secagem, "text-right", "texto", "tdSecagem"));
	$tr.append(tabelaCelula(movimentomilho.carga, "text-right", "texto", "tdCarga"));
	$tr.append(tabelaCelula(movimentomilho.recepcao, "text-right", "texto", "tdRecepcao"));
	
	$tr.append(tabelaCelula(movimentomilho.total, "text-right", "texto", "tdTotal"));
	
	$tbody.append($tr);
	
}
