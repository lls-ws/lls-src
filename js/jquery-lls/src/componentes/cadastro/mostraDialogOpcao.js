/* =========================================================
 * mostraDialogOpcao.js
 * http://lls.net.br/
 * ========================================================= */

function mostraDialogOpcao(textoMensagem, corTexto, classe, titulo, id, nomeTabela, tipo, url) {
	
	var $divDialog = divDialog(textoMensagem, corTexto);
	
	$divDialog.dialog({
		title: titulo,
		autoOpen: false,
		position: { my: 'center', at: 'center', of: $("#painel"), within: $(classe) },
		width: 350,
		modal: true,
		buttons: [
			{
				id: "botaoSim",
				text: 'Sim',
				tabIndex: -1,
				click: function() {
					
					var $id = $divDialog.data('id');
					
					$divDialog.dialog( "close" );
					
					if (tipo == "Remover") eventoRemover(titulo, $id, nomeTabela, url);
					else eventoImprimir(url, {id: $id});
					
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
	
	$divDialog
		.data('id', id)
		.dialog("open");
	
	$("body").scrollTop('0');
}
