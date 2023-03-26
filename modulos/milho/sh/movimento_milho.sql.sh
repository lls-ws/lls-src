#!/bin/bash
# Script para calcular e mostrar o movimento de milho
#
# email: lls.homeoffice@gmail.com

rodar_movimento()
{

comando_sql "DELETE FROM Fatmilho WHERE data = '"$DATA_FINAL"'"

comando_sql "INSERT INTO Fatmilho (fazendaProdutor_id, data, saldoAnterior, entradas, saidas, saldo, \
								   recepcao, limpeza, secagem, carga) \
			 SELECT milho.id, \
					'"$DATA_FINAL"', \
					(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0)) AS ANTERIOR, \
					IFNULL(entradas.total,0) AS ENTRADAS, \
					IFNULL(saidas.total,0) AS SAIDAS, \
					(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0))+IFNULL(entradas.total,0)-IFNULL(saidas.total,0) AS SALDO, \
					IFNULL(entradas.recepcao,0) AS RECEPCAO, \
					IFNULL(entradas.limpeza,0) AS LIMPEZA, \
					IFNULL(entradas.secagem,0) AS SECAGEM, \
					IFNULL(entradas.carga,0) AS CARGA \
				FROM Milho milho \
					
					LEFT JOIN ( \
						SELECT id AS id, \
								sum(entAnt.liquido) AS total \
							FROM Milho milhoAnt \
								
							LEFT JOIN ( \
								SELECT fazendaProdutor_id AS idFaz, \
										data AS data, \
										liquido AS liquido \
								FROM Entmilho \
							) entAnt \
							ON entAnt.data <= milhoAnt.dataFaturamento \
							AND entAnt.idFaz = milhoAnt.id \
						GROUP BY id \
					) AS entradasAnterior \
					ON entradasAnterior.id = milho.id \
				
					LEFT JOIN ( \
						SELECT id AS id, \
								sum(saiAnt.liquido) AS total \
							FROM Milho milhoAnt \
								
							LEFT JOIN ( \
								SELECT fazendaProdutor_id AS idFaz, \
										data AS data, \
										liquido AS liquido \
								FROM Saimilho \
							) saiAnt \
							ON saiAnt.data <= milhoAnt.dataFaturamento \
							AND saiAnt.idFaz = milhoAnt.id \
							GROUP BY id \
					) AS saidasAnterior \
					ON saidasAnterior.id = milho.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
								sum(entAtual.recepcao) AS recepcao, \
								sum(entAtual.limpeza) AS limpeza, \
								sum(entAtual.secagem) AS secagem, \
								sum(entAtual.carga) AS carga, \
								sum(entAtual.liquido) AS total \
							FROM Milho milhoAtual \
								
							LEFT JOIN ( \
								SELECT fazendaProdutor_id AS idFaz, \
										data AS data, \
										recepcao AS recepcao, \
										limpeza AS limpeza, \
										secagem AS secagem, \
										carga AS carga, \
										liquido AS liquido \
									FROM Entmilho \
							) entAtual \
							ON entAtual.data > milhoAtual.dataFaturamento \
							AND entAtual.data <= '"$DATA_FINAL"' \
							AND entAtual.idFaz = milhoAtual.id \
							GROUP BY id \
					) AS entradas \
					ON entradas.id = milho.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
								sum(saiAtual.liquido) AS total \
							FROM Milho milhoAtual \
								
							LEFT JOIN ( \
								SELECT fazendaProdutor_id AS idFaz, \
										data AS data, \
										liquido AS liquido \
									FROM Saimilho \
							) saiAtual \
							ON saiAtual.data > milhoAtual.dataFaturamento \
							AND saiAtual.data <= '"$DATA_FINAL"' \
							AND saiAtual.idFaz = milhoAtual.id \
							GROUP BY id \
					) AS saidas \
					ON saidas.id = milho.id \
					
					WHERE (IFNULL(entradasAnterior.total,0) - \
							IFNULL(saidasAnterior.total,0)) + \
							IFNULL(entradas.total,0) + \
							IFNULL(saidas.total,0) != 0"
	
}

mostrar_movimento()
{

	comando_sql "SELECT produtor.nome AS PRODUTOR, \
						produtor.id AS ID_PRODUTOR, \
						fatMilho.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA, \
						IFNULL(fatMilho.saldoAnterior,0) AS ANTERIOR, \
						IFNULL(fatMilho.entradas,0) AS ENTRADAS, \
						IFNULL(fatMilho.saidas,0) AS SAIDAS, \
						IFNULL(fatMilho.saldo,0) AS SALDO, \
						IFNULL(fatMilho.recepcao,0) AS RECEPCAO, \
						IFNULL(fatMilho.limpeza,0) AS LIMPEZA, \
						IFNULL(fatMilho.secagem,0) AS SECAGEM, \
						IFNULL(fatMilho.carga,0) AS CARGA \
					FROM Fatmilho fatMilho \
						INNER JOIN Milho milho \
						ON fatMilho.fazendaProdutor_id = milho.id \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON fatMilho.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE fatMilho.data = milho.dataFaturamento \
								ORDER BY PRODUTOR, FAZENDA"

}

calcular_total()
{
	
	comando_sql "SELECT SUM(fatmilho.QTD) AS QTD, \
						SUM(fatmilho.ENTRADAS) AS ENTRADAS, \
						SUM(fatmilho.SAIDAS) AS SAIDAS, \
						(SUM(fatmilho.SALDO_ATUAL) + SUM(fatmilho.SAIDAS)- SUM(fatmilho.ENTRADAS)) AS SALDO_ANTERIOR, \
						SUM(fatmilho.SALDO_ATUAL) AS SALDO_ATUAL, \
						SUM(ARMAZENAGEM) AS ARMAZENAGEM, \
						SUM(RECEPCAO) AS RECEPCAO, \
						SUM(LIMPEZA) AS LIMPEZA, \
						SUM(SECAGEM) AS SECAGEM, \
						SUM(CARGA) AS CARGA, \
						fatmilho.id AS ID \
	
				FROM ( \
				
					SELECT 	0 AS ID, \
							0 AS QTD, \
							0 AS SALDO_ANTERIOR, \
							0 AS ENTRADAS, \
							0 AS SAIDAS, \
							SUM(saldo) AS SALDO_ATUAL, \
							0 AS ARMAZENAGEM, \
							0 AS RECEPCAO, \
							0 AS LIMPEZA, \
							0 AS SECAGEM, \
							0 AS CARGA \
						FROM Fatmilho fatMilho \
							INNER JOIN Milho milho \
							ON fatMilho.fazendaProdutor_id = milho.id \
							INNER JOIN Empresa empresa \
							ON empresa.id = 1 \
								WHERE fatMilho.data = \
									
					if( \
						DATEDIFF('"$DATA_FINAL"', \
							if( \
								DATEDIFF(milho.dataFaturamento, empresa.dataMilho) > 0, \
								milho.dataFaturamento, empresa.dataMilho \
							) \
						) < 0, \
						
							(SELECT fatMilho.data AS DATA \
								FROM Fatmilho fatMilho \
									WHERE fatMilho.data <= '"$DATA_FINAL"' \
									AND fatMilho.fazendaProdutor_id = fatMilho.fazendaProdutor_id \
										ORDER BY DATA DESC \
										LIMIT 1), \
							if( \
								DATEDIFF(milho.dataFaturamento, empresa.dataMilho) > 0, \
								milho.dataFaturamento, empresa.dataMilho \
							) \
					) \
										
					UNION ALL \
		
					SELECT 	0 AS ID, \
							COUNT(fatMilho.fazendaProdutor_id) AS QTD, \
							0 AS SALDO_ANTERIOR, \
							SUM(fatMilho.entradas) AS ENTRADAS, \
							SUM(fatMilho.saidas) AS SAIDAS, \
							0 AS SALDO_ATUAL, \
							SUM(fatMilho.armazenagem) AS ARMAZENAGEM, \
							SUM(fatMilho.recepcao) AS RECEPCAO, \
							SUM(fatMilho.limpeza) AS LIMPEZA, \
							SUM(fatMilho.secagem) AS SECAGEM, \
							SUM(fatMilho.carga) AS CARGA \
						FROM Fatmilho fatMilho \
							INNER JOIN Milho milho \
							ON fatMilho.fazendaProdutor_id = milho.id \
							WHERE fatMilho.data >= '"$DATA_INICIO"' \
							AND fatMilho.data <= '"$DATA_FINAL"' \
				) AS fatmilho \
				GROUP BY ID"
	
}

mostrar_movimento_teste()
{

comando_sql "SELECT milho.id, \
					'"$DATA_FINAL"', \
					(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0)) AS ANTERIOR, \
					IFNULL(entradas.total,0) AS ENTRADAS, \
					IFNULL(saidas.total,0) AS SAIDAS, \
					(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0))+IFNULL(entradas.total,0)-IFNULL(saidas.total,0) AS SALDO, \
					IFNULL(entradas.recepcao,0) AS RECEPCAO, \
					IFNULL(entradas.limpeza,0) AS LIMPEZA, \
					IFNULL(entradas.secagem,0) AS SECAGEM, \
					IFNULL(entradas.carga,0) AS CARGA \
				FROM Milho milho \

				LEFT JOIN ( \
					SELECT id AS id, \
							sum(entAnt.liquido) AS total \
						FROM Milho milhoAnt \
							
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
									data AS data, \
									liquido AS liquido \
							FROM Entmilho \
						) entAnt \
						ON entAnt.data <= milhoAnt.dataFaturamento \
						AND entAnt.idFaz = milhoAnt.id \
					GROUP BY id \
				) AS entradasAnterior \
				ON entradasAnterior.id = milho.id \

				LEFT JOIN ( \
					SELECT id AS id, \
							sum(saiAnt.liquido) AS total \
						FROM Milho milhoAnt \
							
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
									data AS data, \
									liquido AS liquido \
							FROM Saimilho \
						) saiAnt \
						ON saiAnt.data <= milhoAnt.dataFaturamento \
						AND saiAnt.idFaz = milhoAnt.id \
						GROUP BY id \
				) AS saidasAnterior \
				ON saidasAnterior.id = milho.id \

				LEFT JOIN ( \
					SELECT id AS id, \
							sum(entAtual.recepcao) AS recepcao, \
							sum(entAtual.limpeza) AS limpeza, \
							sum(entAtual.secagem) AS secagem, \
							sum(entAtual.carga) AS carga, \
							sum(entAtual.liquido) AS total \
						FROM Milho milhoAtual \
							
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
									data AS data, \
									recepcao AS recepcao, \
									limpeza AS limpeza, \
									secagem AS secagem, \
									carga AS carga, \
									liquido AS liquido \
								FROM Entmilho \
						) entAtual \
						ON entAtual.data > milhoAtual.dataFaturamento \
						AND entAtual.data <= '"$DATA_FINAL"' \
						AND entAtual.idFaz = milhoAtual.id \
						GROUP BY id \
				) AS entradas \
				ON entradas.id = milho.id \

				LEFT JOIN ( \
					SELECT id AS id, \
							sum(saiAtual.liquido) AS total \
						FROM Milho milhoAtual \
							
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
									data AS data, \
									liquido AS liquido \
								FROM Saimilho \
						) saiAtual \
						ON saiAtual.data > milhoAtual.dataFaturamento \
						AND saiAtual.data <= '"$DATA_FINAL"' \
						AND saiAtual.idFaz = milhoAtual.id \
						GROUP BY id \
				) AS saidas \
				ON saidas.id = milho.id \

				WHERE (IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0))+IFNULL(entradas.total,0)+IFNULL(saidas.total,0) != 0"

}

verificaFaturamento()
{
	
	DATA_FINAL='2016-10-31'
	
	comando_sql "SELECT CASE WHEN COUNT(id) > 0 \
							THEN 'true' \
							ELSE 'false' \
						END AS Verifica \
					FROM Empresa \
						WHERE id = '1' \
						AND dataMilho = '"$DATA_FINAL"'"
	
}

getDataFaturamento()
{
	
	DATA_FINAL='2016-10-31'
	
	comando_sql "SELECT dataMilho AS Data \
					FROM Empresa \
						WHERE id = '1' "
	
}

DATA_INICIO='2017-07-01'
DATA_FINAL='2017-08-18'

case "$1" in
	1)    	
		rodar_movimento
		
		mostrar_movimento
		
		calcular_total
		;; 
	2)
		mostrar_movimento
		;;
	3)
		calcular_total
		;;
	4)
		mostrar_movimento_teste
		;;
	5)
		verificaFaturamento
		getDataFaturamento
		;;
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-teste}"
		exit 1
		;;
esac
