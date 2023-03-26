#!/bin/bash
# Script para mostrar os dados dos produtores e fazendas no mysql
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

mostrar_produtor()
{

	NOME="$1"

	$CMD_BASE -e "SELECT produtor.nome AS PRODUTOR, \
						 produtor.id AS ID_PRODUTOR, \
					 	 fazendaProdutor.id AS ID_FAZENDA, \
						 fazendaProdutor.nome AS FAZENDA \
					FROM Produtor produtor \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE produtor.nome like '"$NOME"%' \
								ORDER BY PRODUTOR, FAZENDA"

}

apaga_produtor()
{

	ID_PROD="$1"

	ID_FAZ="$2"
	
	$CMD_BASE -e "DELETE FROM FazendaProdutor where id = '"$ID_FAZ"'"
	
	$CMD_BASE -e "DELETE FROM Produtor where id = '"$ID_PROD"'"

}

mostrar_milho_produtor()
{

	NOME="$1"
	
	$CMD_BASE -e "SELECT produtor.nome AS PRODUTOR, \
						 produtor.id AS ID_PRODUTOR, \
					 	 fazendaProdutor.id AS ID_FAZENDA, \
						 fazendaProdutor.nome AS FAZENDA, \
						 milho.dataFaturamento AS DATA_FATURAMENTO, \
						 empresa.dataMilho AS DATA_EMPRESA \
					FROM Milho milho \
						INNER JOIN Empresa empresa \
						ON empresa.id = '1' \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON milho.id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE produtor.nome like '"$NOME"%' \
								ORDER BY PRODUTOR, FAZENDA"

}

mostrar_milho_faturamento()
{

	$CMD_BASE -e "SELECT produtor.nome AS PRODUTOR, \
						 produtor.id AS ID_PRODUTOR, \
					 	 fazendaProdutor.id AS ID_FAZENDA, \
						 fazendaProdutor.nome AS FAZENDA, \
						 milho.dataFaturamento AS DATA_FATURAMENTO, \
						 empresa.dataMilho AS DATA_EMPRESA \
					FROM Milho milho \
						INNER JOIN Empresa empresa \
						ON empresa.id = '1' \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON milho.id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE milho.dataFaturamento > empresa.dataMilho \
								ORDER BY PRODUTOR, FAZENDA"
							
}

atualiza_data_faturamento()
{
	
	ID_MILHO="$1"
	
	$CMD_BASE -e "UPDATE Milho milho \
					SET milho.dataFaturamento = '2017-03-31' \
						WHERE milho.id = '"$ID_MILHO"'"
						
	$CMD_BASE -e "SELECT produtor.nome AS PRODUTOR, \
						 produtor.id AS ID_PRODUTOR, \
					 	 fazendaProdutor.id AS ID_FAZENDA, \
						 fazendaProdutor.nome AS FAZENDA, \
						 milho.dataFaturamento AS DATA_FATURAMENTO \
					FROM Milho milho \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON milho.id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE milho.id = '"$ID_MILHO"'"
	
}

comando_sql

case "$1" in
	1)    	
		mostrar_produtor "$2"
		;;
	2)    	
		apaga_produtor "$2" "$3"
		;;
	3)    	
		mostrar_milho_produtor "$2"
		;;
	4)    	
		atualiza_data_faturamento "$2"
		;;
	*)
		echo "Use: $0 {1-mostrar NOME|2-apaga ID_PROD ID_FAZ|3-milho NOME|4-atualiza ID_MILHO}"
		exit 1
		;;
esac
