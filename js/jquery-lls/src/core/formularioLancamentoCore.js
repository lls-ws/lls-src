/* =========================================================
 * formularioLancamentoCore.js
 * http://lls.net.br/
 * ========================================================= */

function formularioLancamentoCore(dados, arrayFormularios) {
	
	var dataInicial = $('#dataInicial' + dados.nomeTabela).datepicker("getDate")
	
	if (!$.isEmptyObject(dataInicial) && dados.tipoOperacao == 0) {
		
		dados.click = "click-off";
		
		novoFormularioCore(dados);
		
	}
	
	var tabs = divTabs(dados.nomeTabela, eval('nomeTabs' + dados.nomeTabela + '(1)'));
	
	if (arrayFormularios.length > 0) {
		
		for (var i = 1; i <= arrayFormularios.length; i++) {
			tabs.find('#tab' + dados.nomeTabela + i).append(arrayFormularios[i-1]);
		}
		
	}
	
	tabs.find('#tab' + dados.nomeTabela + '1').addClass('in active');
	tabs.find('#linha_tab' + dados.nomeTabela + '1').addClass('active');
	
	var formulario = formularioCadastroCore(dados, tabs);
	
	return formulario;
	
}
