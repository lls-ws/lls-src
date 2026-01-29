package br.net.lls.cafe.dao;

import br.net.lls.componentes.Relatorio;
import br.net.lls.cafe.dao.ConsultaSql;

public class ExtratocafeSql {
	
	private static String criarConsulta(Relatorio relatorio) {
		
		String consulta = "";
		
		String nomeTabela[] = {"Entcafe","Oscafe","Tracafe"};
		
		for( int i = 0; i < nomeTabela.length; i++) {
			
			String consultaLote = getConsultaLote(relatorio, nomeTabela[i], i);
			
			if (i==0) consulta = consultaLote;
			else consulta += "UNION ALL " + consultaLote;
			
		}
		
		consulta += "ORDER BY data DESC, lote " + ConsultaSql.getLimit(relatorio);
		
		return consulta;
		
	}
	
	private static String getConsultaLote(Relatorio relatorio, String nomeTabela, int count) {
		
		String nomeTabelaMin = nomeTabela.toLowerCase();
		
		String consulta = "SELECT lote.id AS id, " +
								  nomeTabelaMin + ".data AS data, " +
								  "lote.lote AS lote, " +
								  "lote.obs AS observacao, " +
								  "lote.pilha AS pilha, " +
								  "IF(lote.saldoSacas = 0, lote.sacas, lote.saldoSacas) AS sacas, " +
								  "IF(lote.saldoSacas = 0, lote.peso, lote.saldoPeso) AS peso, " +
								  "peneira.nome AS peneira, " +
								  "fazendaProdutor.nome AS fazenda, " +
								  "produtor.nome AS produtor " +
									 
								"FROM Lote lote " +
								
								"INNER JOIN Peneira peneira " +
								"ON lote.peneira_id = peneira.id " +
								
								"INNER JOIN " + nomeTabela + "_Lote " + nomeTabelaMin + "_Lote " +
								"ON " + nomeTabelaMin + "_Lote.lote_id = lote.id " +
								
								"INNER JOIN " + nomeTabela + " " + nomeTabelaMin + " " +
								"ON " + nomeTabelaMin + "_Lote." + nomeTabelaMin + "_id = " + nomeTabelaMin + ".id " +
								
								"INNER JOIN FazendaProdutor fazendaProdutor " +
								"ON " + nomeTabelaMin + "." + ConsultaSql.getCondicaoFazenda(count, 0) + " = fazendaProdutor.id " +
								
								"INNER JOIN Produtor produtor " +
								"ON fazendaProdutor.produtor_id = produtor.id " +
								
								"WHERE " + nomeTabelaMin + "." + ConsultaSql.getCondicaoStatus(count, 0) + " " +
								ConsultaSql.getCondicaoLote(relatorio) +
								ConsultaSql.getCondicaoProdutor(relatorio);
						  
		return consulta;
		
	}
	
	public static String getConsulta(Relatorio relatorio) {
		
		return criarConsulta(relatorio);
		
	}
	
}
