#!/bin/bash
# Script para Atualizar os Saldos das Fichas de Milho
#
# email: lls.homeoffice@gmail.com

PATH=.:$(dirname $0):$PATH
. lib/mysql.lib		|| exit 1

zerando()
{
	
	echo "Zerando Entradas|Saidas|Saldo da ficha de Milho..."
	
	${CMD_BASE} -e "\
			UPDATE Milho milho \
				SET milho.bruto = 0, \
					milho.liquidoEntrada = 0, \
					milho.liquidoSaida = 0, \
					milho.total = 0"
	
}

atualiza()
{
	
	zerando
	
	echo "Atualizando Entradas|Saidas|Saldo da ficha de Milho..."
	
	${CMD_BASE} -e "\
			UPDATE Milho milho \
				
				LEFT JOIN ( 
					
					SELECT 	fazendaProdutor_id AS fazenda_id, \
							SUM(liquido) AS total \
					FROM Entmilho \
						WHERE YEAR(data) < YEAR(CURDATE()) \
							GROUP BY fazenda_id \
				) AS entradaAnterior \
				ON milho.id = entradaAnterior.fazenda_id \
				
				LEFT JOIN ( 
				
					SELECT 	fazendaProdutor_id AS fazenda_id, \
							SUM(liquido) AS total \
					FROM Saimilho \
						WHERE YEAR(data) < YEAR(CURDATE()) \
							GROUP BY fazenda_id \
				) AS saidaAnterior \
				ON milho.id = saidaAnterior.fazenda_id \
				
				LEFT JOIN ( 
				
					SELECT 	fazendaProdutor_id AS fazenda_id, \
							SUM(liquido) AS total,
							SUM(bruto) AS bruto \
					FROM Entmilho \
						WHERE YEAR(data) = YEAR(CURDATE()) \
							GROUP BY fazenda_id \
				) AS entradaAtual \
				ON milho.id = entradaAtual.fazenda_id \
				
				LEFT JOIN ( 
				
					SELECT 	fazendaProdutor_id AS fazenda_id, \
							SUM(liquido) AS total \
					FROM Saimilho \
						WHERE YEAR(data) = YEAR(CURDATE()) \
							GROUP BY fazenda_id \
				) AS saidaAtual \
				ON milho.id = saidaAtual.fazenda_id \
				
				SET milho.bruto = IFNULL(entradaAtual.bruto, 0), \
					milho.liquidoEntrada = IFNULL(entradaAtual.total, 0), \
					milho.liquidoSaida = IFNULL(saidaAtual.total, 0), \
					milho.total = (IFNULL(entradaAnterior.total,0) - IFNULL(saidaAnterior.total,0) + IFNULL(entradaAtual.total,0) - IFNULL(saidaAtual.total,0))"

	lista
	
}

lista()
{

	${CMD_BASE} -e "\
			SELECT 	produtor.nome AS PRODUTOR, \
					fazendaProdutor.nome AS FAZENDA, \
					liquidoEntrada AS ENTRADAS, \
					liquidoSaida AS SAIDAS, \
					total AS SALDO \
				FROM Milho milho \
				INNER JOIN FazendaProdutor fazendaProdutor \
				ON fazendaProdutor.id = milho.id \
				INNER JOIN Produtor produtor \
				ON produtor.id = fazendaProdutor.produtor_id \
				WHERE total > 0 \
					ORDER BY PRODUTOR, FAZENDA"
					
	total

}

total()
{

	${CMD_BASE} -e "\
			SELECT 	SUM(liquidoEntrada) AS ENTRADAS, \
					SUM(liquidoSaida) AS SAIDAS, \
					SUM(total) AS SALDO \
				FROM Milho milho \
					WHERE total > 0"

}

check_id()
{
	
	ID="${QUERY}"
	
	if [ -z "${ID}" ]; then
	
		echo "ID Not Set!"
		echo "Use: sudo `basename $0` check [ID]"
		exit 1
		
	fi
	
	echo "Verificando Entradas|Saidas|Saldo ID: ${ID}"
	
	${CMD_BASE} -e "\
			SELECT	IFNULL(entradaAnterior.total,0) AS ENTRADAS_ANTERIOR, \
					IFNULL(saidaAnterior.total,0) AS SAIDAS_ANTERIOR, \
					IFNULL(entradaAtual.total,0) AS ENTRADAS_ATUAL, \
					IFNULL(saidaAtual.total,0) AS SAIDAS_ATUAL, \
					(IFNULL(entradaAnterior.total,0) - IFNULL(saidaAnterior.total,0) + \
					IFNULL(entradaAtual.total,0) - IFNULL(saidaAtual.total,0)) AS SALDO_ATUAL \
				FROM Milho milho \
					
					LEFT JOIN ( 
					
						SELECT 	fazendaProdutor_id AS fazenda_id, \
								SUM(liquido) AS total \
						FROM Entmilho \
							WHERE YEAR(data) < YEAR(CURDATE()) \
								GROUP BY fazenda_id \
					) AS entradaAnterior \
					ON milho.id = entradaAnterior.fazenda_id \
					
					LEFT JOIN ( 
					
						SELECT 	fazendaProdutor_id AS fazenda_id, \
								SUM(liquido) AS total \
						FROM Saimilho \
							WHERE YEAR(data) < YEAR(CURDATE()) \
								GROUP BY fazenda_id \
					) AS saidaAnterior \
					ON milho.id = saidaAnterior.fazenda_id \
					
					LEFT JOIN ( 
					
						SELECT 	fazendaProdutor_id AS fazenda_id, \
								SUM(liquido) AS total,
								SUM(bruto) AS bruto \
						FROM Entmilho \
							WHERE YEAR(data) = YEAR(CURDATE()) \
								GROUP BY fazenda_id \
					) AS entradaAtual \
					ON milho.id = entradaAtual.fazenda_id \
					
					LEFT JOIN ( 
					
						SELECT 	fazendaProdutor_id AS fazenda_id, \
								SUM(liquido) AS total \
						FROM Saimilho \
							WHERE YEAR(data) = YEAR(CURDATE()) \
								GROUP BY fazenda_id \
					) AS saidaAtual \
					ON milho.id = saidaAtual.fazenda_id \
					
					WHERE milho.id in (${ID})"
					
}

find_produtor_id()
{
	
	NAME="${QUERY}"
	
	if [ -z "${NAME}" ]; then
	
		echo "NAME Not Set!"
		echo "Use: sudo `basename $0` find_produtor [NAME]"
		exit 1
		
	fi
	
	echo "Find name: ${NAME}"
	
	${CMD_BASE} -e "SELECT id, nome FROM Produtor WHERE nome LIKE '%${NAME}%'"
					
}

find_fazenda_id()
{
	
	ID="${QUERY}"
	
	if [ -z "${ID}" ]; then
	
		echo "ID Not Set!"
		echo "Use: sudo `basename $0` find_fazenda [ID]"
		exit 1
		
	fi
	
	echo "Find ID: ${ID}"
	
	${CMD_BASE} -e "SELECT id, nome FROM FazendaProdutor WHERE produtor_id IN (${ID})"
					
}

QUERY="$2"

case "$1" in
	update)    	
		atualiza
		;; 
	check)
		check_id "${QUERY}"
		;;
	find_produtor)
		find_produtor_id "${QUERY}"
		;;
	find_fazenda)
		find_fazenda_id "${QUERY}"
		;;
	*)
		echo "Use: $(basename $0) {update|check|find_produtor|find_fazenda}"
		exit 1
		;;
esac
