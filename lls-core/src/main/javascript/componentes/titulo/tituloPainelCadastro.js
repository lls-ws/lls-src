/* =========================================================
 * tituloPainelCadastro.js
 * http://lls.net.br/
 * ========================================================= */

function tituloPainelCadastro(id, titulo) {
	
	var $textoTitulo = '';
		
	switch (id) {
		case 0:
			
			var arrayTitulo = titulo.split(' ');
			
			if (arrayTitulo[1] == null) {
			
				$textoTitulo = 'Cadastro de ' + titulo;
				
			}
			else {
				
				$textoTitulo = titulo;
				
			}
			
			break;
			
		case 1:
			$textoTitulo = 'Alteração de ' + titulo;
			break;
		case 2:
			
			var arrayTitulo = titulo.split(' ');
			
			if (arrayTitulo[1] == null) {
			
				if (titulo.substr(titulo.length -1) == 'r') titulo += 'e';
					
				if (titulo.substr(titulo.length -1) != 's') titulo += 's';
						
			}
			else {
				
				if (arrayTitulo[0].substr(arrayTitulo[0].length -1) == 'm') {
					arrayTitulo[0] = arrayTitulo[0].substr(0, arrayTitulo[0].length -1) + "n";
				}
				
				if (arrayTitulo[0].substr(arrayTitulo[0].length -1) != 's') arrayTitulo[0] += 's';
				
				titulo = '';
				
				jQuery.each( arrayTitulo, function( key, text ) {
					
					titulo += text + ' ';
					
				});
				
			}
			
			$textoTitulo = 'Relação de ' + titulo;
			
			break;
			
		case 3:
			$textoTitulo = 'Exclusão de ' + titulo;
			break;
		case 4:
			$textoTitulo = 'Visualização de ' + titulo;
			break;
	}
	
	return $textoTitulo;
	
}
