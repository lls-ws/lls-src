package br.net.lls.milho.dao;

import java.lang.Object;
import java.util.List;
import java.util.Calendar;
import java.util.Date;
import java.math.BigDecimal;
import java.util.Iterator;
import org.json.JSONArray;
import org.json.JSONObject;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Criterion;
import org.hibernate.type.Type;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import br.net.lls.milho.Milho;
import br.net.lls.milho.Entmilho;
import br.net.lls.milho.Saimilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.Data;

@Repository
public class JpaMilhoDao implements MilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Milho milho) {
		
		entityManager.persist(milho);
		
	}
	
	public void altera(Milho milho) {
		
		entityManager.merge(milho);
		
	}
	
	public Milho buscaPorId(int id) {
		
		return entityManager.find(Milho.class, id);
		
	}
	
	public void remove(int id) {
		
		Milho milho = buscaPorId(id);
		
		entityManager.remove(milho);
		
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT milho.id AS id, " +
								"produtor.nome AS produtor, " +
								"fazendaProdutor.nome AS fazenda, " +
								"milho.dataEntrada AS dataEntrada, " +
								"milho.liquidoEntrada AS liquidoEntrada, " + 
								"milho.dataSaida AS dataSaida, " +
								"milho.liquidoSaida AS liquidoSaida, " + 
								"milho.total AS saldo, " +
								"milho.dataFaturamento AS dataFaturamento " +
							"FROM Milho milho " +
							"INNER JOIN FazendaProdutor fazendaProdutor " +
							"ON milho.id = fazendaProdutor.id " +
							"INNER JOIN Produtor produtor " +
							"ON produtor.id = fazendaProdutor.produtor_id " +
							"AND milho.id = :id";
			
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public boolean verificaExisteSaldo(int id) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Milho.class);
		
		criteria.setProjection(Projections.rowCount());
		
		Criterion idCriterion = Restrictions.eq("id", id);
		
		criteria.add(idCriterion);
		
		Long total = (Long) criteria.uniqueResult();
		
		if (total == 1) {
			
			return true;
			
		}
		else {
			
			return false;
		}
		
	}
	
	public void setSaldoEntrada(Entmilho entmilho, int id, Date dataFaturamento) {
		
		boolean verificaExisteSaldo = verificaExisteSaldo(id);
		
		if (!verificaExisteSaldo) {
			
			Milho milho = new Milho();
			
			Calendar cal = Data.DateToCalendar(dataFaturamento);
			
			milho.setId(id);
			milho.setBruto(entmilho.getBruto());
			milho.setLiquidoEntrada(entmilho.getLiquido());
			milho.setDataEntrada(entmilho.getData());
			milho.setLiquidoSaida(new BigDecimal(0.00));
			milho.setDataSaida(null);
			milho.setDataFaturamento(cal);
			milho.setTotal(entmilho.getLiquido());
			
			adiciona(milho);
			
		}
		else {
			
			Milho milho = buscaPorId(id);
			
			BigDecimal saldoBruto = milho.getBruto();
			BigDecimal saldoLiquido = milho.getLiquidoEntrada();
			BigDecimal saldoTotal = milho.getTotal();
			
			saldoBruto = saldoBruto.add(entmilho.getBruto());
			saldoLiquido = saldoLiquido.add(entmilho.getLiquido());
			saldoTotal = saldoTotal.add(entmilho.getLiquido());
			
			milho.setBruto(saldoBruto);
			milho.setLiquidoEntrada(saldoLiquido);
			milho.setDataEntrada(entmilho.getData());
			milho.setTotal(saldoTotal);
			
			altera(milho);
			
		}
		
	}
	
	public void setSaldoSaida(Saimilho saimilho, int id) {
		
		Milho milho = buscaPorId(id);
		
		BigDecimal saldoLiquido = milho.getLiquidoSaida();
		BigDecimal saldoTotal = milho.getTotal();
		
		saldoLiquido = saldoLiquido.add(saimilho.getLiquido());
		saldoTotal = saldoTotal.subtract(saimilho.getLiquido());
		
		milho.setLiquidoSaida(saldoLiquido);
		milho.setDataSaida(saimilho.getData());
		milho.setTotal(saldoTotal);
		
		altera(milho);
		
	}
	
	public void removeSaldoEntrada(Entmilho entmilho, int id) {
		
		Milho milho = buscaPorId(id);
			
		BigDecimal saldoBruto = milho.getBruto();
		BigDecimal saldoLiquido = milho.getLiquidoEntrada();
		BigDecimal saldoTotal = milho.getTotal();
		
		saldoBruto = saldoBruto.subtract(entmilho.getBruto());
		saldoLiquido = saldoLiquido.subtract(entmilho.getLiquido());
		saldoTotal = saldoTotal.subtract(entmilho.getLiquido());
		
		milho.setBruto(saldoBruto);
		milho.setLiquidoEntrada(saldoLiquido);
		milho.setTotal(saldoTotal);
		
		altera(milho);
		
	}
	
	public void removeSaldoSaida(Saimilho saimilho, int id) {
		
		Milho milho = buscaPorId(id);
			
		BigDecimal saldoLiquido = milho.getLiquidoSaida();
		BigDecimal saldoTotal = milho.getTotal();
		
		saldoLiquido = saldoLiquido.subtract(saimilho.getLiquido());
		saldoTotal = saldoTotal.add(saimilho.getLiquido());
		
		milho.setLiquidoSaida(saldoLiquido);
		milho.setTotal(saldoTotal);
		
		altera(milho);
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT milho.id AS id, " +
								" milho.liquidoEntrada, " +
								" milho.liquidoSaida, " +
								" milho.total ";
							
		String tabela = "FROM Milho milho ";
		
		String campoIdFazenda = "milho.id";
		
		String condicao = "WHERE milho.total > 0 ";
		
		String ordenacao = "ORDER BY IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, '') ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
				
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(milho.id), " + 
								" SUM(milho.liquidoEntrada), " +
								" SUM(milho.liquidoSaida), " +
								" SUM(milho.total) " +
							"FROM Milho milho ";
		
		String campoIdFazenda = "milho.id";
		
		String condicao = "WHERE milho.total > 0 ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getListTotais(relatorio, consulta, campoIdFazenda, condicao, session);
		
	}
	
	public List listaProcura(String nomeProdutor) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Milho.class, "milho")
			.createAlias("milho.fazendaProdutor", "fazendaProdutor")
			.createAlias("fazendaProdutor.produtor", "produtor")
			.setProjection(Projections.projectionList()
				.add(Projections.property("fazendaProdutor.id"), "id")
				.add(Projections.property("fazendaProdutor.nome"), "nome")
				.add(Projections.property("milho.total"), "saldo")
				.add(Projections.property("produtor.nome"), "nome_produtor")
				.add(Projections.property("produtor.id"), "id_produtor")
			)
			.add(Restrictions.ilike("produtor.nome", nomeProdutor, MatchMode.ANYWHERE))
			.addOrder(Order.asc("nome_produtor"));
		
		List list = criteria.list();
		
		return list;
		
	}

	public List getSaldo(Relatorio relatorio) {
		
		if (relatorio.getIdFazenda() > 0) {
		
			Session session = (Session) entityManager.getDelegate();
			
			Criteria criteriaTotais = session.createCriteria(Milho.class, "milho")
				.createAlias("milho.fazendaProdutor", "fazendaProdutor")
				.createAlias("fazendaProdutor.produtor", "produtor")
				.setProjection(Projections.projectionList()
						.add(Projections.sum("milho.liquidoEntrada"))
						.add(Projections.sum("milho.liquidoSaida"))
						.add(Projections.sum("milho.total"))
			);
				
			if (relatorio.getIdProdutor() == 0) {
			
				criteriaTotais.add(Restrictions.eq("fazendaProdutor.id", relatorio.getIdFazenda()));
			
			} else {
				
				criteriaTotais.add(Restrictions.eq("produtor.id", relatorio.getIdProdutor()));
				
			}
			
			List list = criteriaTotais.list();
			
			return list;
			
		}
		else {
			return null;
		}
		
	}
	
	public JSONArray getListaJSONArray(Relatorio relatorio) {
		
		List list = getList(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("entrada", object[1]);
			jsonObject.put("saida", object[2]);
			jsonObject.put("saldo", object[3]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 4);
			
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}
	
	public JSONObject getTotalJSONObject(Relatorio relatorio) {
		
		List list = getListTotal(relatorio);
		
		JSONObject jsonObject = new JSONObject();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[0]));
			jsonObject.put("entrada", object[1]);
			jsonObject.put("saida", object[2]);
			jsonObject.put("saldo", object[3]);
			
		}
		
		return jsonObject;
		
	}
		
}
