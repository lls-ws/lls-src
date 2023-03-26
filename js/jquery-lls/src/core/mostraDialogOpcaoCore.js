/* =========================================================
 * mostraDialogOpcaoCore.js
 * http://lls.net.br/
 * ========================================================= */

function mostraDialogOpcaoCore(dados) {
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	var divDialogOpcao = divDialog(dados.textoMensagem, dados.corTexto);
	
	divDialogOpcao.dialog({
		title: tituloPainelCadastro(3, titulo),
		autoOpen: false,
		position: { my: 'center', at: 'center', of: $("#painel"), within: $('table') },
		width: 350,
		modal: true,
		buttons: [
			{
				id: "botaoSim",
				text: 'Sim',
				tabIndex: -1,
				click: function() {
					
					dados.id = divDialogOpcao.data('id');
					
					divDialogOpcao.dialog( "close" );
					
					if (dados.opcao == "Remover") eventoRemoverCore(dados);
					else eventoImprimir(dados.url, {id: dados.id});
					
				}
			},
			{
				id: "botaoNao",
				text: 'Não',
				click: function() {
					
					$( this ).dialog( "close" );
					
				}
			}
		],
		close: function (ev, ui) {
            $(this).dialog('destroy').remove();
        }
	});
	
	divDialogOpcao.data('id', dados.id).dialog("open");
	
	$("body").scrollTop('0');
}
