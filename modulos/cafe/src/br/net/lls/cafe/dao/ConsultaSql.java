package br.net.lls.cafe.dao;

import br.net.lls.componentes.Relatorio;

public class ConsultaSql {
	
	public static String getTipoConsulta(int tipo, String tabela) {
		
		String consulta = "";
		
		switch (tipo) {
			
			case 0:
				consulta = "WHERE " + tabela + ".fechado = 'N' ";
				break;
			case 1:
				consulta = "WHERE " + tabela + ".fechado = 'Y' ";
				break;
		
		}
		
		return consulta;
		
	}

	public static String getStatusConsulta(int status, String tabela) {
		
		String consulta = "";
		
		switch (status) {
			
			case 0:
				consulta = "WHERE " + tabela + ".status = 'ABERTA' ";
				break;
			case 1:
				consulta = "WHERE " + tabela + ".status = 'DESPEJADA' ";
				break;
			case 2:
				consulta = "WHERE " + tabela + ".status = 'FECHADA' ";
				break;
		
		}
		
		return consulta;
		
	}

	public static String getLimit(Relatorio relatorio) {
		
		int firstResult = (relatorio.getPagina() - 1) * relatorio.getLinhas();
		int maxResults = relatorio.getLinhas();
		
		String limit = "LIMIT " + firstResult + ", " + maxResults;
		
		if (relatorio.getPagina() == 0) limit = "";
		
		return limit;
		
	}

	public static String getCondicaoProdutor(Relatorio relatorio) {
		
		if (relatorio.getIdProdutor() > 0) {
			
			return "AND fazendaProdutor.produtor_id = '" + relatorio.getIdProdutor() + "' ";
		
		}
		else {
			
			if (relatorio.getIdFazenda() > 0) {
				
				return "AND fazendaProdutor.id = '" + relatorio.getIdFazenda() + "' ";
				
			}
			else return "";
			
		}
		
	}

	public static String getCondicaoLote(Relatorio relatorio) {
		
		String condicao = "";
		
		switch (relatorio.getTipo()) {
		
			case 0:
				condicao = "AND lote.saldoSacas > 0 ";
				break;
			case 1:
				condicao = "AND lote.saldoSacas = 0 ";
				break;
		}
		
		return condicao;
		
	}

	public static String getCondicaoFazenda(int count, int tipoConsulta) {
		
		if (tipoConsulta == 0 && count == 2) return "fazendaDestino_id ";
		else return "fazendaProdutor_id ";
		
	}

	public static String getCondicaoGroup(int totalConsulta, int tipoConsulta) {
		
		if (tipoConsulta == 1 && totalConsulta == 1) return "";
		else return "GROUP BY id ";
		
	}
	
	public static String getCondicaoStatus(int count, int tipoConsulta) {
		
		if (tipoConsulta == 0) {
			
			if (count == 0) return "fechado = 'Y' ";
			else return "status = 'FECHADA' ";
			
		}
		else return "status != 'FECHADA' ";
		
	}

	public static int getDiasPermitidos() {
		return 3;
	}

}
