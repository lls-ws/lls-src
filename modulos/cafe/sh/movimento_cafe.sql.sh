#!/bin/bash
# Script para calcular e mostrar o movimento de cafe
#
# email: lls.homeoffice@gmail.com

NOME_PROJETO="cafe"

# Caminho da biblioteca
PATH=.:$(dirname $0):/home/projetos/lls/sh:$PATH
. lib_config.sh		|| exit 1

rodar_movimento()
{

	ID_FAZENDA="$1"

	CONDICAO_FAZENDA=""

	if [ -n "${ID_FAZENDA}" ]; then
	
		CONDICAO_FAZENDA="AND cafe.id = ${ID_FAZENDA}"
	
	fi

	comando_sql "DELETE FROM Fatcafe WHERE data = '"$DATA_FINAL"'"

	comando_sql "INSERT INTO Fatcafe (fazendaProdutor_id, data, saldoAnterior, entradas, saidas, \
								  quebras, acrescimos, recebidas, emitidas, saldo, servicos) \
			 SELECT cafe.id, \
					'"$DATA_FINAL"', \
					IFNULL(loteEntrada.total, 0) + IFNULL(loteServico.total, 0) + IFNULL(loteTransferencia.total, 0) - \
					IFNULL(entradas.total,0) - IFNULL(transRecebidas.total,0) - IFNULL(servicos.acrescimos,0) + \
					IFNULL(saidas.total,0) + IFNULL(servicos.quebras,0) + IFNULL(transEmitidas.total,0) AS ANTERIOR, \
					IFNULL(entradas.total,0) AS ENTRADAS, \
					IFNULL(saidas.total,0) AS SAIDAS, \
					IFNULL(servicos.quebras,0) AS QUEBRAS, \
					IFNULL(servicos.acrescimos,0) AS ACRESCIMOS, \
					IFNULL(transRecebidas.total,0) AS RECEBIDAS, \
					IFNULL(transEmitidas.total,0) AS EMITIDAS, \
					IFNULL(loteEntrada.total, 0) + IFNULL(loteServico.total, 0) + IFNULL(loteTransferencia.total, 0) AS SALDO, \
					IFNULL(servico.total,0) AS SERVICOS \
					
				FROM Cafe cafe \
					
					INNER JOIN Empresa empresa \
					ON empresa.id = 1 \
					
					LEFT JOIN ( \
						
						SELECT entcafe.fazendaProdutor_id AS idFaz, \
							   SUM(lote.saldoSacas) AS total \
							
							FROM Lote lote \
								
								INNER JOIN Entcafe_Lote entcafe_Lote \
								ON entcafe_Lote.lote_id = lote.id \
								
								INNER JOIN Entcafe entcafe \
								ON entcafe.id = entcafe_Lote.entcafe_id \
								AND entcafe.fechado = 'Y' \
								
								WHERE lote.saldoSacas > 0 \
									GROUP BY idFaz \
									
					) AS loteEntrada \
					ON loteEntrada.idFaz = cafe.id \
					
					LEFT JOIN ( \
							
						SELECT oscafe.fazendaProdutor_id AS idFaz, \
							   SUM(lote.saldoSacas) AS total \
							
							FROM Lote lote \
								
								INNER JOIN Oscafe_Lote oscafe_Lote \
								ON oscafe_Lote.lote_id = lote.id \
								
								INNER JOIN Oscafe oscafe \
								ON oscafe.id = oscafe_Lote.oscafe_id \
								AND oscafe.status = 'FECHADA' \
								
								WHERE lote.saldoSacas > 0 \
									GROUP BY idFaz \
										
					) AS loteServico \
					ON loteServico.idFaz = cafe.id \
						
					LEFT JOIN ( \
						
							SELECT tracafe.fazendaDestino_id AS idFaz, \
								   SUM(lote.saldoSacas) AS total \
					
								FROM Lote lote \
									
									INNER JOIN Tracafe_Lote tracafe_Lote \
									ON tracafe_Lote.lote_id = lote.id \
									
									INNER JOIN Tracafe tracafe \
									ON tracafe.id = tracafe_Lote.tracafe_id \
									AND tracafe.status = 'FECHADA' \
									
									WHERE lote.saldoSacas > 0 \
										GROUP BY idFaz \
										
					) AS loteTransferencia \
					ON loteTransferencia.idFaz = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(ent.sacas) AS total \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
								   data AS data, \
								   sacas AS sacas \
								FROM Entcafe \
									WHERE fechado = 'Y' \
						) AS ent \
						ON ent.idFaz = cafeAtual.id \
						AND ent.data > cafeAtual.dataFaturamento \
						AND ent.data <= '"$DATA_FINAL"' 
							GROUP BY id \
					) AS entradas \
					ON entradas.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(sai.sacas) AS total \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
								   data AS data, \
								   sacas AS sacas \
								FROM Saicafe \
									WHERE status = 'FECHADA' \
						) AS sai \
						ON sai.idFaz = cafeAtual.id \
						AND sai.data > cafeAtual.dataFaturamento \
						AND sai.data <= '"$DATA_FINAL"' \
							GROUP BY id \
					) AS saidas \
					ON saidas.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(serv.quebras) AS quebras, \
							   SUM(serv.acrescimos) AS acrescimos \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
								   data AS data, \
								   sacasQuebra AS quebras, \
								   sacasAcrescimo AS acrescimos \
								FROM Oscafe \
									WHERE status = 'FECHADA' \
						) AS serv \
						ON serv.idFaz = cafeAtual.id \
						AND serv.data > cafeAtual.dataFaturamento \
						AND serv.data <= '"$DATA_FINAL"' \
							GROUP BY id \
					) AS servicos \
					ON servicos.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(traRec.sacas) AS total \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT fazendaDestino_id AS idFaz, \
								   data AS data, \
								   sacas AS sacas \
								FROM Tracafe \
									WHERE status = 'FECHADA' \
						) AS traRec \
						ON traRec.idFaz = cafeAtual.id \
						AND traRec.data > cafeAtual.dataFaturamento \
						AND traRec.data <= '"$DATA_FINAL"' \
							GROUP BY id \
					) AS transRecebidas \
					ON transRecebidas.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(traEmit.sacas) AS total \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT fazendaProdutor_id AS idFaz, \
								   data AS data, \
								   sacas AS sacas \
								FROM Tracafe \
									WHERE status = 'FECHADA' \
						) AS traEmit \
						ON traEmit.idFaz = cafeAtual.id \
						AND traEmit.data > cafeAtual.dataFaturamento \
						AND traEmit.data <= '"$DATA_FINAL"' \
							GROUP BY id \
					) AS transEmitidas \
					ON transEmitidas.id = cafe.id \
					
					LEFT JOIN ( \
						SELECT id AS id, \
							   SUM(ser.valor) AS total \
							FROM Cafe cafeAtual \
					
						LEFT JOIN ( \
							SELECT 	fazendaProdutor_id AS idFaz, \
									data AS data, \
									valor AS valor \
								FROM Servcafe \
									WHERE preco_id NOT IN (16) \
									AND pago = 'N' \
						) AS ser \
						ON ser.idFaz = cafeAtual.id \
						AND ser.data > cafeAtual.dataFaturamento \
						AND ser.data <= '"$DATA_FINAL"' \
							GROUP BY id \
					) AS servico \
					ON servico.id = cafe.id \
					
					WHERE (cafe.dataFaturamento = empresa.dataMilho OR cafe.dataFaturamento < '"$DATA_FINAL"') \
					HAVING (ANTERIOR + ENTRADAS + SAIDAS + QUEBRAS + ACRESCIMOS + RECEBIDAS + EMITIDAS + SERVICOS) > 0 \
					${CONDICAO_FAZENDA} "
					
}

mostrar_movimento()
{

	comando_sql "SELECT IFNULL(fatCafe.saldoAnterior,0) AS ANTERIOR, \
						IFNULL(fatCafe.entradas,0) AS ENTRADAS, \
						IFNULL(fatCafe.saidas,0) AS SAIDAS, \
						IFNULL(fatCafe.quebras,0) AS QUEBRAS, \
						IFNULL(fatCafe.acrescimos,0) AS ACRESCIMOS, \
						IFNULL(fatCafe.recebidas,0) AS RECEBIDAS, \
						IFNULL(fatCafe.emitidas,0) AS EMITIDAS, \
						IFNULL(fatCafe.saldo,0) AS SALDO, \
						produtor.id AS ID_PRODUTOR, \
						produtor.nome AS PRODUTOR, \
						fatCafe.fazendaProdutor_id AS ID_FAZENDA, \
						fazendaProdutor.nome AS FAZENDA \
					FROM Fatcafe fatCafe \
						INNER JOIN FazendaProdutor fazendaProdutor \
						ON fatCafe.fazendaProdutor_id = fazendaProdutor.id \
						INNER JOIN Produtor produtor \
						ON fazendaProdutor.produtor_id = produtor.id \
							WHERE fatCafe.data = '"$DATA_FINAL"' \
								ORDER BY PRODUTOR, FAZENDA"

}

calcular_total()
{
	
	comando_sql "SELECT SUM(fatcafe.QTD) AS QTD, \
						
						CASE WHEN (SUM(fatcafe.SALDO_ATUAL) + SUM(fatcafe.SAIDAS) - SUM(fatcafe.ENTRADAS) + \
								   SUM(fatcafe.QUEBRAS) - SUM(fatcafe.ACRESCIMOS) - SUM(fatcafe.RECEBIDAS) + SUM(fatcafe.EMITIDAS) < 0) \
							 THEN ((SUM(fatcafe.SALDO_ATUAL) + SUM(fatcafe.SAIDAS) - SUM(fatcafe.ENTRADAS)) +
									SUM(fatcafe.QUEBRAS) - SUM(fatcafe.ACRESCIMOS) - SUM(fatcafe.RECEBIDAS) + SUM(fatcafe.EMITIDAS) * -1) \
							 ELSE SUM(fatcafe.SALDO_ATUAL) + SUM(fatcafe.SAIDAS) - SUM(fatcafe.ENTRADAS) + \
								  SUM(fatcafe.QUEBRAS) - SUM(fatcafe.ACRESCIMOS) - SUM(fatcafe.RECEBIDAS) + SUM(fatcafe.EMITIDAS) \
							 END AS SALDO_ANTERIOR, \
						
						SUM(fatcafe.ENTRADAS) AS ENTRADAS, \
						SUM(fatcafe.SAIDAS) AS SAIDAS, \
						SUM(fatcafe.QUEBRAS) AS QUEBRAS, \
						SUM(fatcafe.ACRESCIMOS) AS ACRESCIMOS, \
						SUM(fatcafe.RECEBIDAS) AS RECEBIDAS, \
						SUM(fatcafe.EMITIDAS) AS EMITIDAS, \
						SUM(fatcafe.SALDO_ATUAL) AS SALDO_ATUAL, \
						SUM(ARMAZENAGEM) AS ARMAZENAGEM, \
						fatcafe.id AS ID \
	
				FROM ( \
				
					SELECT 	0 AS ID, \
							0 AS QTD, \
							0 AS SALDO_ANTERIOR, \
							0 AS ENTRADAS, \
							0 AS SAIDAS, \
							0 AS QUEBRAS, \
							0 AS ACRESCIMOS, \
							0 AS RECEBIDAS, \
							0 AS EMITIDAS, \
							SUM(saldo) AS SALDO_ATUAL, \
							0 AS ARMAZENAGEM \
						FROM Fatcafe fatCafe \
							INNER JOIN Cafe cafe \
							ON fatCafe.fazendaProdutor_id = cafe.id \
							INNER JOIN Empresa empresa \
							ON empresa.id = 1 \
								WHERE fatCafe.data = \
									
					if( \
						DATEDIFF('"$DATA_FINAL"', \
							if( \
								DATEDIFF(cafe.dataFaturamento, empresa.dataCafe) > 0, \
								cafe.dataFaturamento, empresa.dataCafe \
							) \
						) > 0, \
						
							(SELECT fatCafe.data AS DATA \
								FROM Fatcafe fatcafe \
									WHERE fatcafe.data <= '"$DATA_FINAL"' \
									AND fatcafe.fazendaProdutor_id = fatCafe.fazendaProdutor_id \
										ORDER BY DATA DESC \
										LIMIT 1), \
							if( \
								DATEDIFF(cafe.dataFaturamento, empresa.dataCafe) > 0, \
								cafe.dataFaturamento, empresa.dataCafe \
							) \
					) \
										
					UNION ALL \
		
					SELECT 	0 AS ID, \
							COUNT(fatCafe.fazendaProdutor_id) AS QTD, \
							0 AS SALDO_ANTERIOR, \
							SUM(fatCafe.entradas) AS ENTRADAS, \
							SUM(fatCafe.saidas) AS SAIDAS, \
							SUM(fatCafe.quebras) AS QUEBRAS, \
							SUM(fatCafe.acrescimos) AS ACRESCIMOS, \
							SUM(fatCafe.recebidas) AS RECEBIDAS, \
							SUM(fatCafe.emitidas) AS EMITIDAS, \
							0 AS SALDO_ATUAL, \
							SUM(fatCafe.armazenagem) AS ARMAZENAGEM \
						FROM Fatcafe fatCafe \
							INNER JOIN Cafe cafe \
							ON fatCafe.fazendaProdutor_id = cafe.id \
							WHERE fatCafe.data >= '"$DATA_INICIO"' \
							AND fatCafe.data <= '"$DATA_FINAL"' \
				) AS fatcafe \
					GROUP BY ID"
	
}

atualiza_cafe()
{

	TABELAS=(
		"Entcafe"
		"Oscafe"
		"Tracafe"
		"Saicafe"
	)

	COUNT=0
	
	for NOME_TABELA in "${TABELAS[@]}"
	do
	
		if [ ${COUNT} -eq 0 ]; then
		
			CONDICAO_STATUS="fechado = 'Y'"
		
		else
		
			CONDICAO_STATUS="status = 'FECHADA'"
		
		fi
	
		${CMD_BASE} -e "INSERT INTO Cafe (id, dataFaturamento) \
		
					 SELECT fazendaProdutor.id AS id, \
							empresa.dataCafe AS data \
								
						FROM FazendaProdutor fazendaProdutor \
						
							INNER JOIN Empresa empresa \
							ON empresa.id = 1 \
						
							LEFT JOIN ( \
								SELECT fazendaProdutor_id AS idFaz, \
									   data AS data, \
									   sacas AS sacas \
									FROM ${NOME_TABELA} \
										WHERE ${CONDICAO_STATUS} \
							) AS cafe \
							ON cafe.idFaz = fazendaProdutor.id \
							AND cafe.data >= '"$DATA_INICIO"' \
							AND cafe.data <= '"$DATA_FINAL"' \
							
							WHERE cafe.sacas > 0 \
								GROUP BY id
					
					ON DUPLICATE KEY UPDATE dataFaturamento = dataFaturamento "
					
		let COUNT++

	done
		
	${CMD_BASE} -e "SELECT COUNT(cafe.id) AS Qtd_Movimento \
					FROM Cafe cafe \
					
						INNER JOIN Empresa empresa \
						ON empresa.id = 1 \
						
						WHERE cafe.dataFaturamento = empresa.dataCafe"
	
}

verificaFaturamento()
{
	
	DATA_FINAL='2018-08-31'
	
	comando_sql "SELECT CASE WHEN COUNT(id) > 0 \
							THEN 'true' \
							ELSE 'false' \
						END AS Verifica \
					FROM Empresa \
						WHERE id = '1' \
						AND dataCafe = '"$DATA_FINAL"'"
	
}

getDataFaturamento()
{
	
	comando_sql "SELECT dataCafe AS Data \
					FROM Empresa \
						WHERE id = '1' "
	
}

limpa_faturamento()
{
	
	#comando_sql "DELETE FROM Fatcafe WHERE data = '"$DATA_FINAL"'"
	#comando_sql "DELETE FROM Servcafe WHERE pago = 'N' AND automatico = 'Y' AND data = '"$DATA_FINAL"'"
	
	comando_sql "TRUNCATE Fatcafe"
	comando_sql "DELETE FROM Servcafe WHERE pago = 'N' AND automatico = 'Y' AND preco_id = 16 and data > '"$DATA_INICIO"'"
	
	sh sh/armazenagem_cafe.sql.sh "5" "2018-07-31"
	
}

DATA_INICIO='2018-09-01'
DATA_FINAL='2018-09-30'

comando_sql

case "$1" in
	1)  
		sh sh/armazenagem_cafe.sql.sh "5" "2018-07-31"
		
		atualiza_cafe
		sh sh/servico_cafe.sql.sh "4"
		
		rodar_movimento
		
		#DATA_FINAL='2018-08-29'
		#rodar_movimento "885"
		
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
		atualiza_cafe
		;;
	5)
		verificaFaturamento
		getDataFaturamento
		;;
	6)
		limpa_faturamento
		;;
	*)
		echo "Use: $0 {1-rodar|2-mostrar|3-total|4-atualiza|5-verifica|6-limpa}"
		exit 1
		;;
esac
