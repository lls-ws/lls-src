package br.net.lls.fatcafe.dao;

import br.net.lls.componentes.Relatorio;
import br.net.lls.cafe.dao.ConsultaSql;

public class FatcafeSql {
	
	private static String nomeTabelaSaldo[] = {"Entcafe","Oscafe","Tracafe"};
	private static String nomeTabelaMovimento[] = {"Entcafe","Oscafe","Tracafe","Saicafe","Tracafe","Servcafe"};
	private static String nomeTabelaAlias[] = {"entradas","servicos","recebidas","saidas","emitidas","servico"};
	
	private static String getConsultaSaldo(Relatorio relatorio, String nomeTabela, int count, int tipoConsulta) {
		
		String nomeTabelaMin = nomeTabela.toLowerCase();
		
		String consulta = "SELECT " + nomeTabelaMin + "." + ConsultaSql.getCondicaoFazenda(count, tipoConsulta) + " AS idFaz, " +
								 "SUM(lote.saldoSacas) AS total " +
								 
									"FROM Lote lote " +
										
									"INNER JOIN " + nomeTabela + "_Lote " + nomeTabelaMin + "_Lote " +
									"ON " + nomeTabelaMin + "_Lote.lote_id = lote.id " +
									
									"INNER JOIN " + nomeTabela + " " + nomeTabelaMin + " " +
									"ON " + nomeTabelaMin + "_Lote." + nomeTabelaMin + "_id = " + nomeTabelaMin + ".id " +
									"AND " + nomeTabelaMin + "." + ConsultaSql.getCondicaoStatus(count, tipoConsulta) + " " +
									
									"WHERE lote.saldoSacas > 0 " +
										"GROUP BY idFaz ";
		
		return consulta;
		
	}
	
	private static String getConsultaMovimento(Relatorio relatorio, String nomeTabela, int count, int tipoConsulta) {
		
		String nomeTabelaMin = nomeTabela.toLowerCase();
		
		String condicaoSacas = "sacas AS sacas ";
		String condicaoSacasTotal = "SUM(" + nomeTabelaAlias[count] + nomeTabela + ".sacas) AS total ";
		
		String condicaoMovimento = "WHERE " + ConsultaSql.getCondicaoStatus(count, tipoConsulta) + " ";
		
		if (count == 1) {
			
			condicaoSacas = "sacasQuebra AS quebras, " +
							"sacasAcrescimo AS acrescimos ";
							
			condicaoSacasTotal = "SUM(" + nomeTabelaAlias[count] + nomeTabela + ".quebras) AS quebras, " +
								 "SUM(" + nomeTabelaAlias[count] + nomeTabela + ".acrescimos) AS acrescimos ";
			
		}
		
		if (count == 5) {
			
			condicaoSacas = "valor AS valor ";
							
			condicaoSacasTotal = "SUM(" + nomeTabelaAlias[count] + nomeTabela + ".valor) AS total ";
			
			condicaoMovimento = "WHERE preco_id NOT IN (16) AND pago = 'N' ";
			
		}
		
		String consulta = "SELECT id AS id, " +
								  condicaoSacasTotal +
										
								"FROM Cafe cafeAtual " +
						
								"LEFT JOIN ( " +
									"SELECT " + ConsultaSql.getCondicaoFazenda(count, tipoConsulta) + " AS idFaz, " +
										   "data AS data, " +
										   condicaoSacas +
										"FROM " + nomeTabela + " " +
											condicaoMovimento +
								") AS " + nomeTabelaAlias[count] + nomeTabela + " " +
								"ON " + nomeTabelaAlias[count] + nomeTabela + ".idFaz = cafeAtual.id " +
								"AND " + nomeTabelaAlias[count] + nomeTabela + ".data > cafeAtual.dataFaturamento " +
								"AND " + nomeTabelaAlias[count] + nomeTabela + ".data <= :dataFinal " +
									"GROUP BY id ";
		
		return consulta;
		
	}
	
	private static String criarConsulta(Relatorio relatorio, String consulta) {
		
		for( int i = 0; i < nomeTabelaSaldo.length; i++) {
			
			String nomeTabelaMin = nomeTabelaSaldo[i].toLowerCase();
			
			String consultaSaldo = getConsultaSaldo(relatorio, nomeTabelaSaldo[i], i, 0);
			
			consulta += "LEFT JOIN (" + consultaSaldo + ") AS lote" + nomeTabelaSaldo[i] + " " +
						"ON lote" + nomeTabelaSaldo[i] + ".idFaz = cafe.id ";
			
		}
		
		for( int i = 0; i < nomeTabelaMovimento.length; i++) {
			
			String consultaMovimento = getConsultaMovimento(relatorio, nomeTabelaMovimento[i], i, 0);
			
			consulta += "LEFT JOIN (" + consultaMovimento + ") AS " + nomeTabelaAlias[i] + " " +
						"ON " + nomeTabelaAlias[i] + ".id = cafe.id ";
			
		}
		
		consulta+="WHERE (cafe.dataFaturamento = empresa.dataCafe OR cafe.dataFaturamento < :dataFinal) ";
		consulta+="HAVING (ANTERIOR + ENTRADAS + SAIDAS + QUEBRAS + ACRESCIMOS + RECEBIDAS + EMITIDAS + SERVICOS) > 0 ";
		
		return consulta;
		
	}
	
	public static String getConsulta(Relatorio relatorio) {
		
		String consulta = "INSERT INTO Fatcafe (fazendaProdutor_id, data, saldoAnterior, entradas, saidas, " +
								  "quebras, acrescimos, recebidas, emitidas, saldo, servicos) " +
								  
			 "SELECT cafe.id, " +
					":dataFinal, " +
					"IFNULL(lote" + nomeTabelaSaldo[0] + ".total, 0) + IFNULL(lote" + nomeTabelaSaldo[1] + ".total, 0) + IFNULL(lote" + nomeTabelaSaldo[2] + ".total, 0) - " +
					"IFNULL(" + nomeTabelaAlias[0] + ".total,0) - IFNULL(" + nomeTabelaAlias[2] + ".total,0) - IFNULL(" + nomeTabelaAlias[1] + ".acrescimos,0) + " +
					"IFNULL(" + nomeTabelaAlias[3] + ".total,0) + IFNULL(" + nomeTabelaAlias[1] + ".quebras,0) + IFNULL(" + nomeTabelaAlias[4] + ".total,0) AS ANTERIOR, " +
					"IFNULL(" + nomeTabelaAlias[0] + ".total,0) AS ENTRADAS, " +
					"IFNULL(" + nomeTabelaAlias[3] + ".total,0) AS SAIDAS, " +
					"IFNULL(" + nomeTabelaAlias[1] + ".quebras,0) AS QUEBRAS, " +
					"IFNULL(" + nomeTabelaAlias[1] + ".acrescimos,0) AS ACRESCIMOS, " +
					"IFNULL(" + nomeTabelaAlias[2] + ".total,0) AS RECEBIDAS, " +
					"IFNULL(" + nomeTabelaAlias[4] + ".total,0) AS EMITIDAS, " +
					"IFNULL(lote" + nomeTabelaSaldo[0] + ".total, 0) + IFNULL(lote" + nomeTabelaSaldo[1] + ".total, 0) + IFNULL(lote" + nomeTabelaSaldo[2] + ".total, 0) AS SALDO, " +
					"IFNULL(" + nomeTabelaAlias[5] + ".total,0) AS SERVICOS " +
					
				"FROM Cafe cafe " +
					
					"INNER JOIN Empresa empresa " +
					"ON empresa.id = 1 ";
										
		return criarConsulta(relatorio, consulta);
		
	}
	
	public static String getConsultaCafe(Relatorio relatorio, String nomeTabela, int count) {
		
		String consulta = "INSERT INTO Cafe (id, dataFaturamento) " +
		
							 "SELECT fazendaProdutor.id AS id, " +
									"empresa.dataCafe AS data " +
										
								"FROM FazendaProdutor fazendaProdutor " +
								
									"INNER JOIN Empresa empresa " +
									"ON empresa.id = 1 " +
								
									"LEFT JOIN ( " +
										"SELECT " + ConsultaSql.getCondicaoFazenda(count, 0) + " AS idFaz, " +
											   "data AS data, " +
											   "sacas AS sacas " +
											"FROM " + nomeTabela + " " +
												"WHERE " + ConsultaSql.getCondicaoStatus(count, 0) + " " +
									") AS cafe " +
									"ON cafe.idFaz = fazendaProdutor.id " +
									"AND cafe.data >= :dataInicial " +
									"AND cafe.data <= :dataFinal " +
									
									"WHERE cafe.sacas > 0 " +
										"GROUP BY id " +
							
							"ON DUPLICATE KEY UPDATE dataFaturamento = dataFaturamento ";
										
		return consulta;
		
	}
	
	public static String getConsultaArmazenagem() {
		
		String consulta = "UPDATE Fatcafe fatCafe, ( " +
				
							"SELECT id AS ID, " +
								   "TRUNCATE(SUM(arma.valor), 2) AS VALOR " +
								"FROM ( " +
									
									"SELECT fatCafe.fazendaProdutor_id AS ID, " +
											"@dias\\:= 0 AS DIAS, " +
											"fatCafe.saldoAnterior AS ANTERIOR, " +
											"@preco\\:= preco.valor AS PRECO, " +
											"@valor\\:= 0 AS VALOR, " +
											"@data\\:= cafe.dataFaturamento AS DATA, " +
											"@entrada\\:= 0 AS ENTRADA, " +
											"@saida\\:= 0 AS SAIDA, " +
											"@saldo\\:= fatCafe.saldoAnterior AS SALDO " +
										"FROM Fatcafe fatCafe " +
										"INNER JOIN Cafe cafe " +
										"ON fatCafe.fazendaProdutor_id = cafe.id " +
										"INNER JOIN Preco preco " +
										"ON preco.id = 16 " +
										"AND fatCafe.data = :dataFinal " +
										"AND fatCafe.fazendaProdutor_id = :idFazenda " +
									 
									"UNION ALL " +
									 
									getConsultaArmazenagemMovimento() +
									 
									 "UNION ALL " +
									 
									 "SELECT fatCafe.fazendaProdutor_id AS ID, " +
											"@dias\\:= DATEDIFF(fatCafe.data, @data) AS DIAS, " +
											"@saldo AS ANTERIOR, " +
											"@preco AS PRECO, " +
											"@valor\\:= (@saldo*@dias*@preco/30) AS VALOR, " +
											"@data\\:= fatCafe.data AS DATA, " +
											"@entrada\\:= 0 AS ENTRADA, " +
											"@saida\\:= 0 AS SAIDA, " +
											"@saldo\\:= @saldo + @entrada - @saida AS SALDO " +
										"FROM Fatcafe fatCafe " +
										"WHERE fatCafe.data = :dataFinal " +
										"AND fatCafe.fazendaProdutor_id = :idFazenda " +
									
								") arma " +
							
							") armazenagem " +
							"SET fatCafe.armazenagem = armazenagem.valor, " +
								"fatCafe.total = fatCafe.servicos + armazenagem.valor " +
							
							"WHERE fatCafe.data = :dataFinal " +
							"AND fatCafe.fazendaProdutor_id = armazenagem.id " +
							"AND armazenagem.valor > 0 " +
							"AND fatCafe.fazendaProdutor_id = :idFazenda";
										
		return consulta;
		
	}
	
	private static String getConsultaArmazenagemMovimento() {
		
		String consulta = "SELECT movimento.id AS ID, " +
								 "@dias\\:= DATEDIFF(movimento.data, @data) AS DIAS, " +
								 "@saldo AS ANTERIOR, " +
								 "@preco AS PRECO, " +
								 "( " +
									"CASE " +
										"WHEN @saldo > 0 THEN @valor\\:= (@saldo*@dias*@preco/30) " +
										"ELSE @valor\\:= 0 " +
									"END " +
								 ") AS VALOR, " +
								 "@data\\:= movimento.data AS DATA, " +
								 "@entrada\\:= IFNULL(movimento.entradas, 0) AS ENTRADA, " +
								 "@saida\\:= IFNULL(movimento.saidas, 0) AS SAIDA, " +
								 "@saldo\\:= @saldo + @entrada - @saida AS SALDO " +
							 "FROM ( " +
								
								"SELECT movi.id AS ID, " +
										"movi.data AS DATA, " +
										"SUM(movi.entradas) AS ENTRADAS, " +
										"SUM(movi.saidas) AS SAIDAS " +
										
									 "FROM ( ";
		
		String nomeTabelaArmazenagem[] = {"Entcafe","Oscafe","Tracafe","Saicafe","Oscafe","Tracafe"};
		
		for( int i = 0; i < nomeTabelaArmazenagem.length; i++) {
			
			String nomeTabelaMin = nomeTabelaArmazenagem[i].toLowerCase();
			
			String condicaoSacas = "";
			
			if (i < 3) {
			
				if (i == 1) condicaoSacas = "SUM(sacasAcrescimo) AS ENTRADAS, ";
				else condicaoSacas = "SUM(sacas) AS ENTRADAS, ";
				
				condicaoSacas += "0 AS SAIDAS ";
				
			}
			else {
				
				condicaoSacas = "0 AS ENTRADAS, ";
				
				if (i == 4) condicaoSacas += "SUM(sacasQuebra) AS SAIDAS ";
				else condicaoSacas += "SUM(sacas) AS SAIDAS ";
				
			}
			
			if (i > 0) consulta += "UNION ALL ";
			
			consulta += "SELECT " + ConsultaSql.getCondicaoFazenda(i, 0) + " AS ID, " +
								"data AS DATA, " +
								condicaoSacas +
							 "FROM " + nomeTabelaArmazenagem[i] + " " +
								"INNER JOIN Cafe cafe " +
								"ON " + ConsultaSql.getCondicaoFazenda(i, 0) + " = cafe.id " +
								"AND data > cafe.dataFaturamento " +
								"AND data <= :dataFinal " +
								"AND " + ConsultaSql.getCondicaoFazenda(i, 0) + " = :idFazenda " +
									"GROUP BY DATA ";
													
		}
		
		consulta += ") movi " +
						"GROUP BY DATA " +
				") movimento ";
		
		return consulta;
		
	}
	
}
