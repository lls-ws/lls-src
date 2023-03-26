/* =========================================================
 * formularioTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function formularioTelefone(tipoOperacao, nomeTabela) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-telefone.js", "js");
	
	var $idTela = 'divCampos' + nomeTabela;
	
	var $telaTelefone = $('<div />').attr({id: $idTela}).addClass('form-horizontal');
	
	var $campoTelefone = campoTelefoneHorizontal(
		'numero' + nomeTabela, 'Número', 9, 2, true
	);
	
	var $campoResponsavel = campoTextoHorizontal(
		'responsavel' + nomeTabela,
		'text',
		'Contato', 9, 2,
		'', false, 50
	);
	
	var $caixaCombinacaoTipos = caixaCombinacaoHorizontal(
		'tipo' + nomeTabela,
		'Tipo', 9, 2, false,
		pegaNomesTiposTelefones()
	);
	
	var $caixaCombinacaoOperadoras = caixaCombinacaoOperadoras(
		'operadora' + nomeTabela,
		'Operador', 9, 2, false,
		nomesOperadoras()
	);
	
	$caixaCombinacaoOperadoras.hide();
	
	var $seletorTipos = $caixaCombinacaoTipos.find('#tipo' + nomeTabela);
	
    $seletorTipos.change(function(){
        
        if($seletorTipos.val() == 'CELULAR') {
            
            $caixaCombinacaoOperadoras.show();
            
        }
        else {
            
            $caixaCombinacaoOperadoras.hide();
            
        }
    });
	
	$telaTelefone.append($campoTelefone);
	
	$telaTelefone.append($campoResponsavel);
	
	$telaTelefone.append($caixaCombinacaoTipos);
	
	$telaTelefone.append($caixaCombinacaoOperadoras);
	
	var $formulario = formularioCadastro(
		tipoOperacao,
		nomeTabela,
		tipoOperacao, 3,
		$telaTelefone
	);
	
	return $formulario;
	
}
