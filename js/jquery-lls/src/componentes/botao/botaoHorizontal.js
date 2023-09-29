/* =========================================================
 * botaoHorizontal.js
 * http://lls.net.br/
 * ========================================================= */

function botaoHorizontal(id, label, icone, tamanhoBotao, tamanhoOffSet, tipoBotao, type, onClick) {
	
	var idFormGroup = id + 'FormGroup';
	var tamanhoOffSet = 'col-sm-offset-' + tamanhoOffSet;
	var tamanhoBotao = 'col-sm-' + tamanhoBotao;
	
	var button = botao(id, label, icone, tamanhoBotao, tipoBotao, type, onClick);
	
	var divButton = $("<div/>")
		.addClass(tamanhoBotao)
		.addClass(tamanhoOffSet)
		.append(button);
	
	var divFormGroup = $("<div/>")
		.attr({id: idFormGroup})
		.addClass('form-group')
		.append(divButton);
	
	return divFormGroup;
	
}
