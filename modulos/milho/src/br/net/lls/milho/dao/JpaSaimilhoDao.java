package br.net.lls.milho.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.hibernate.Query;
import org.hibernate.Session;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import org.json.JSONArray;
import org.json.JSONObject;

import br.net.lls.milho.Saimilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaSaimilhoDao implements SaimilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Saimilho saimilho) {
		
		urlDecoder(saimilho);
		
		entityManager.persist(saimilho);
		
	}
	
	public void altera(Saimilho saimilho) {
		
		urlDecoder(saimilho);
		
		entityManager.merge(saimilho);
		
	}
	
	public void remove(int id) {
		
		Saimilho saimilho = buscaPorId(id);
		
		entityManager.remove(saimilho);
		
	}
	
	public Saimilho buscaPorId(int id) {
		
		return entityManager.find(Saimilho.class, id);
		
	}
	
	public Saimilho urlDecoder(Saimilho saimilho) {
		
		try {
		
			saimilho.setObs(URLDecoder.decode(saimilho.getObs(), "UTF-8"));
			saimilho.setDestino(URLDecoder.decode(saimilho.getDestino(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return saimilho;
		
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT saimilho.id AS id, " +
								"saimilho.data AS data, " +
								"saimilho.laudo, " +
								"produtor.nome AS produtor, " +
								"fazendaProdutor.nome AS fazenda, " +
								"saimilho.tiket, " +
								"saimilho.placa, " +
								"saimilho.liquido, " +
								"saimilho.obs, " +
								"saimilho.cilo, " +
								"saimilho.destino " +
							"FROM Saimilho saimilho " +
							"INNER JOIN FazendaProdutor fazendaProdutor " +
							"ON saimilho.fazendaProdutor_id = fazendaProdutor.id " +	
							"INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id " +
							"WHERE saimilho.id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT saimilho.id AS id, " +
								"saimilho.data AS data, " +
								"saimilho.laudo, " +
								"saimilho.placa, " +
								"saimilho.destino, " +
								"saimilho.liquido ";
				
		String tabela = "FROM Saimilho saimilho ";
		
		String campoIdFazenda = "";
		
		String condicao = "";
		
		String ordenacao = "ORDER BY data, id " + Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(saimilho.id), " +
								"SUM(saimilho.liquido) " +
							"FROM Saimilho saimilho ";
		
		String campoIdFazenda = "";
		
		String condicao = "";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getListTotais(relatorio, consulta, campoIdFazenda, condicao, session);
		
	}
	
	public JSONArray getListaJSONArray(Relatorio relatorio) {
		
		List list = getList(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("data", object[1]);
			jsonObject.put("laudo", object[2]);
			jsonObject.put("placa", object[3]);
			jsonObject.put("destino", object[4]);
			jsonObject.put("liquido", object[5]);
		
			Consulta.setFazenda(relatorio, object, jsonObject, 6);
		
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}

	public JSONObject getTotalJSONObject(Relatorio relatorio) { return null; }
	
	public JSONObject getTotalSaldoJSONObject(Relatorio relatorio, List saldoList) {
		
		List list = getListTotal(relatorio);
		
		JSONObject jsonObject = new JSONObject();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[0]));
			jsonObject.put("liquido", object[1]);
			
		}
		
		if (relatorio.getIdFazenda() > 0) {
		
			for (Iterator iterator = saldoList.iterator(); iterator.hasNext();) {
						
				Object[] object = (Object[]) iterator.next();
				
				jsonObject.put("entradas", object[0]);
				jsonObject.put("saidas", object[1]);
				jsonObject.put("saldo", object[2]);
				
			}
		
		}

		return jsonObject;
		
	}
	
}
