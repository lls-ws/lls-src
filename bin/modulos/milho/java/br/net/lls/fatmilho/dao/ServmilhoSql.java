package br.net.lls.fatmilho.dao;

import br.net.lls.fatmilho.dao.BaixamilhoSql;

public class ServmilhoSql {
	
	public static String getConsultaServico() {
		
		return "LEFT JOIN ( " +
								
					"SELECT servMilho.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago() +
							"WHERE servMilho.preco_id = 20 " +
							"AND servMilho.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") armazenagem " +
				"ON armazenagem.IDFAZ = milho.id " +
				
				"LEFT JOIN ( " +
						
					"SELECT servMilho.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago() +
							"WHERE servMilho.preco_id = 21 " +
							"AND servMilho.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") limpeza " +
				"ON limpeza.IDFAZ = milho.id " +
				
				"LEFT JOIN ( " +
						
					"SELECT servMilho.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago() +
							"WHERE servMilho.preco_id = 22 " +
							"AND servMilho.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") secagem " +
				"ON secagem.IDFAZ = milho.id " +
				
				"LEFT JOIN ( " +
						
					"SELECT servMilho.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago() +
							"WHERE servMilho.preco_id = 23 " +
							"AND servMilho.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") recepcao " +
				"ON recepcao.IDFAZ = milho.id " +
				
				"LEFT JOIN ( " +
						
					"SELECT servMilho.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago() +
							"WHERE servMilho.preco_id = 24 " +
							"AND servMilho.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") carga " +
				"ON carga.IDFAZ = milho.id ";
		
	}
	
	public static String getConsultaServicoFaturar() {
		
		return "LEFT JOIN ( " +
								
					"SELECT entMilho.fazendaProdutor_id AS IDFAZ, " +
							"entMilho.data AS DATA, " +
							"0 AS ARMAZENAGEM, " +
							"SUM(IFNULL(entMilho.limpeza,0)) AS LIMPEZA, " +
							"SUM(IFNULL(entMilho.secagem,0)) AS SECAGEM, " +
							"SUM(IFNULL(entMilho.carga,0)) AS CARGA, " +
							"SUM(IFNULL(entMilho.recepcao,0)) AS RECEPCAO, " +
							"SUM(IFNULL(entMilho.total,0)) AS TOTAL " +
						"FROM Entmilho entMilho " +
							"INNER JOIN Milho milho " +
							"ON milho.id = entMilho.fazendaProdutor_id " +
							"WHERE entMilho.data > milho.dataFaturamento " +
								"GROUP BY IDFAZ " +
					
				") entradas " +
				"ON entradas.IDFAZ = milho.id ";
				
	}

	public static String getConsultaSintetizado(int tipo) {
		
		String consulta = "";
		
		switch (tipo) {
			
			case 0:
				consulta = "SELECT fazendaProdutor.id AS ID, " +
								 "IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, " +
								 "IFNULL(recepcao.TOTAL,0) AS RECEPCAO, " +
								 "IFNULL(limpeza.TOTAL,0) AS LIMPEZA, " +
								 "IFNULL(secagem.TOTAL,0) AS SECAGEM, " +
								 "IFNULL(carga.TOTAL,0) AS CARGA, " +
									
								"(IFNULL(armazenagem.TOTAL,0) + " +
								" IFNULL(limpeza.TOTAL,0) + " +
								" IFNULL(secagem.TOTAL,0) + " +
								" IFNULL(carga.TOTAL,0) + " +
								" IFNULL(recepcao.TOTAL,0)) AS TOTAL ";
									
				break;
			case 1:
				consulta = "SELECT fazendaProdutor.id AS ID, " +
								"IFNULL(entradas.armazenagem,0) AS ARMAZENAGEM, " +
								"IFNULL(entradas.recepcao,0) AS RECEPCAO, " +
								"IFNULL(entradas.limpeza,0) AS LIMPEZA, " +
								"IFNULL(entradas.secagem,0) AS SECAGEM, " +
								"IFNULL(entradas.carga,0) AS CARGA, " +
								"IFNULL(entradas.total,0) AS TOTAL ";
									
				break;
			case 2:
				consulta = "SELECT fazendaProdutor.id AS ID, " +
								"IFNULL(armazenagem.TOTAL,0) + IFNULL(entradas.armazenagem,0) AS ARMAZENAGEM, " +
								"IFNULL(recepcao.TOTAL,0) + IFNULL(entradas.recepcao,0) AS RECEPCAO, " +
								"IFNULL(limpeza.TOTAL,0) + IFNULL(entradas.limpeza,0) AS LIMPEZA, " +
								"IFNULL(secagem.TOTAL,0) + IFNULL(entradas.secagem,0) AS SECAGEM, " +
								"IFNULL(carga.TOTAL,0) + IFNULL(entradas.carga,0) AS CARGA, " +
									
								"(IFNULL(armazenagem.TOTAL,0) + " +
								" IFNULL(limpeza.TOTAL,0) + " +
								" IFNULL(secagem.TOTAL,0) + " +
								" IFNULL(carga.TOTAL,0) + " +
								" IFNULL(recepcao.TOTAL,0)) + IFNULL(entradas.total,0) AS TOTAL ";
									
				break;
		
		}
		
		return consulta;
		
	}

	public static String getTipoConsulta(int tipo) {
		
		String consulta = "";
		
		switch (tipo) {
			
			case 0:
				consulta = "WHERE servMilho.pago = 'N' ";
				break;
			case 1:
				consulta = "WHERE servMilho.pago = 'Y' ";
				break;
		
		}
		
		return consulta;
		
	}

}
