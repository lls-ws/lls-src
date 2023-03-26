package br.net.lls.cafe.dao;

import br.net.lls.componentes.Relatorio;
import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.cafe.dao.SaldocafeSql;

public class ResumoPeneiraSql {
	
	private static String getConsultaLote(Relatorio relatorio, String nomeTabela, int count, int tipoConsulta) {
		
		String consulta = "SELECT lote.peneira_id AS id, " +
								   "fazendaProdutor.id AS id_fazenda, " +
								   "IFNULL(SUM(IF(lote.saldoSacas = 0, lote.sacas, lote.saldoSacas)),0) AS sacas, " +
								   "IFNULL(SUM(IF(lote.saldoPeso = 0, lote.peso, lote.saldoPeso)),0) AS peso ";
								   
		consulta+=SaldocafeSql.getCondicaoConsultaLote(relatorio, nomeTabela, 0, count, tipoConsulta);
									 
		return consulta;
		
	}
	
	private static String criarConsulta(Relatorio relatorio, String consulta) {
		
		String nomeTabela[] = {"Entcafe","Oscafe","Tracafe"};
		
		for( int i = 0; i < nomeTabela.length; i++) {
			
			String nomeTabelaMin = nomeTabela[i].toLowerCase();
			
			String consultaLote = getConsultaLote(relatorio, nomeTabela[i], i, 0);
			
			consulta += "LEFT JOIN (" + consultaLote + ") AS " + nomeTabelaMin + " " +
						"ON " + nomeTabelaMin + ".id = peneira.id ";
			
		}
		
		consulta += "WHERE IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) > 0 ";
		
		consulta += "ORDER BY nome ";
		
		return consulta;
		
	}
	
	public static String getConsulta(Relatorio relatorio) {
		
		String consulta = "SELECT peneira.id AS id, " +
							      "peneira.nome AS nome, " +
								  "IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) AS sacas, " +
								  "IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0) AS peso " +
								 
								"FROM Peneira peneira ";
										
		return criarConsulta(relatorio, consulta);
		
	}
	
}
