/* =========================================================
 * setDadosTabelaEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaEntmilho(entmilho) {
	
	formataDadosEntmilho(entmilho);
	
	var $idLinha = "entmilho_" + entmilho.id;
	
	var $urlBotao = 'mostraCadastro("' + entmilho.id + '" , "Entmilho")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar" + entmilho.id, "", "fa-eye", "0", "btn btn-primary btn-xs", "button", $urlBotao
	);
	
	var $tbody = $("#listaEntmilhoForm #tableListaEntmilho #tbodyListaEntmilho");
	
	var $tr = tr($idLinha, "");
		
	$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
	$tr.append(tabelaCelula(entmilho.data, "text-center", "texto", "tdData"));
	$tr.append(tabelaCelula(entmilho.laudo, "text-center", "texto", "tdLaudo"));
	
	setDadosColunaHide("Entmilho", entmilho, $tr);
	
	$tr.append(tabelaCelula(entmilho.bruto, "text-right", "texto", "tdBruto"));
	
	var thImpureza = $('#nomeColunastableListaEntmilho').find("#thimpureza");
	var thValorImpureza = $('#nomeColunastableListaEntmilho').find("#thvalorImpureza");
	var thUmidade = $('#nomeColunastableListaEntmilho').find("#thumidade");
	var thDescontoUmidade = $('#nomeColunastableListaEntmilho').find("#thdescontoUmidade");
	var thValorUmidade = $('#nomeColunastableListaEntmilho').find("#thvalorUmidade");
	var thQuirela = $('#nomeColunastableListaEntmilho').find("#thquirela");
	var thValorQuirela = $('#nomeColunastableListaEntmilho').find("#thvalorQuirela");
	var thChocho = $('#nomeColunastableListaEntmilho').find("#thchocho");
	var thValorChocho = $('#nomeColunastableListaEntmilho').find("#thvalorChocho");
	
	var thRecepcao = $('#nomeColunastableListaEntmilho').find("#threcepcao");
	var thLimpeza = $('#nomeColunastableListaEntmilho').find("#thlimpeza");
	var thSecagem = $('#nomeColunastableListaEntmilho').find("#thsecagem");
	var thCarga = $('#nomeColunastableListaEntmilho').find("#thcarga");
	
	var idFazenda = $('#idnomeProcuraEntmilhoFazendaProdutor').val();
	
	if (idFazenda > 0) {
	
		thImpureza.show();
		thValorImpureza.show();
		thUmidade.show();
		thDescontoUmidade.show();
		thValorUmidade.show();
		thQuirela.show();
		thValorQuirela.show();
		thChocho.show();
		thValorChocho.show();
		
		thRecepcao.show();
		thLimpeza.show();
		thSecagem.show();
		thCarga.show();
	
		$tr.append(tabelaCelula(entmilho.impureza, "text-right", "texto", "tdImpureza"));
		$tr.append(tabelaCelula(entmilho.valorImpureza, "text-right", "texto", "tdValorImpureza"));
		$tr.append(tabelaCelula(entmilho.umidade, "text-right", "texto", "tdUmidade"));
		$tr.append(tabelaCelula(entmilho.descontoUmidade, "text-right", "texto", "tdDescontoUmidade"));
		$tr.append(tabelaCelula(entmilho.valorUmidade, "text-right", "texto", "tdValorUmidade"));
		$tr.append(tabelaCelula(entmilho.quirela, "text-right", "texto", "tdQuirela"));
		$tr.append(tabelaCelula(entmilho.valorQuirela, "text-right", "texto", "tdValorQuirela"));
		$tr.append(tabelaCelula(entmilho.chocho, "text-right", "texto", "tdChocho"));
		$tr.append(tabelaCelula(entmilho.valorChocho, "text-right", "texto", "tdValorChocho"));

	}
	else {
		
		thImpureza.hide();
		thValorImpureza.hide();
		thUmidade.hide();
		thDescontoUmidade.hide();
		thValorUmidade.hide();
		thQuirela.hide();
		thValorQuirela.hide();
		thChocho.hide();
		thValorChocho.hide();
		
		thRecepcao.hide();
		thLimpeza.hide();
		thSecagem.hide();
		thCarga.hide();
		
	}
	
	$tr.append(tabelaCelula(entmilho.liquido, "text-right", "texto", "tdLiquido"));
	
	if (idFazenda > 0) {
	
		$tr.append(tabelaCelula(entmilho.recepcao, "text-right", "texto", "tdRecepcao"));
		$tr.append(tabelaCelula(entmilho.limpeza, "text-right", "texto", "tdLimpeza"));
		$tr.append(tabelaCelula(entmilho.secagem, "text-right", "texto", "tdSecagem"));
		$tr.append(tabelaCelula(entmilho.carga, "text-right", "texto", "tdCarga"));

	}
		
	$tr.append(tabelaCelula(entmilho.total, "text-right", "texto", "tdTotal"));
	
	$tbody.append($tr);
	
}
