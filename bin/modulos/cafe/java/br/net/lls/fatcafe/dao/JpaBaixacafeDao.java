package br.net.lls.fatcafe.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.hibernate.Query;
import org.hibernate.Session;
import java.util.Set;
import java.util.List;
import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import br.net.lls.fatcafe.Baixacafe;
import br.net.lls.fatcafe.dao.BaixacafeDao;
import br.net.lls.fatcafe.dao.BaixacafeSql;
import br.net.lls.componentes.Id;
import br.net.lls.componentes.Relatorio;

@Repository
public class JpaBaixacafeDao implements BaixacafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Baixacafe baixaCafe) {
		
		urlDecoder(baixaCafe);
		
		entityManager.persist(baixaCafe);
		
	}
	
	public Baixacafe buscaPorId(int id) {
		
		return entityManager.find(Baixacafe.class, id);
		
	}
	
	public List getListById(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT servCafe.id AS ID, " +
								 "CURDATE() AS DATA, " +
								 "produtor.nome AS PRODUTOR, " +
								 "fazendaProdutor.nome AS FAZENDA, " +
								 "preco.nome AS SERVICO, " +
								 "servCafe.sacas AS SACAS, " +
								 "servCafe.valor AS TOTAL, " +
								 "IFNULL(baixas.PAGO, 0) AS PAGO, " +
								 "(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR " +
						"FROM Servcafe servCafe " +
						"INNER JOIN Preco preco " +
						"ON servCafe.preco_id = preco.id " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON servCafe.fazendaProdutor_id = fazendaProdutor.id ";
					
		String consulta2 = BaixacafeSql.getConsultaTotalPago() + 
							"INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id " +
							"WHERE servCafe.id = :idServ ";
		
		consulta += consulta2;
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("idServ", idServ);
		
		return query.list();
		
	}
	
	public List getTotaisBaixas(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT COUNT(baixaCafe.id) AS QTD, " +
								 "SUM(baixaCafe.valor) AS TOTAL " +
						"FROM Baixacafe baixaCafe " +
							"WHERE baixaCafe.servCafe_id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", idServ);
		
		return query.list();
		
	}
	
	public List getBaixas(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT baixaCafe.id AS ID, " +
								 "baixaCafe.data AS DATA, " +
								 "baixaCafe.valor AS VALOR, " +
								 "baixaCafe.obs " +
						"FROM Baixacafe baixaCafe " +
							"WHERE baixaCafe.servCafe_id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", idServ);
		
		return query.list();
		
	}

	public void remove(Baixacafe baixacafe) {
		
		entityManager.remove(baixacafe);
			
	}
	
	public void altera(Baixacafe baixaCafe) {
		
		urlDecoder(baixaCafe);
		
		entityManager.merge(baixaCafe);
		
	}
	
	public Baixacafe urlDecoder(Baixacafe baixaCafe) {
		
		 try {
		
			baixaCafe.setObs(URLDecoder.decode(baixaCafe.getObs(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return baixaCafe;
		
	}

	public BigDecimal getValorPago(Set<Baixacafe> baixacafes, JSONObject servcafeJSONObject) {
		
		int contador = 0;
		
		BigDecimal valorPago = new BigDecimal(0.00);
		
		JSONArray baixasJSONArray = new JSONArray();
		
		for (Baixacafe baixacafe : baixacafes) {
			
			JSONObject baixasJSONObject = new JSONObject();
			
			valorPago = valorPago.add(baixacafe.getValor());
			
			baixasJSONObject.put("id", baixacafe.getId());
			baixasJSONObject.put("data", baixacafe.getDate());
			baixasJSONObject.put("valor", baixacafe.getValor());
			baixasJSONObject.put("obs", baixacafe.getObs());
			
			baixasJSONArray.put(baixasJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(baixasJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("totalQtd", contador);
		totalJSONObject.put("totalPago", valorPago);
		rodapeJSONArray.put(totalJSONObject);
		
		servcafeJSONObject.put("lancamentos", lancamentosJSONArray);
		servcafeJSONObject.put("rodape", rodapeJSONArray);
		
		return valorPago;
		
	}

}
