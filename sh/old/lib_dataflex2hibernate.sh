#!/bin/bash
# Biblioteca para definir arquivos e diretórios
#
# email: lls.homeoffice@gmail.com

cria_campo()
{	

	NOME_CAMPO=$(echo "$FIELD" | tr '[:upper:]' '[:lower:]')
	
	NOME_METODO=`echo "${NOME_CAMPO^}"`
	
	case $TYPE in
		"DAT")
			
			tipo_calendar
			
			;;
		"ASC")
			
			tipo_string
			
			;;
		"NUM")
			
			tipo_numero
			
			;;
		*)
			echo "Fim da leitura do tipo de dados"
			break;
			;;
	esac

}
