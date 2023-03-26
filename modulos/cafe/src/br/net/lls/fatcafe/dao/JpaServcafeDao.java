package br.net.lls.fatcafe.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import java.util.Set;
import java.util.List;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Calendar;
import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.hibernate.transform.Transformers;

import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Saicafe;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.fatcafe.Baixacafe;
import br.net.lls.fatcafe.dao.ServcafeSql;
import br.net.lls.fatcafe.dao.BaixacafeSql;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Preco;
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaServcafeDao implements ServcafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void remove(int id) {
	
		Servcafe servcafe = buscaPorId(id);
	
		entityManager.remove(servcafe);
		
	}
	
	public void adiciona(Servcafe servCafe) {
		
		urlDecoder(servCafe);
		
		entityManager.persist(servCafe);
		
	}
	
	public Servcafe buscaPorId(int id) {
		
		return entityManager.find(Servcafe.class, id);
		
	}
	
	public void altera(Servcafe servCafe) {
		
		urlDecoder(servCafe);
		
		entityManager.merge(servCafe);
		
	}
	
	public void baixa(int id, boolean pago) {
		
		Servcafe servCafe = buscaPorId(id);
			
		servCafe.setPago(pago);
		
		altera(servCafe);
		
	}
	
	public void finalizarFaturamento(Relatorio relatorio) {
	
		Session session = (Session) entityManager.getDelegate();

		String consulta = "";

		if (relatorio.getIdFazenda() == 0) {

			consulta = "UPDATE Empresa empresa " +
							"INNER JOIN Cafe cafe " +
							"ON cafe.id > 0 " +
							"SET empresa.dataCafe = :dataFaturamento, " +
								"cafe.dataFaturamento = :dataFaturamento " +
							"WHERE empresa.id = 1";
		
		}
		else {
			
			consulta = "UPDATE Cafe " +
							"SET dataFaturamento = :dataFaturamento " +
							"WHERE id = :id";
			
		}
						
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() == 0) {
			
			query.setParameter("dataFaturamento", Data.getLastDateOfMoth(relatorio.getDataFinal().getTime()));
		
		}
		else {
			
			query.setParameter("id", relatorio.getIdFazenda());
			
			query.setParameter("dataFaturamento", relatorio.getDataFinal());
			
		}
		
		query.executeUpdate();
		
	}
	
	public void setServico(Relatorio relatorio) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta2 = "";
		
		if (relatorio.getIdFazenda() > 0) {
			
			consulta2 = "AND fatCafe.fazendaProdutor_id = :id ";
		
		}
		
		String consulta = "INSERT INTO Servcafe (fazendaProdutor_id, preco_id, data, sacas, valor, automatico, pago, obs) " +
			"SELECT fatCafe.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatCafe.data AS DATA, " +
					"fatCafe.saldo AS SACAS, " +
					"fatCafe.armazenagem AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(cafe.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatCafe.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatcafe fatCafe " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 16 " +
					"INNER JOIN Cafe cafe " +
					"ON cafe.id = fatCafe.fazendaProdutor_id " +
					"AND cafe.dataFaturamento < :data " +
					"AND fatCafe.data = :data " +
					"AND fatCafe.armazenagem > 0 " +
					consulta2;
						
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("id", relatorio.getIdFazenda());
		
		}
		
		query.setParameter("data", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}
	
	public Servcafe urlDecoder(Servcafe servCafe) {
		
		try {
		
			servCafe.setObs(URLDecoder.decode(servCafe.getObs(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return servCafe;
		
	}
	
	public JSONObject getJSONById(Servcafe servcafe, JSONObject servcafeJSONObject, BigDecimal valorPago) {
		
		FazendaProdutor fazendaProdutor = servcafe.getFazendaProdutor();
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		Preco preco = servcafe.getPreco();
		
		BigDecimal valorTotal = servcafe.getValor();
		
		BigDecimal valorRestante = valorTotal.subtract(valorPago);
		
		servcafeJSONObject.put("id", servcafe.getId());
		servcafeJSONObject.put("data", servcafe.getDate());
		servcafeJSONObject.put("lote", servcafe.getLote());
		servcafeJSONObject.put("produtor", produtor.getNome());
		servcafeJSONObject.put("idFazenda", fazendaProdutor.getId());
		servcafeJSONObject.put("idServico", preco.getId());
		servcafeJSONObject.put("fazenda", fazendaProdutor.getNome());
		servcafeJSONObject.put("servico", preco.getNome());
		servcafeJSONObject.put("valorServico", preco.getValor());
		servcafeJSONObject.put("fechado", servcafe.getPago());
		servcafeJSONObject.put("automatico", servcafe.getAutomatico());
		servcafeJSONObject.put("sacas", servcafe.getSacas());
		servcafeJSONObject.put("total", valorTotal);
		servcafeJSONObject.put("pago", valorPago);
		servcafeJSONObject.put("valor", valorRestante);
		servcafeJSONObject.put("observacao", servcafe.getObs());
		
		return servcafeJSONObject;
		
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT produtor.nome AS PRODUTOR, " +
								 "fazendaProdutor.nome AS FAZENDA, " +
								 "preco.nome AS SERVICO, " +
								 "servCafe.sacas AS SACAS, " +
								 "servCafe.valor AS TOTAL, " +
								 "IFNULL(baixas.PAGO, 0) AS PAGO, " +
								 "(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR, " +
								 "servCafe.obs AS OBS " +
						"FROM Servcafe servCafe " +
						"INNER JOIN Preco preco " +
						"ON servCafe.preco_id = preco.id " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON servCafe.fazendaProdutor_id = fazendaProdutor.id " +
						BaixacafeSql.getConsultaTotalPago() + 
							"INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id " +
							"WHERE servCafe.id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public List getList(Relatorio relatorio) {

		String consulta = "SELECT servCafe.id, " +
								"servCafe.data AS data, " +
								"preco.nome, " +
								"servCafe.valor AS total, " +
								"IFNULL(baixas.PAGO, 0), " +
								"(servCafe.valor - IFNULL(baixas.PAGO, 0)) ";
						
		String tabela =	"FROM Servcafe servCafe " +
						"INNER JOIN Preco preco " +
						"ON servCafe.preco_id = preco.id " +
						BaixacafeSql.getConsultaTotalPago();
						
		String campoIdFazenda = "";
		
		String condicao = ServcafeSql.getTipoConsulta(relatorio.getTipo());
		
		String ordenacao = "ORDER BY data, IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, ''), total ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(servCafe.id) AS QTD, " + 
								"SUM(servCafe.valor) AS TOTAL, " +
								"SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, " +
								"SUM(servCafe.valor - IFNULL(baixas.PAGO, 0)) AS VALOR " +
							"FROM Servcafe servCafe " +
							BaixacafeSql.getConsultaTotalPago();
		
		String campoIdFazenda = "";
		
		String condicao = ServcafeSql.getTipoConsulta(relatorio.getTipo());
		
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
			jsonObject.put("servico", object[2]);
			jsonObject.put("total", object[3]);
			jsonObject.put("pago", object[4]);
			jsonObject.put("valor", object[5]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 6);
			
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
			jsonObject.put("qtd", object[0]);
			jsonObject.put("total", object[1]);
			jsonObject.put("pago", object[2]);
			jsonObject.put("valor", object[3]);
			
		}
		
		return jsonObject;
		
	}
	
	public List getListSintetizado(Relatorio relatorio) {

		String consulta = ServcafeSql.getConsultaSintetizado(relatorio.getTipo());

		String tabela = "FROM Cafe cafe ";

		switch (relatorio.getTipo()) {
			
			case 0:
				tabela += ServcafeSql.getConsultaServico();
									
				break;
			case 1:
				tabela += ServcafeSql.getConsultaServicoFaturar();
									
				break;
			case 2:
				tabela += ServcafeSql.getConsultaServico() + ServcafeSql.getConsultaServicoFaturar();
				
				break;
		
		}
		
		String campoIdFazenda = "cafe.id";
		
		String condicao = "HAVING TOTAL > 0 ";
		
		String ordenacao = "ORDER BY IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, '') ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotalSintetizado(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(servico.ID) AS QTD, " +
								 "SUM(servico.ARMAZENAGEM) AS ARMAZENAGEM, " +
								 "SUM(servico.SERVICOS) AS SERVICOS, " +
								 "SUM(servico.TOTAL) AS TOTAL " +
							"FROM ( ";
		
		consulta += ServcafeSql.getConsultaSintetizado(relatorio.getTipo());
		
		consulta += "FROM Cafe cafe " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON fazendaProdutor.id = cafe.id ";
		
		String consulta2 = "INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id ";
							
		String fazenda = "AND cafe.id = '" + relatorio.getIdFazenda() + "' ";
		String produtor = "AND produtor.id = '" + relatorio.getIdProdutor() + "' ";
		
		if (relatorio.getIdFazenda() > 0) {
			
			if (relatorio.getIdProdutor() == 0) {
			
				consulta += fazenda;
			
			} else {
				
				consulta2 += produtor;
				
			}
			
		}
		
		String consulta3 = "HAVING TOTAL > 0 ) AS servico ";
		
		switch (relatorio.getTipo()) {
			
			case 0:
				consulta += consulta2 + ServcafeSql.getConsultaServico() + consulta3;
				
				break;
			case 1:
				consulta += consulta2 + ServcafeSql.getConsultaServicoFaturar() + consulta3;
				
				break;
			case 2:
				consulta += consulta2 + ServcafeSql.getConsultaServico() + ServcafeSql.getConsultaServicoFaturar() + consulta3;
				
				break;
		
		}
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		return query.list();
		
	}
	
	public JSONArray getListaSintetizadoJSONArray(Relatorio relatorio) {
		
		List list = getListSintetizado(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("data", object[1]);
			jsonObject.put("armazenagem", object[2]);
			jsonObject.put("servicos", object[3]);
			jsonObject.put("total", object[4]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 5);
			
			jsonArray.put(jsonObject);
			
		}
		
		return jsonArray;
		
	}

	public JSONObject getTotalSintetizadoJSONObject(Relatorio relatorio) {
		
		List list = getListTotalSintetizado(relatorio);
		
		JSONObject jsonObject = new JSONObject();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			jsonObject.put("paginas", Consulta.getQtdPaginas(relatorio, object[0]));
			jsonObject.put("qtd", object[0]);
			jsonObject.put("armazenagem", object[1]);
			jsonObject.put("servicos", object[2]);
			jsonObject.put("total", object[3]);
			
		}
		
		return jsonObject;
		
	}
	
	public void updateCafe() {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = ServcafeSql.getConsultaCafe();
					
		Query query = session.createSQLQuery(consulta);
		
		query.executeUpdate();
			
	}
	
	public String criaServico(Entcafe entcafe, Preco preco) {
		
		Servcafe servcafe = getServcafe(entcafe.getServcafes(), preco);
		
		if (entcafe.getCobrar()) {
		
			int sacas = entcafe.getSacas();
			
			BigDecimal custo = preco.getValor();
			
			BigDecimal valor = custo.multiply(new BigDecimal(sacas));
			
			FazendaProdutor fazendaProdutor = entcafe.getFazendaProdutor();
			
			servcafe.setData(entcafe.getData());
			servcafe.setLote(entcafe.getLote());
			servcafe.setSacas(sacas);
			servcafe.setValor(valor);
			servcafe.setPreco(preco);
			servcafe.setFazendaProdutor(fazendaProdutor);
			servcafe.setAutomatico(true);
			servcafe.setPago(false);
			servcafe.setObs("");
			
			if (servcafe.getId() == 0) {
			
				servcafe.addEntcafe(entcafe);
				
				adiciona(servcafe);
				
			}
			else {
			
				altera(servcafe);
				
			}
			
			return "\nDescarga cobrada!" + entcafe.getLote();
			
		}
		else {
			
			if (servcafe.getId() > 0) {
				
				servcafe.removeEntcafe(entcafe);
				
				remove(servcafe.getId());
				
			}
			
			return "";
			
		}
		
	}
	
	private Servcafe getServcafe(Set<Servcafe> servcafes, Preco preco) {
		
		if (servcafes.isEmpty() || servcafes == null) return new Servcafe();
		else {
		
			for (Servcafe servcafe : servcafes) {
				
				if (servcafe.getPreco().getId() == preco.getId()) return servcafe;
				
			}
			
			return new Servcafe();
			
		}
		
	}
	
	public JSONObject getServcafeJSONObject(Set<Servcafe> servcafes) {
		
		int contador = 0;
		
		BigDecimal valorTotal = new BigDecimal(0.00);
		
		JSONArray servcafesJSONArray = new JSONArray();
		
		for (Servcafe servcafe : servcafes) {
			
			JSONObject servcafesJSONObject = new JSONObject();
			
			Preco preco = servcafe.getPreco();
			
			valorTotal = valorTotal.add(servcafe.getValor());
			
			servcafesJSONObject.put("id", servcafe.getId());
			servcafesJSONObject.put("data", servcafe.getDate());
			servcafesJSONObject.put("servico", preco.getNome());
			servcafesJSONObject.put("sacas", servcafe.getSacas());
			servcafesJSONObject.put("valor", servcafe.getValor());
			
			servcafesJSONArray.put(servcafesJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(servcafesJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("qtd", contador);
		totalJSONObject.put("total", valorTotal);
		rodapeJSONArray.put(totalJSONObject);
		
		JSONObject servcafeJSONObject = new JSONObject();
		
		servcafeJSONObject.put("lancamentos", lancamentosJSONArray);
		servcafeJSONObject.put("rodape", rodapeJSONArray);
		
		return servcafeJSONObject;
		
	}

	public String criaServico(Saicafe saicafe, Preco preco) {
		
		Servcafe servcafe = getServcafe(saicafe.getServcafes(), preco);
		
		if (saicafe.getCobrar()) {
		
			int sacas = saicafe.getSacas();
			
			BigDecimal custo = preco.getValor();
			
			BigDecimal valor = custo.multiply(new BigDecimal(sacas));
			
			FazendaProdutor fazendaProdutor = saicafe.getFazendaProdutor();
			
			servcafe.setData(saicafe.getData());
			servcafe.setLote(saicafe.getLote());
			servcafe.setSacas(sacas);
			servcafe.setValor(valor);
			servcafe.setPreco(preco);
			servcafe.setFazendaProdutor(fazendaProdutor);
			servcafe.setAutomatico(true);
			servcafe.setPago(false);
			servcafe.setObs("");
			
			if (servcafe.getId() == 0) {
			
				servcafe.addSaicafe(saicafe);
				
				adiciona(servcafe);
				
			}
			else {
			
				altera(servcafe);
				
			}
			
			return "\nCarga cobrada!" + saicafe.getLote();
			
		}
		else {
			
			if (servcafe.getId() > 0) {
				
				servcafe.removeSaicafe(saicafe);
				
				remove(servcafe.getId());
				
			}
			
			return "";
			
		}
		
	}
	
	public JSONObject getJSONById(int id) {
		
		Servcafe servcafe = buscaPorId(id);
		
		Preco preco = servcafe.getPreco();
		
		JSONObject servcafeJSONObject = new JSONObject();
		
		servcafeJSONObject.put("id", servcafe.getId());
		servcafeJSONObject.put("data", servcafe.getDate());
		servcafeJSONObject.put("idServico", preco.getId());
		servcafeJSONObject.put("servico", preco.getNome());
		servcafeJSONObject.put("valorServico", preco.getValor());
		servcafeJSONObject.put("sacas", servcafe.getSacas());
		servcafeJSONObject.put("valor", servcafe.getValor());
		servcafeJSONObject.put("observacao", servcafe.getObs());
		
		return servcafeJSONObject;
		
	}
	
}
