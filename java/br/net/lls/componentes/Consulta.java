package br.net.lls.componentes;

import java.util.Date;
import java.util.List;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.lang.Exception;
import java.lang.Object;
import org.json.JSONArray;
import org.json.JSONObject;
import org.hibernate.Query;
import org.hibernate.Session;

import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;

public class Consulta {
	
	public static String getOrdem(Relatorio relatorio) {
		
		Date dataInicial = relatorio.getDataInicial().getTime();
		Date dataFinal = relatorio.getDataFinal().getTime();
		
		int dias = Data.getDaysDiff(dataInicial, dataFinal);
		
		String ordem = "";
		
		if (dias == 0) {
			
			ordem = "DESC ";
			
		}

		return ordem;
		
	}
	
	public static String getJson(JSONArray dadosJSONArray, JSONObject totalJSONObject) {
		
		JSONArray rodapeJSONArray = new JSONArray();
		
		rodapeJSONArray.put(totalJSONObject);
		
		String qtdPaginas = totalJSONObject.get("paginas").toString();
		
		JSONObject jsonList = new JSONObject();
		
		jsonList.put("cadastros", dadosJSONArray);
		
		jsonList.put("paginas", qtdPaginas);
		
		jsonList.put("rodape", rodapeJSONArray);
		
		jsonList.put("status", "200");
		
		return jsonList.toString();
		
	}	
	
	public static String getFiltroFazenda(Relatorio relatorio, String consulta, String tabela,
										  String campoIdFazenda, int tipo) {
		
		if (campoIdFazenda.equals("")) {
			
			campoIdFazenda = "fazendaProdutor_id";
			
		}
		
		String filtroFazenda = "INNER JOIN FazendaProdutor fazendaProdutor " +
								"ON " + campoIdFazenda + " = fazendaProdutor.id ";
			
		String filtroProdutor = "INNER JOIN Produtor produtor " +
								"ON fazendaProdutor.produtor_id = produtor.id ";
		
		String produtorConsulta = ", produtor.nome AS produtor ";
		String fazendaConsulta = ", fazendaProdutor.nome AS fazenda ";
		
		String fazenda = "AND fazendaProdutor.id = '" + relatorio.getIdFazenda() + "' ";
		String produtor = "AND produtor.id = '" + relatorio.getIdProdutor() + "' ";
		
		if (relatorio.getIdFazenda() > 0) {
			
			if (relatorio.getIdProdutor() == 0) {
			
				filtroFazenda += fazenda;
			
			} else {
				
				if (tipo == 0) {
					
					consulta += fazendaConsulta;
				
				}
				
				filtroProdutor += produtor;
				
			}
			
		}
		else {
			
			if (tipo == 0) {
				
				consulta += fazendaConsulta + produtorConsulta;
			
			}
			
		}
		
		return consulta + tabela + filtroFazenda + filtroProdutor;
		
	}
	
	public static String getFiltroData(Relatorio relatorio, String condicao) {
		
		if (relatorio.getDataInicial() != null) {
			
			String filtroData = "data >= :dataInicial " +
								"AND data <= :dataFinal ";
			
			if (!condicao.equals("")) {
				
				condicao += " AND " + filtroData;
				
			}
			else {
				
				condicao = "WHERE " + filtroData;
				
			}
			
		}
		
		return condicao;
		
	}
	
	public static List getList(Relatorio relatorio, String consulta,
							   String tabela, String ordenacao,
							   String campoIdFazenda, String condicao,
							   Session session) {
		
		consulta = getFiltroFazenda(relatorio, consulta, tabela, campoIdFazenda, 0);
		
		condicao = getFiltroData(relatorio, condicao);
						   
		int firstResult = (relatorio.getPagina() - 1) * relatorio.getLinhas();
		int maxResults = relatorio.getLinhas();
		
		String limit = "LIMIT " + firstResult + ", " + maxResults;
		
		if (relatorio.getPagina() == 0) limit = "";
		
		consulta += condicao + ordenacao + limit;
		
		Query query = session.createSQLQuery(consulta);
		
		setParameter(relatorio, query);

		return query.list();
		
	}

	public static List getListTotais(Relatorio relatorio, String consulta,
									 String campoIdFazenda, String condicao,
									 Session session) {
		
		consulta = getFiltroFazenda(relatorio, consulta, "", campoIdFazenda, 1);
		
		condicao = getFiltroData(relatorio, condicao);
		
		consulta += condicao;
			
		Query query = session.createSQLQuery(consulta);
		
		setParameter(relatorio, query);

		return query.list();
		
	}
	
	public static void setParameter(Relatorio relatorio, Query query) {
		
		if (relatorio.getDataInicial() != null) {
			
			query.setParameter("dataInicial", relatorio.getDataInicial());
			query.setParameter("dataFinal", relatorio.getDataFinal());
		
		}
		
	}
	
	public static int getQtdPaginas(Relatorio relatorio, Object object) {
		
		int totalRegistros = 0;
		
		try {
            if(object instanceof BigInteger) {
                BigInteger big = (BigInteger) object;
                totalRegistros = big.intValue();
			}
			else if(object instanceof BigDecimal) {
                BigDecimal big = (BigDecimal) object;
                totalRegistros = big.intValue();
			}
		} catch (Exception e) {}  
		
		int qtdPaginas = (totalRegistros + relatorio.getLinhas() - 1) / relatorio.getLinhas();
		
		return qtdPaginas;
		
	}
	
	public static void setFazenda(Relatorio relatorio, Object[] object,
								  JSONObject jsonObject, int posicao) {
		
		if (relatorio.getIdFazenda() > 0) {
			
			if (relatorio.getIdProdutor() > 0) {
			
				jsonObject.put("fazenda", object[posicao]);
		
			}
			
		}
		else {
		
			jsonObject.put("fazenda", object[posicao]);
			
			posicao++;
			
			jsonObject.put("produtor", object[posicao]);
			
		}
		
	}
	
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
	
}
