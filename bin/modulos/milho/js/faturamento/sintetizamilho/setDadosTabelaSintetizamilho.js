/* =========================================================
 * setDadosTabelaSintetizamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaSintetizamilho(sintetizamilho) {
	
	formataDadosSintetizamilho(sintetizamilho);
	
	var $idLinha = "sintetizamilho_" + sintetizamilho.id;
	
	var $tbody = $("#listaSintetizamilhoForm #tableListaSintetizamilho #tbodyListaSintetizamilho");
	
	var $tr = tr($idLinha, "");
	
	setDadosColunaHide("Sintetizamilho", sintetizamilho, $tr);
	
	$tr.append(tabelaCelula(sintetizamilho.armazenagem, "text-right", "texto", "tdArmazenagem"));
	$tr.append(tabelaCelula(sintetizamilho.recepcao, "text-right", "texto", "tdRecepcao"));
	$tr.append(tabelaCelula(sintetizamilho.limpeza, "text-right", "texto", "tdLimpeza"));
	$tr.append(tabelaCelula(sintetizamilho.secagem, "text-right", "texto", "tdSecagem"));
	$tr.append(tabelaCelula(sintetizamilho.carga, "text-right", "texto", "tdCarga"));
	
	$tr.append(tabelaCelula(sintetizamilho.total, "text-right", "texto", "tdTotal"));
	
	$tbody.append($tr);
	
}
