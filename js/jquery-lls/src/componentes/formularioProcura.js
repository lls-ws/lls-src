/* =========================================================
 * formularioProcura.js
 * http://lls.net.br/
 * ========================================================= */

function formularioProcura(nomeTabela, textoLabel) {
	
	var $formulario = formularioHorizontal('formularioProcura' + nomeTabela, '');
	
	var $divProcura = $('<div/>').addClass('input-group form-control formulario_cor');
	
	var urlSearch = 'eventoListaCadastro(1, "' + nomeTabela + '")';
	
	var urlAdd = 'novoCadastro("' + nomeTabela + '", "click-off", "1")';
	
	var $campoTextoProcura = campoTextoProcura(
		textoLabel,
		nomeTabela,
		urlSearch,
		urlAdd,
		2
	);

	$divProcura.append($campoTextoProcura);
	
	$formulario.submit(function(e){
		
		e.preventDefault();
		
		eval(urlSearch);
		 
	});
	
	$formulario.append($divProcura);
	
	return $formulario;
	
}
