package br.net.lls.cafe.dao;

import java.util.Set;
import java.util.List;
import java.util.Iterator;
import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;
import java.net.URLDecoder;
import org.hibernate.Query;
import org.hibernate.Session;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.UnsupportedEncodingException;
import org.springframework.stereotype.Repository;

import br.net.lls.cadastro.Peneira;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.dao.ExtratocafeSql;
import br.net.lls.cafe.dao.SaldocafeSql;
import br.net.lls.cafe.dao.ResumoPeneiraSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaLoteDao implements LoteDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Lote lote) {
		
		urlDecoder(lote);
		
		entityManager.persist(lote);
		
	}
	
	public void altera(Lote lote) {
		
		urlDecoder(lote);
		
		entityManager.merge(lote);
		
	}
	
	public void remove(int id) {
		
		Lote lote = buscaPorId(id);
		
		entityManager.remove(lote);
		
	}
	
	public Lote buscaPorId(int id) {
		
		return entityManager.find(Lote.class, id);
		
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT lote.id, " +
								"lote.lote, " +
								"lote.sacas, " +
								"lote.peso, " +
								"lote.obs, " +
								"lote.pilha, " +
								"peneira.id AS idPeneira, " +
								"peneira.nome " +
							"FROM Lote lote " +
							"INNER JOIN Peneira peneira " +
							"ON lote.peneira_id = peneira.id " +	
							"WHERE lote.id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public boolean checkSaldo(Set<Lote> lotes) {
		
		int saldoSacas = 0;
		int sacasDesdobras = 0;
		
		BigDecimal saldoPeso = new BigDecimal(0.00);
		BigDecimal pesoDesdobras = new BigDecimal(0.00);
		
		for (Lote lote : lotes) {
			
			sacasDesdobras = sacasDesdobras + lote.getSacas();
			pesoDesdobras = pesoDesdobras.add(lote.getPeso());
			
			saldoSacas = saldoSacas + lote.getSaldoSacas();
			saldoPeso = saldoPeso.add(lote.getSaldoPeso());
			
		}
		
		if (saldoSacas == sacasDesdobras &&
			saldoPeso.compareTo(pesoDesdobras) == 0) {
			
			return true;
			
		}
		else {
			return false;
		}
		
	}

	public List getListaProcura(int pagina, String lote, int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		int linhas = 8;
		
		int firstResult = (pagina - 1) * linhas;
		
		String consulta = "SELECT lote.id, " +
								  "lote.lote AS lote, " +
								  "lote.saldoSacas, " +
								  "lote.saldoPeso, " +
								  "lote.sacas, " +
								  "lote.peso, " +
								  "lote.obs, " +
								  "lote.pilha, " +
								  "peneira.nome " +
								"FROM Lote lote " +
								"INNER JOIN Peneira peneira " +
								"ON lote.peneira_id = peneira.id ";
								
		String consultaGR = "INNER JOIN Entcafe_Lote entcafe_Lote " +
							"ON entcafe_Lote.lote_id = lote.id " +
							"INNER JOIN Entcafe entcafe " +
							"ON entcafe_Lote.entcafe_id = entcafe.id " +
							"WHERE entcafe.fazendaProdutor_id = :id " +
							"AND entcafe.fechado = 'Y' ";
							
		String consultaOS = "INNER JOIN Oscafe_Lote oscafe_Lote " +
							"ON oscafe_Lote.lote_id = lote.id " +
							"INNER JOIN Oscafe oscafe " +
							"ON oscafe_Lote.oscafe_id = oscafe.id " +
							"WHERE oscafe.fazendaProdutor_id = :id " +
							"AND oscafe.status = 'FECHADA' ";
							
		String consultaGT = "INNER JOIN Tracafe_Lote tracafe_Lote " +
							"ON tracafe_Lote.lote_id = lote.id " +
							"INNER JOIN Tracafe tracafe " +
							"ON tracafe_Lote.tracafe_id = tracafe.id " +
							"WHERE tracafe.fazendaDestino_id = :id " +
							"AND tracafe.status = 'FECHADA' ";
							
		String condicoes = "AND lote.lote like :lote " +
							"AND lote.saldoSacas > 0 " +
							"AND lote.saldoPeso > 0 " +
								"ORDER BY lote " +
								"LIMIT " + firstResult + ", " + linhas;
		
		String guia = lote.substring(0,2).toUpperCase();
		
		if (guia.equals("GR") && id > 0) consulta += consultaGR + condicoes;
		else if (guia.equals("OS") && id > 0) consulta += consultaOS + condicoes;
		else if (guia.equals("GT") && id > 0) consulta += consultaGT + condicoes;
		else return null;
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("lote", "%" + lote + "%");
		
		if (id > 0) query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public int getSacasDesdobras(Set<Lote> lotes, JSONObject cafeJSONObject) {
		
		int contador = 0;
		int sacasDesdobras = 0;
		
		BigDecimal pesoDesdobras = new BigDecimal(0.00);
		
		JSONArray lotesJSONArray = new JSONArray();
		
		for (Lote lote : lotes) {
			
			JSONObject lotesJSONObject = new JSONObject();
			
			sacasDesdobras = sacasDesdobras + lote.getSacas();
			pesoDesdobras = pesoDesdobras.add(lote.getPeso());
			
			Peneira peneira = lote.getPeneira();
			
			lotesJSONObject.put("id", lote.getId());
			lotesJSONObject.put("lote", lote.getLote());
			lotesJSONObject.put("sacas", lote.getSacas());
			lotesJSONObject.put("peso", lote.getPeso());
			lotesJSONObject.put("peneira", peneira.getNome());
			lotesJSONObject.put("observacao", lote.getObservacao());
			lotesJSONObject.put("pilha", lote.getPilha());
			
			lotesJSONArray.put(lotesJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(lotesJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("totalQtd", contador);
		totalJSONObject.put("totalSacas", sacasDesdobras);
		totalJSONObject.put("totalPeso", pesoDesdobras);
		rodapeJSONArray.put(totalJSONObject);
		
		cafeJSONObject.put("lancamentos", lancamentosJSONArray);
		cafeJSONObject.put("rodape", rodapeJSONArray);
		
		return sacasDesdobras;
		
	}
	
	public JSONObject juntaJSONObject(JSONObject[] jsonObjectArray) {
		
		String[] camposArray = new String[]{"lancamentos","rodape"};
		JSONArray[] jsonArray = new JSONArray[]{new JSONArray(), new JSONArray()};
		
		for (int i = 0; i < jsonObjectArray.length; ++i) {
			
			for (int j = 0; j < camposArray.length; ++j) {
				
				juntaJSONArray(jsonArray[j], jsonObjectArray[i].getJSONArray(camposArray[j]), j);
				
			}
				
		}
		
		JSONObject jsonObject = new JSONObject();
		
		for (int i = 0; i < jsonArray.length; ++i) {
			
			jsonObject.put(camposArray[i], jsonArray[i]);
				
		}
		
		return jsonObject;
		
	}

	private void juntaJSONArray(JSONArray jsonArray1, JSONArray jsonArray2, int tipo) {
		
		if (tipo == 0) {
		
			for (int i = 0; i < jsonArray2.length(); ++i) {
				
				jsonArray1.put(jsonArray2.getJSONArray(i));
				
			}
			
		}
		else {
			
			for (int i = 0; i < jsonArray2.length(); ++i) {
				
				jsonArray1.put(jsonArray2.getJSONObject(i));
				
			}
			
		}
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = ExtratocafeSql.getConsulta(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		return query.list();
		
	}
	
	public List getListTotal(Relatorio relatorio) { return null; }
	
	public JSONArray getListaJSONArray(Relatorio relatorio) {
		
		List list = getList(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("data", object[1]);
			jsonObject.put("lote", object[2]);
			jsonObject.put("observacao", object[3]);
			jsonObject.put("pilha", object[4]);
			jsonObject.put("sacas", object[5]);
			jsonObject.put("peso", object[6]);
			jsonObject.put("peneira", object[7]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 8);
			
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}
	
	private JSONObject getValoresJSONObject(Relatorio relatorio, List list, int tipoConsulta) {
		
		JSONObject jsonObject = new JSONObject();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[tipoConsulta]));
			
			setValoresJSONObject(relatorio, jsonObject, object);
			
		}
		
		return jsonObject;
		
	}
	
	private JSONObject setValoresJSONObject(Relatorio relatorio, JSONObject jsonObject, Object[] object) {
		
		jsonObject.put("qtd", object[0]);
		jsonObject.put("qtdLotes", object[1]);
		jsonObject.put("sacas", object[2]);
		jsonObject.put("peso", object[3]);
		jsonObject.put("media", object[4]);
		jsonObject.put("servico", object[5]);
		jsonObject.put("saida", object[6]);
		jsonObject.put("transferida", object[7]);
		jsonObject.put("total", object[8]);
		
		return jsonObject;
		
	}
	
	public JSONObject getTotalJSONObject(Relatorio relatorio) {
		
		JSONObject jsonObject = getValoresJSONObject(relatorio, getListSaldo(relatorio, 1), 1);
		
		jsonObject.put("peneiras", getResumoPeneiraJSONArray(relatorio));
		
		return jsonObject;
		
	}
	
	private List getListSaldo(Relatorio relatorio, int totalConsulta) {
		
		String consulta = SaldocafeSql.getConsulta(relatorio, totalConsulta);
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		return query.list();
		
	}
	
	private List getListResumoPeneira(Relatorio relatorio) {
		
		String consulta = ResumoPeneiraSql.getConsulta(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		return query.list();
		
	}
	
	public JSONArray getSaldoJSONArray(Relatorio relatorio) {
		
		List list = getListSaldo(relatorio, 0);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			setValoresJSONObject(relatorio, jsonObject, object);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 9);
			
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}
	
	public JSONObject getTotalSaldoJSONObject(Relatorio relatorio) {
		
		return getValoresJSONObject(relatorio, getListSaldo(relatorio, 1), 0);
		
	}
	
	public JSONArray getResumoPeneiraJSONArray(Relatorio relatorio) {
		
		List list = getListResumoPeneira(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("nome", object[1]);
			jsonObject.put("sacas", object[2]);
			jsonObject.put("peso", object[3]);
			
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}
	
	public Lote urlDecoder(Lote lote) {
		
		 if (lote != null) {
		 
			 try {
			
				lote.setObservacao(URLDecoder.decode(lote.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return lote;
		
	}
	
	//public JSONArray getGeralLotesJSONArray(Relatorio relatorio) {
		
		
		
		//JSONArray jsonArray = new JSONArray();
		
		//for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			//Object[] object = (Object[]) iterator.next();
			
			//JSONObject jsonObject = new JSONObject();
			
			//jsonObject.put("id", object[0]);
			//jsonObject.put("data", object[1]);
			//jsonObject.put("lote", object[2]);
			//jsonObject.put("observacao", object[3]);
			//jsonObject.put("pilha", object[4]);
			//jsonObject.put("sacas", object[5]);
			//jsonObject.put("peso", object[6]);
			//jsonObject.put("peneira", object[7]);
			
			//Consulta.setFazenda(relatorio, object, jsonObject, 8);
			
			//jsonArray.put(jsonObject);
			
		//}
		
		//return jsonArray;
		
	//}
	
}
