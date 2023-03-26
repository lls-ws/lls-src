package br.net.lls.fatcafe.dao;

public class BaixacafeSql {
	
	public static String getConsultaValorPago() {
		
		return "LEFT JOIN ( " +
								
					"SELECT id AS ID, " +
							"servCafe_id AS ID_SERV, " +
							"data AS DATA, " +
							"valor AS VALOR, " +
							"obs AS OBS " +
						"FROM Baixacafe " +
							"GROUP BY ID_SERV " +
					
				") baixas " +
				"ON baixas.ID_SERV = servCafe.id ";
				
	}

	public static String getConsultaTotalPago() {
		
		return "LEFT JOIN ( " +
								
					"SELECT servCafe_id AS ID_SERV, " +
							"SUM(valor) AS PAGO " +
						"FROM Baixacafe " +
							"GROUP BY ID_SERV " +
					
				") baixas " +
				"ON baixas.ID_SERV = servCafe.id ";
				
	}

}
