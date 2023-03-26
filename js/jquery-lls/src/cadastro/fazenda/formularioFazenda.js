/* =========================================================
 * formularioFazenda.js
 * http://lls.net.br/
 * ========================================================= */

function formularioFazenda(tipoOperacao, nomeTabela) {
	
	var $telaEndereco = telaEnderecoFazenda(nomeTabela);
	
	var $formulario = formularioCadastro(tipoOperacao, nomeTabela, tipoOperacao, 4, $telaEndereco);
	
	if (tipoOperacao == 0) {
	
		var cpfcnpjProdutor = $('#produtorForm').find('#cpfcnpjProdutor').val();
		
		if (cpfcnpjProdutor.length == 18) {
			
			$formulario.find('#cpfcnpj' + nomeTabela + 'RadioCnpj').attr('checked', 'true');
			$formulario.find('#cpfcnpj' + nomeTabela).mask("99.999.999/9999-99");
			$formulario.find('#cpfcnpj' + nomeTabela).attr('placeholder', '__.___.___/____-__');
			$formulario.find('#cpfcnpj' + nomeTabela + 'Label').text('CNPJ');
		}
		
		$formulario.find('#cpfcnpj' + nomeTabela).val(cpfcnpjProdutor);
	
	}

	return $formulario;
	
}
