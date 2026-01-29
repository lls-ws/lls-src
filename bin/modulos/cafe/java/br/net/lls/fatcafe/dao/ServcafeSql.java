package br.net.lls.fatcafe.dao;

import br.net.lls.fatcafe.dao.BaixacafeSql;

public class ServcafeSql {
	
	public static String getConsultaServico() {
		
		return "LEFT JOIN ( " +
								
					"SELECT servCafe.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servcafe servCafe " +
							BaixacafeSql.getConsultaTotalPago() +
							"WHERE servCafe.preco_id = 16 " +
							"AND servCafe.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") armazenagem " +
				"ON armazenagem.IDFAZ = cafe.id " +
				
				"LEFT JOIN ( " +
						
					"SELECT servCafe.fazendaProdutor_id AS IDFAZ, " +
							"SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servcafe servCafe " +
							"INNER JOIN Cafe cafe " +
							"ON cafe.id = servCafe.fazendaProdutor_id " +
							BaixacafeSql.getConsultaTotalPago() +
							"WHERE servCafe.preco_id NOT IN (16) " +
							"AND servCafe.pago = 'N' " +
							"AND servCafe.data <= cafe.dataFaturamento " +
								"GROUP BY IDFAZ " +
					
				") servico " +
				"ON servico.IDFAZ = cafe.id ";
		
	}
	
	public static String getConsultaServicoFaturar() {
		
		return "LEFT JOIN ( " +
								
					"SELECT servCafe.fazendaProdutor_id AS IDFAZ, " +
						   "0 AS ARMAZENAGEM, " +
						   "SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS TOTAL " +
						"FROM Servcafe servCafe " +
							"INNER JOIN Cafe cafe " +
							"ON cafe.id = servCafe.fazendaProdutor_id " +
							BaixacafeSql.getConsultaTotalPago() +
							"WHERE servCafe.data > cafe.dataFaturamento " +
							"AND servCafe.pago = 'N' " +
								"GROUP BY IDFAZ " +
					
				") servicos " +
				"ON servicos.IDFAZ = cafe.id ";
				
	}

	public static String getConsultaSintetizado(int tipo) {
		
		String consulta = "";
		
		switch (tipo) {
			
			case 0:
				consulta = "SELECT fazendaProdutor.id AS ID, " +
								  "cafe.dataFaturamento AS data, " +
								  "IFNULL(armazenagem.TOTAL,0) AS ARMAZENAGEM, " +
								  "IFNULL(servico.TOTAL,0) AS SERVICOS, " +
								  "(IFNULL(armazenagem.TOTAL,0) + IFNULL(servico.TOTAL,0)) AS TOTAL ";
									
				break;
			case 1:
				consulta = "SELECT  fazendaProdutor.id AS ID, " +
								   "cafe.dataFaturamento AS data, " +
								   "IFNULL(servicos.armazenagem,0) AS ARMAZENAGEM, " +
								   "IFNULL(servicos.total,0) AS SERVICOS, " +
								   "IFNULL(servicos.total,0) AS TOTAL ";
									
				break;
			case 2:
				consulta = "SELECT fazendaProdutor.id AS ID, " +
								  "cafe.dataFaturamento AS data, " +
								  "IFNULL(armazenagem.TOTAL,0) + IFNULL(servicos.armazenagem,0) AS ARMAZENAGEM, " +
								  "IFNULL(servico.TOTAL,0) + IFNULL(servicos.total,0) AS SERVICOS, " +
							      "IFNULL(armazenagem.TOTAL,0) + IFNULL(servico.TOTAL,0) + " +
								  "IFNULL(servicos.TOTAL,0) AS TOTAL ";
									
				break;
		
		}
		
		return consulta;
		
	}

	public static String getTipoConsulta(int tipo) {
		
		String consulta = "";
		
		switch (tipo) {
			
			case 0:
				consulta = "WHERE servCafe.pago = 'N' ";
				break;
			case 1:
				consulta = "WHERE servCafe.pago = 'Y' ";
				break;
		
		}
		
		return consulta;
		
	}

	public static String getConsultaCafe() {
		
		String consulta = "INSERT INTO Cafe (id, dataFaturamento) " +
		
							 "SELECT fazendaProdutor.id AS id, " +
									"empresa.dataCafe AS data " +
										
								"FROM FazendaProdutor fazendaProdutor " +
								
									"INNER JOIN Empresa empresa " +
									"ON empresa.id = 1 " +
								
									"LEFT JOIN ( " +
										"SELECT fazendaProdutor_id AS idFaz, " +
												"pago AS pago " +
											"FROM Servcafe " +
									") AS servico " +
									"ON servico.idFaz = fazendaProdutor.id " +
									"WHERE servico.pago = 'N' " +
										"GROUP BY id " +
							
							"ON DUPLICATE KEY UPDATE dataFaturamento = dataFaturamento ";
										
		return consulta;
		
	}
	
}
