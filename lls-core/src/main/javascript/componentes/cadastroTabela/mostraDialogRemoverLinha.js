/* =========================================================
 * mostraDialogRemoverLinha.js
 * http://lls.net.br/
 * ========================================================= */

function mostraDialogRemoverLinha(textoMensagem, corTexto, classe, titulo, id, urlRemover) {
	
	$('#divDialog').empty();
	
	$('#divDialog').remove();
	
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
					
					var $idLinhaTabela = '#' + urlRemover.toLowerCase() + '_' + $id;
					
					$($idLinhaTabela).remove();
					
					mostraDialog('Remoção efetuada com sucesso!', 'texto_cor_verde', classe, titulo);
					
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
