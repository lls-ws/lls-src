#!/bin/bash
# Script para selecionar os lotes das entradas
#
# email: lls.homeoffice@gmail.com

lotes_entradas()
{
	
	comando_sql "SELECT produtor.nome AS produtor, \
						fazendaProdutor.nome AS fazenda \
					FROM FazendaProdutor fazendaProdutor
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
						AND fazendaProdutor.id = $ID"

	QUERY="FROM Lote lote \
						INNER JOIN Peneira peneira \
						ON lote.peneira_id = peneira.id \
						INNER JOIN Entcafe entcafe \
						ON lote.entcafe_id = entcafe.id \
						AND entcafe.data >= '2017-01-01' \
						AND entcafe.data <= '2017-09-01' \
						AND entcafe.fazendaProdutor_id = $ID "


	comando_sql "SELECT lote.lote AS lote, \
						lote.armazem AS armazem, \
						lote.pilha AS pilha, \
						peneira.nome AS peneira, \
						DATE_FORMAT(entcafe.data, '%d/%m/%Y') AS data, \
						lote.sacas AS sacas, \
						lote.peso AS peso \
					${QUERY}
						ORDER BY data, lote"

	comando_sql "SELECT SUM(lote.sacas) AS Total_Sacas, \
						SUM(lote.peso) AS Total_Peso \
					$QUERY"
}

lotes_fazenda()
{

	FAZENDA_ID="864" # Funchal
	#FAZENDA_ID="896"

	$CMD_BASE -e "SELECT GROUP_CONCAT(entcafe_Lote.lote_id SEPARATOR ', ')
					FROM Entcafe entcafe 
					INNER JOIN Entcafe_Lote entcafe_Lote 
					ON entcafe_Lote.entcafe_id = entcafe.id 
					WHERE entcafe.fazendaProdutor_id = $FAZENDA_ID"

}

lotes()
{

	FAZENDA_ID="864"
	#FAZENDA_ID="896"

	$CMD_BASE -e "SELECT lote.id,
						 lote.lote AS lote,
						 lote.saldoSacas,
						 lote.saldoPeso,
						 (lote.peso / lote.sacas) AS media,
						 lote.armazem,
						 lote.pilha,
						 peneira.nome
					FROM Lote lote 
					INNER JOIN Peneira peneira 
					ON lote.peneira_id = peneira.id
					INNER JOIN Entcafe_Lote entcafe_Lote 
					ON entcafe_Lote.lote_id = lote.id 
					INNER JOIN Entcafe entcafe 
					ON entcafe_Lote.entcafe_id = entcafe.id 
					WHERE entcafe.fazendaProdutor_id = $FAZENDA_ID 
					AND entcafe.fechado = 'Y' 
					AND lote.lote like '%GR005%' 
					AND lote.saldoSacas > 0 
					AND lote.saldoPeso > 0 
						ORDER BY lote 
						LIMIT 0, 8";

}

entcafe()
{
	
	if [ -z "${1}" ]; then

		echo "Limpando tosdas as Entradas e voltando os saldos dos Lotes..."
		$CMD_BASE -e "delete from Entcafe_Lote; delete from Entcafe; delete from Lote;
					  select * from Entcafe; select * from Entcafe_Lote; select * from Lote;"

	else

		echo "Mostrando os dados das tabelas de Entrada de Cafe:"
		$CMD_BASE -e "select * from Entcafe; select * from Entcafe_Lote; select * from Lote;"

	fi

	
}

oscafe()
{
	
	if [ -z "${1}" ]; then

		echo "Limpando todos os Servicos e voltando os saldos dos Lotes..."
		$CMD_BASE -e "update Lote set saldoPeso = peso, saldoSacas = sacas where lote like 'GR%';
					  delete from Lote where lote like 'OS%';
					  delete from Oscafe_Lote; delete from Oscafe_Despejo; delete from Oscafe;
					  select * from Oscafe; select * from Oscafe_Despejo; select * from Oscafe_Lote; select * from Lote;"

	else

		echo "Mostrando os dados das tabelas de Servico de Cafe:"
		$CMD_BASE -e "select * from Oscafe; select * from Oscafe_Despejo; select * from Oscafe_Lote; select * from Lote;"

	fi

	
}

saicafe()
{
	
	if [ -z "${1}" ]; then

		echo "Limpando todas as Saidas e voltando os saldos dos Lotes..."
		$CMD_BASE -e "update Lote set saldoPeso = peso, saldoSacas = sacas where lote like 'OS%';
					  delete from Saicafe_Despejo; delete from Saicafe;
					  select * from Saicafe; select * from Saicafe_Despejo; select * from Lote;"

	else

		echo "Mostrando os dados das tabelas de Saida de Cafe:"
		$CMD_BASE -e "select * from Saicafe; select * from Saicafe_Despejo; select * from Lote;"

	fi

	
}

tracafe()
{
	
	if [ -z "${1}" ]; then

		echo "Limpando todos as Transferencias e voltando os saldos dos Lotes..."
		$CMD_BASE -e "update Lote set saldoPeso = peso, saldoSacas = sacas where lote like 'GR%';
					  delete from Lote where lote like 'GT%';
					  delete from Tracafe_Lote; delete from Tracafe_Despejo; delete from Tracafe;
					  select * from Tracafe; select * from Tracafe_Despejo; select * from Tracafe_Lote; select * from Lote;"

	else

		echo "Mostrando os dados das tabelas de Transferencia de Cafe:"
		$CMD_BASE -e "select * from Tracafe; select * from Tracafe_Despejo; select * from Tracafe_Lote; select * from Lote;"

	fi

	
}

#ID="$1"

#if [ -z "$ID" ]; then

	#echo "ID nao informado!"
	#echo "Usando ID = 864"
	#ID="864"

#fi

# Definindo o comando
CMD="mysql -u root --password=Aws#739200"

# Definindo a base de dados
BASE="bd_lls"

# Definindo a base de dados
BASE_OPT=$(echo "-D $BASE")

# Definindo o comando com a base de dados
CMD_BASE=$(echo "$CMD $BASE_OPT")

#lotes_fazenda
#lotes_entradas
#lotes

entcafe "$1"
#oscafe "$1"
#saicafe "$1"
#tracafe "$1"
