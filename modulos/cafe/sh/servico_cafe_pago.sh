#!/bin/bash
# Script para atribuir o valor pago no servico de cafe
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

mostra_servico_total()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL \
					FROM Servcafe \
						WHERE data > '"$DATA_FINAL"'"

}

mostra_servico_pago()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS PAGO \
					FROM Servcafe \
						WHERE pago = 'Y' \
						AND data > '"$DATA_FINAL"'"

}

mostra_servico_aberto()
{
						
	$CMD_BASE -e "SELECT SUM(valor) AS ABERTO \
					FROM Servcafe \
						WHERE pago = 'N' \
						AND data > '"$DATA_FINAL"'"
	
}

atualiza_servico_pago()
{
	
	echo "Atualizando os pagamentos dos serviços ..." | iconv -f utf-8 -t iso8859-1
	
	$CMD_BASE -e "TRUNCATE Baixacafe;"
	
	$CMD_BASE -e "INSERT INTO Baixacafe (servCafe_id, data, valor, obs) \
					SELECT  servCafe.id, \
							servCafe.data, \
							servCafe.valor, \
							'Baixa automatica' \
						FROM Servcafe servCafe \
							WHERE servCafe.pago = 'Y'"
	
	mostra_servico_pago
	
	mostra_baixas
	
}

mostra_baixas()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS PAGO \
					FROM Baixacafe \
						WHERE data > '"$DATA_FINAL"'"

}

mostra_servico_baixas()
{
	
	echo "Fechados"
	
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servcafe servCafe \
					
						LEFT JOIN ( \
										
							SELECT  baixaCafe.servCafe_id AS ID_SERV, \
									SUM(baixaCafe.valor) AS PAGO \
								FROM Baixacafe baixaCafe \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servCafe.id \
						
						WHERE servCafe.data > '"$DATA_FINAL"' \
						AND servCafe.pago = 'Y' "
						
	echo "Abertos"
						
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servcafe servCafe \
					
						LEFT JOIN ( \
										
							SELECT  baixaCafe.servCafe_id AS ID_SERV, \
									SUM(baixaCafe.valor) AS PAGO \
								FROM Baixacafe baixaCafe \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servCafe.id \
						
						WHERE servCafe.data > '"$DATA_FINAL"' \
						AND servCafe.pago = 'N' "
						
	echo "Todos"
						
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servcafe servCafe \
					
						LEFT JOIN ( \
										
							SELECT  baixaCafe.servCafe_id AS ID_SERV, \
									SUM(baixaCafe.valor) AS PAGO \
								FROM Baixacafe baixaCafe \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servCafe.id \
						
						WHERE servCafe.data > '"$DATA_FINAL"'"
						
}

DATA_FINAL='2018-09-30'

comando_sql

mostra_servico_total
mostra_servico_aberto
#mostra_servico_pago
mostra_servico_baixas

atualiza_servico_pago
