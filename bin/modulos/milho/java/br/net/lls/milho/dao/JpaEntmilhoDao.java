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

import br.net.lls.milho.Entmilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaEntmilhoDao implements EntmilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Entmilho entmilho) {
		
		urlDecoder(entmilho);
		
		entityManager.persist(entmilho);
		
	}
	
	public void altera(Entmilho entmilho) {
		
		urlDecoder(entmilho);
		
		entityManager.merge(entmilho);
		
	}
	
	public void remove(int id) {
		
		Entmilho entmilho = buscaPorId(id);
		
		entityManager.remove(entmilho);
		
	}
	
	public Entmilho buscaPorId(int id) {
		
		return entityManager.find(Entmilho.class, id);
		
	}
	
	public Entmilho urlDecoder(Entmilho entmilho) {
		
		 try {
		
			entmilho.setObs(URLDecoder.decode(entmilho.getObs(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return entmilho;
		
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT entmilho.id AS id, " +
				"entmilho.data AS data, " +
				"entmilho.laudo, " +
				"produtor.nome AS produtor, " +
				"fazendaProdutor.nome AS fazenda, " +
				"entmilho.bruto, " +
				"entmilho.impureza, " +
				"ROUND(entmilho.bruto * entmilho.impureza / 100, 0) AS valorImpureza, " +
				"umidade.codigo, " +
				"umidade.desconto, " +
				"ROUND(entmilho.bruto * umidade.desconto / 100, 0) AS valorUmidade, " +
				"entmilho.quirela, " +
				"ROUND(entmilho.bruto * entmilho.quirela / 100, 0) AS valorQuirela, " +
				"entmilho.chocho, " +
				"ROUND(entmilho.bruto * entmilho.chocho / 100, 0) AS valorChocho, " +
				"entmilho.liquido, " +
				"entmilho.recepcao, " +
				"entmilho.limpeza, " +
				"entmilho.secagem, " +
				"entmilho.carga, " +
				"entmilho.total, " +
				"entmilho.tiket, " +
				"entmilho.placa, " +
				"entmilho.obs, " +
				"entmilho.cilo " +
			"FROM Entmilho entmilho " +
			"INNER JOIN Umidade umidade " +
			"ON entmilho.umidade_id = umidade.id " +
			"INNER JOIN FazendaProdutor fazendaProdutor " +
			"ON entmilho.fazendaProdutor_id = fazendaProdutor.id " +	
			"INNER JOIN Produtor produtor " +
			"ON fazendaProdutor.produtor_id = produtor.id " +
			"WHERE entmilho.id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT entmilho.id AS id, " +
				"entmilho.data AS data, " +
				"entmilho.laudo AS laudo, " +
				"entmilho.placa, " +
				"entmilho.bruto, " +
				"entmilho.impureza, " +
				"ROUND(entmilho.bruto * entmilho.impureza / 100, 0) AS valorImpureza, " +
				"umidade.codigo, " +
				"umidade.desconto, " +
				"ROUND(entmilho.bruto * umidade.desconto / 100, 0) AS valorUmidade, " +
				"entmilho.quirela, " +
				"ROUND(entmilho.bruto * entmilho.quirela / 100, 0) AS valorQuirela, " +
				"entmilho.chocho, " +
				"ROUND(entmilho.bruto * entmilho.chocho / 100, 0) AS valorChocho, " +
				"entmilho.liquido, " +
				"entmilho.recepcao, " +
				"entmilho.limpeza, " +
				"entmilho.secagem, " +
				"entmilho.carga, " +
				"entmilho.total ";
				
		String tabela = "FROM Entmilho entmilho " +
							"INNER JOIN Umidade umidade " +
							"ON entmilho.umidade_id = umidade.id ";
							
		String campoIdFazenda = "";
		
		String condicao = "";
		
		String ordenacao = "ORDER BY data, CAST(laudo AS unsigned) " +
			Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(entmilho.id), " +
								"SUM(entmilho.bruto), " +
								"SUM(ROUND(entmilho.bruto * entmilho.impureza / 100, 0)), " +
								"SUM(ROUND(entmilho.bruto * umidade.desconto / 100, 0)), " +
								"SUM(ROUND(entmilho.bruto * entmilho.quirela / 100, 0)), " +
								"SUM(ROUND(entmilho.bruto * entmilho.chocho / 100, 0)), " +
								"SUM(entmilho.liquido), " +
								"SUM(entmilho.recepcao), " +
								"SUM(entmilho.limpeza), " +
								"SUM(entmilho.secagem), " +
								"SUM(entmilho.carga), " +
								"SUM(entmilho.total) " +
							"FROM Entmilho entmilho " +
							"INNER JOIN Umidade umidade " +
							"ON entmilho.umidade_id = umidade.id ";
			
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
			jsonObject.put("bruto", object[4]);
			jsonObject.put("impureza", object[5]);
			jsonObject.put("valorImpureza", object[6]);
			jsonObject.put("umidade", object[7]);
			jsonObject.put("descontoUmidade", object[8]);
			jsonObject.put("valorUmidade", object[9]);
			jsonObject.put("quirela", object[10]);
			jsonObject.put("valorQuirela", object[11]);
			jsonObject.put("chocho", object[12]);
			jsonObject.put("valorChocho", object[13]);
			jsonObject.put("liquido", object[14]);
			jsonObject.put("recepcao", object[15]);
			jsonObject.put("limpeza", object[16]);
			jsonObject.put("secagem", object[17]);
			jsonObject.put("carga", object[18]);
			jsonObject.put("total", object[19]);
		
			Consulta.setFazenda(relatorio, object, jsonObject, 20);
		
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}

	public JSONObject getTotalJSONObject(Relatorio relatorio) { return null; }
	
	public JSONObject getTotalSaldoJSONObject(Relatorio relatorio, List saldoList) {
		
		List list = getListTotal(relatorio);
		
		JSONObject jsonObject = new JSONObject();
		
		if (relatorio.getIdFazenda() > 0) {
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				
				Object[] object = (Object[]) iterator.next();
				
				jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[0]));
				jsonObject.put("bruto", object[1]);
				jsonObject.put("impureza", object[2]);
				jsonObject.put("umidade", object[3]);
				jsonObject.put("quirela", object[4]);
				jsonObject.put("chocho", object[5]);
				jsonObject.put("liquido", object[6]);
				jsonObject.put("recepcao", object[7]);
				jsonObject.put("limpeza", object[8]);
				jsonObject.put("secagem", object[9]);
				jsonObject.put("carga", object[10]);
				jsonObject.put("total", object[11]);
				
			}
			
			for (Iterator iterator = saldoList.iterator(); iterator.hasNext();) {
						
				Object[] object = (Object[]) iterator.next();
				
				jsonObject.put("entradas", object[0]);
				jsonObject.put("saidas", object[1]);
				jsonObject.put("saldo", object[2]);
				
			}
			
		}
		else {
			
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
				Object[] object = (Object[]) iterator.next();
				
				jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[0]));
				jsonObject.put("bruto", object[1]);
				jsonObject.put("liquido", object[6]);
				jsonObject.put("total", object[11]);
				
			}
			
		}

		return jsonObject;
		
	}
		
}
