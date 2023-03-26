#!/bin/bash
# Script para atribuir o valor pago no servico de milho
#
# email: lls.homeoffice@gmail.com

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

mostra_servico_total()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL \
					FROM Servmilho \
						WHERE data > '"$DATA_FINAL"'"

}

mostra_servico_pago()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS PAGO \
					FROM Servmilho \
						WHERE pago = 'Y' \
						AND data > '"$DATA_FINAL"'"

}

mostra_servico_aberto()
{
						
	$CMD_BASE -e "SELECT SUM(valor) AS ABERTO \
					FROM Servmilho \
						WHERE pago = 'N' \
						AND data > '"$DATA_FINAL"'"
	
}

atualiza_servico_pago()
{
	
	echo "Atualizando os pagamentos dos serviços ..." | iconv -f utf-8 -t iso8859-1
	
	$CMD_BASE -e "INSERT INTO Baixamilho (servMilho_id, data, valor, obs) \
					SELECT  servMilho.id, \
							servMilho.data, \
							servMilho.valor, \
							'Baixa automatica' \
						FROM Servmilho servMilho \
							WHERE servMilho.pago = 'Y'"
	
	mostra_servico_pago
	
	mostra_baixas
	
}

mostra_baixas()
{
	
	$CMD_BASE -e "SELECT SUM(valor) AS PAGO \
					FROM Baixamilho \
						WHERE data > '"$DATA_FINAL"'"

}

mostra_servico_baixas()
{
	
	echo "Fechados"
	
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servmilho servMilho \
					
						LEFT JOIN ( \
										
							SELECT  baixaMilho.servMilho_id AS ID_SERV, \
									SUM(baixaMilho.valor) AS PAGO \
								FROM Baixamilho baixaMilho \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servMilho.id \
						
						WHERE servMilho.data > '"$DATA_FINAL"' \
						AND servMilho.pago = 'Y' "
						
	echo "Abertos"
						
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servmilho servMilho \
					
						LEFT JOIN ( \
										
							SELECT  baixaMilho.servMilho_id AS ID_SERV, \
									SUM(baixaMilho.valor) AS PAGO \
								FROM Baixamilho baixaMilho \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servMilho.id \
						
						WHERE servMilho.data > '"$DATA_FINAL"' \
						AND servMilho.pago = 'N' "
						
	echo "Todos"
						
	$CMD_BASE -e "SELECT SUM(valor) AS TOTAL, \
						 SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, \
						 SUM(valor - IFNULL(baixas.PAGO, 0)) AS VALOR \
					FROM Servmilho servMilho \
					
						LEFT JOIN ( \
										
							SELECT  baixaMilho.servMilho_id AS ID_SERV, \
									SUM(baixaMilho.valor) AS PAGO \
								FROM Baixamilho baixaMilho \
									GROUP BY ID_SERV \
							
						) baixas \
						ON baixas.ID_SERV = servMilho.id \
						
						WHERE servMilho.data > '"$DATA_FINAL"'"
						
}

DATA_FINAL='2017-03-31'

comando_sql

mostra_servico_total
mostra_servico_aberto
#mostra_servico_pago
mostra_servico_baixas

atualiza_servico_pago
