package br.net.lls.cafe.dao;

import br.net.lls.componentes.Relatorio;
import br.net.lls.cafe.dao.ConsultaSql;

public class SaldocafeSql {
	
	public static String getCondicaoConsultaLote(Relatorio relatorio, String nomeTabela, int totalConsulta, int count, int tipoConsulta) {
		
		String nomeTabelaMin = nomeTabela.toLowerCase();
		
		String condicao = "FROM Lote lote " +
									
								"INNER JOIN " + nomeTabela + "_Lote " + nomeTabelaMin + "_Lote " +
								"ON " + nomeTabelaMin + "_Lote.lote_id = lote.id " +
								
								"INNER JOIN " + nomeTabela + " " + nomeTabelaMin + " " +
								"ON " + nomeTabelaMin + "_Lote." + nomeTabelaMin + "_id = " + nomeTabelaMin + ".id " +
								
								"INNER JOIN FazendaProdutor fazendaProdutor " +
								"ON " + nomeTabelaMin + "." + ConsultaSql.getCondicaoFazenda(count, tipoConsulta) + " = fazendaProdutor.id " +
								
								"WHERE " + nomeTabelaMin + "." + ConsultaSql.getCondicaoStatus(count, tipoConsulta) + " " +
								ConsultaSql.getCondicaoLote(relatorio) +
								ConsultaSql.getCondicaoProdutor(relatorio) + 
									ConsultaSql.getCondicaoGroup(totalConsulta, tipoConsulta);
		
		return condicao;
		
	}
	
	private static String getConsultaLote(Relatorio relatorio, String nomeTabela, int totalConsulta, int count, int tipoConsulta) {
		
		String consulta = "SELECT fazendaProdutor.id AS id, " +
								 "COUNT(lote.id) AS lotes, " +
								 "IFNULL(SUM(IF(lote.saldoSacas = 0, lote.sacas, lote.saldoSacas)),0) AS sacas, " +
								 "IFNULL(SUM(IF(lote.saldoPeso = 0, lote.peso, lote.saldoPeso)),0) AS peso ";
									 
		consulta+=getCondicaoConsultaLote(relatorio, nomeTabela, totalConsulta, count, tipoConsulta);
		
		return consulta;
		
	}
	
	private static String getConsultaDespejo(Relatorio relatorio, String nomeTabela, int totalConsulta, int count, int tipoConsulta) {
		
		String nomeTabelaMin = nomeTabela.toLowerCase();
		
		String consulta = "SELECT fazendaProdutor.id AS id, " +
								"IFNULL(SUM(" + nomeTabelaMin + "_Despejo.sacas), 0) AS sacas " +
					 
								"FROM " + nomeTabela + "_Despejo " + nomeTabelaMin + "_Despejo " +
								
								"INNER JOIN " + nomeTabela + " " + nomeTabelaMin + " " +
								"ON " + nomeTabelaMin + "_Despejo." + nomeTabelaMin + "_id = " + nomeTabelaMin + ".id " +
								
								"INNER JOIN FazendaProdutor fazendaProdutor " +
								"ON " + nomeTabelaMin + "." + ConsultaSql.getCondicaoFazenda(count, tipoConsulta) + " = fazendaProdutor.id " +
						
								"WHERE " + nomeTabelaMin + "." + ConsultaSql.getCondicaoStatus(count, tipoConsulta) + " " +
								ConsultaSql.getCondicaoProdutor(relatorio) + 
									ConsultaSql.getCondicaoGroup(totalConsulta, tipoConsulta);
						  
		if (relatorio.getTipo() == 1) consulta = "SELECT 0 AS id, 0 AS sacas ";
		
		return consulta;
		
	}
	
	private static String criarConsulta(Relatorio relatorio, String consulta, int totalConsulta) {
		
		String nomeTabela[] = {"Entcafe","Oscafe","Tracafe"};
		String tabelasDespejo[] = {"Oscafe","Saicafe","Tracafe"};
		String aliasTabela[] = {"servico","saida","transferida"};
		
		for( int i = 0; i < nomeTabela.length; i++) {
			
			String nomeTabelaMin = nomeTabela[i].toLowerCase();
			
			String consultaLote = getConsultaLote(relatorio, nomeTabela[i], totalConsulta, i, 0);
			
			consulta += "LEFT JOIN (" + consultaLote + ") AS " + nomeTabelaMin + " " +
						"ON " + nomeTabelaMin + ".id = fazendaProdutor.id ";
			
			String consultaDespejo = getConsultaDespejo(relatorio, tabelasDespejo[i], totalConsulta, i, 1);
			
			consulta += "LEFT JOIN (" + consultaDespejo + ") AS " + aliasTabela[i] + " " +
						"ON " + aliasTabela[i] + ".id = fazendaProdutor.id ";
			
		}
		
		consulta += "WHERE IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) + " +
			        "IFNULL(servico.sacas,0) + IFNULL(saida.sacas,0) + IFNULL(transferida.sacas,0) > 0 ";
		
		if (totalConsulta == 0) consulta += "ORDER BY produtor, fazenda " + ConsultaSql.getLimit(relatorio);
		
		return consulta;
		
	}
	
	public static String getConsulta(Relatorio relatorio, int totalConsulta) {
		
		String consulta = "SELECT fazendaProdutor.id AS id, " +
								  "IFNULL(entcafe.id,0) + IFNULL(oscafe.id,0) + IFNULL(tracafe.id,0) AS qtdLotes, " +
								  "IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) AS sacas, " +
								  "IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0) AS peso, " +
								  "ROUND( " +
									   "(IFNULL(entcafe.peso,0) + IFNULL(oscafe.peso,0) + IFNULL(tracafe.peso,0)) / " +
									   "(IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0)) " +
								   ",2) AS media, " +
								   "IFNULL(servico.sacas,0) AS servico, " +
								   "IFNULL(saida.sacas,0) AS saida, " +
								   "IFNULL(transferida.sacas,0) AS transferida, " +
								   "IFNULL(entcafe.sacas,0) + IFNULL(oscafe.sacas,0) + IFNULL(tracafe.sacas,0) + " +
								   "IFNULL(servico.sacas,0) + IFNULL(saida.sacas,0) + IFNULL(transferida.sacas,0) AS total, " +
								   "fazendaProdutor.nome AS fazenda, " +
								   "produtor.nome AS produtor " +
									
										"FROM FazendaProdutor fazendaProdutor " +
					
										"INNER JOIN Produtor produtor " +
										"ON fazendaProdutor.produtor_id = produtor.id " +
										ConsultaSql.getCondicaoProdutor(relatorio);
										
		if (totalConsulta == 1) consulta = getConsultaTotal(relatorio);
		
		return criarConsulta(relatorio, consulta, totalConsulta);
		
	}
	
	public static String getConsultaTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(fazendaProdutor.id) AS qtdFazendas, " +
								  "IFNULL(SUM(entcafe.lotes),0) + IFNULL(SUM(oscafe.lotes),0) + IFNULL(SUM(tracafe.lotes),0) AS qtdLotes, " +
								  "IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0) AS sacas, " +
								  "IFNULL(SUM(entcafe.peso),0) + IFNULL(SUM(oscafe.peso),0) + IFNULL(SUM(tracafe.peso),0) AS peso, " +
								  "ROUND( " +
									  "(IFNULL(SUM(entcafe.peso),0) + IFNULL(SUM(oscafe.peso),0) + IFNULL(SUM(tracafe.peso),0)) / " +
									  "(IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0)) " +
								  ",2) AS media, " +
								  "IFNULL(SUM(servico.sacas),0) AS servico, " +
								  "IFNULL(SUM(saida.sacas),0) AS saida, " +
								  "IFNULL(SUM(transferida.sacas),0) AS transferida, " +
								  "IFNULL(SUM(entcafe.sacas),0) + IFNULL(SUM(oscafe.sacas),0) + IFNULL(SUM(tracafe.sacas),0) + " +
								  "IFNULL(SUM(servico.sacas),0) + IFNULL(SUM(saida.sacas),0) + IFNULL(SUM(transferida.sacas),0) AS total " +

									"FROM FazendaProdutor fazendaProdutor " +
									
									"INNER JOIN Produtor produtor " +
									"ON fazendaProdutor.produtor_id = produtor.id " +
									ConsultaSql.getCondicaoProdutor(relatorio);
		
		return consulta;
		
	}
	
}
