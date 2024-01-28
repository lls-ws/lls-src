package br.net.lls.fatmilho.dao;

public class BaixamilhoSql {
	
	public static String getConsultaValorPago() {
		
		return "LEFT JOIN ( " +
								
					"SELECT id AS ID, " +
							"servMilho_id AS ID_SERV, " +
							"data AS DATA, " +
							"valor AS VALOR, " +
							"obs AS OBS " +
						"FROM Baixamilho " +
							"GROUP BY ID_SERV " +
					
				") baixas " +
				"ON baixas.ID_SERV = servMilho.id ";
				
	}

	public static String getConsultaTotalPago() {
		
		return "LEFT JOIN ( " +
								
					"SELECT servMilho_id AS ID_SERV, " +
							"SUM(valor) AS PAGO " +
						"FROM Baixamilho " +
							"GROUP BY ID_SERV " +
					
				") baixas " +
				"ON baixas.ID_SERV = servMilho.id ";
				
	}

}
