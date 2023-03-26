#!/bin/bash
# Script para atualizar os saldos das fichas de milho
#
# email: lls.homeoffice@gmail.com

zerando()
{
	
	echo "Zerando Entradas|Saidas|Saldo da ficha de Milho..."
	
	mysql -u root --password=Uber#739200 -D bd_lls -e "\
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
	
	mysql -u root --password=Uber#739200 -D bd_lls -e "\
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

	mysql -u root --password=Uber#739200 -D bd_lls -e "\
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

	mysql -u root --password=Uber#739200 -D bd_lls -e "\
			SELECT 	SUM(liquidoEntrada) AS ENTRADAS, \
					SUM(liquidoSaida) AS SAIDAS, \
					SUM(total) AS SALDO \
				FROM Milho milho \
					WHERE total > 0"

}

teste()
{
	
	echo "Verificando Entradas|Saidas|Saldo:"
	
	mysql -u root --password=Uber#739200 -D bd_lls -e "\
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
					
					WHERE milho.id in (389, 968)"
					
}

exclui()
{
	
	echo "Excluindo registro errado..."
	mysql -u root --password=Uber#739200 -D bd_lls -e "delete from Saimilho where id = 63"

}

atualiza
