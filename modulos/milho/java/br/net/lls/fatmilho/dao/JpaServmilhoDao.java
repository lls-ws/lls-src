package br.net.lls.fatmilho.dao;

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
import java.math.BigDecimal;
import java.util.Calendar;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.Type;
import org.hibernate.transform.Transformers;

import br.net.lls.fatmilho.Servmilho;
import br.net.lls.fatmilho.Baixamilho;
import br.net.lls.fatmilho.dao.ServmilhoSql;
import br.net.lls.fatmilho.dao.BaixamilhoSql;
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

import org.json.JSONArray;
import org.json.JSONObject;

@Repository
public class JpaServmilhoDao implements ServmilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void remove(int id) {}
	
	public void adiciona(Servmilho servMilho) {
		
		urlDecoder(servMilho);
		
		entityManager.persist(servMilho);
		
	}
	
	public Servmilho buscaPorId(int id) {
		
		return entityManager.find(Servmilho.class, id);
		
	}
	
	public boolean remover(int id) {
		
		Servmilho servmilho = buscaPorId(id);
		
		if (!servmilho.getPago()) {
			
			entityManager.remove(servmilho);
			
			return true;
		
		}
		else {
			return false;
		}
		
	}
	
	public void altera(Servmilho servMilho) {
		
		urlDecoder(servMilho);
		
		entityManager.merge(servMilho);
		
	}
	
	public void baixa(int id, boolean pago) {
		
		Servmilho servMilho = buscaPorId(id);
			
		servMilho.setPago(pago);
		
		altera(servMilho);
		
	}
	
	public void finalizarFaturamento(Relatorio relatorio) {
	
		Session session = (Session) entityManager.getDelegate();

		String consulta = "";

		if (relatorio.getIdFazenda() == 0) {

			consulta = "UPDATE Empresa empresa " +
							"INNER JOIN Milho milho " +
							"ON milho.id > 0 " +
							"SET empresa.dataMilho = :dataFaturamento, " +
								"milho.dataFaturamento = :dataFaturamento " +
							"WHERE empresa.id = 1";
		
		}
		else {
			
			consulta = "UPDATE Milho " +
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
			
			consulta2 = "AND fatMilho.fazendaProdutor_id = :id ";
		
		}
		
		String consulta = "INSERT INTO Servmilho (fazendaProdutor_id, preco_id, data, liquido, valor, automatico, pago, obs) " +
			"SELECT fatMilho.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatMilho.data AS DATA, " +
					"fatMilho.saldo AS LIQUIDO, " +
					"fatMilho.armazenagem AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(milho.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatMilho.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatmilho fatMilho " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 20 " +
					"INNER JOIN Milho milho " +
					"ON milho.id = fatMilho.fazendaProdutor_id " +
					"AND milho.dataFaturamento < :data " +
					"AND fatMilho.data = :data " +
					"AND fatMilho.armazenagem > 0 " +
					consulta2 +
			
			"UNION ALL " +
			
			"SELECT fatMilho.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatMilho.data AS DATA, " +
					"fatMilho.entradas AS LIQUIDO, " +
					"fatMilho.limpeza AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(milho.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatMilho.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatmilho fatMilho " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 21 " +
					"INNER JOIN Milho milho " +
					"ON milho.id = fatMilho.fazendaProdutor_id " +
					"AND milho.dataFaturamento < :data " +
					"AND fatMilho.data = :data " +
					"AND fatMilho.limpeza > 0 " +
					consulta2 +
			
			"UNION ALL " +
			
			"SELECT fatMilho.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatMilho.data AS DATA, " +
					"fatMilho.entradas AS LIQUIDO, " +
					"fatMilho.secagem AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(milho.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatMilho.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatmilho fatMilho " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 22 " +
					"INNER JOIN Milho milho " +
					"ON milho.id = fatMilho.fazendaProdutor_id " +
					"AND milho.dataFaturamento < :data " +
					"AND fatMilho.data = :data " +
					"AND fatMilho.secagem > 0 " +
					consulta2 +
			
			"UNION ALL " +
			
			"SELECT fatMilho.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatMilho.data AS DATA, " +
					"fatMilho.entradas AS LIQUIDO, " +
					"fatMilho.recepcao AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(milho.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatMilho.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatmilho fatMilho " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 23 " +
					"INNER JOIN Milho milho " +
					"ON milho.id = fatMilho.fazendaProdutor_id " +
					"AND milho.dataFaturamento < :data " +
					"AND fatMilho.data = :data " +
					"AND fatMilho.recepcao > 0 " +
					consulta2 +
					
			"UNION ALL " +
			
			"SELECT fatMilho.fazendaProdutor_id AS ID_FAZ, " +
					"preco.id AS ID_PRECO, " +
					"fatMilho.data AS DATA, " +
					"fatMilho.entradas AS LIQUIDO, " +
					"fatMilho.carga AS VALOR, " +
					"'Y' AS AUTOMATICO, " +
					"'N' AS PAGO, " +
					"CONCAT(preco.nome, ' de ', " +
						"DATE_FORMAT(milho.dataFaturamento, '%d/%m/%Y'), ' ate ', " +
						"DATE_FORMAT(fatMilho.data, '%d/%m/%Y') " +
					") AS OBS " +
				"FROM Fatmilho fatMilho " +
					"INNER JOIN Preco preco " +
					"ON preco.id = 24 " +
					"INNER JOIN Milho milho " +
					"ON milho.id = fatMilho.fazendaProdutor_id " +
					"AND milho.dataFaturamento < :data " +
					"AND fatMilho.data = :data " +
					"AND fatMilho.carga > 0 " +
					consulta2;
						
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("id", relatorio.getIdFazenda());
		
		}
		
		query.setParameter("data", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}
	
	public Servmilho urlDecoder(Servmilho servMilho) {
		
		 try {
		
			servMilho.setObs(URLDecoder.decode(servMilho.getObs(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return servMilho;
		
	}
	
	public void updateServico(Relatorio relatorio) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "UPDATE Fatmilho fatMilho, (" +
				
					"SELECT fatMilho.fazendaProdutor_id AS ID, " +
						"IFNULL(armazenagem.valor, 0) AS ARMAZENAGEM, " +
						"IFNULL(limpeza.valor, 0) AS LIMPEZA, " +
						"IFNULL(secagem.valor, 0) AS SECAGEM, " +
						"IFNULL(recepcao.valor, 0) AS RECEPCAO, " +
						"IFNULL(carga.valor, 0) AS CARGA " +
							"FROM Fatmilho fatMilho " +
							
							"LEFT JOIN ( " +
							
								"SELECT  servMilho.fazendaProdutor_id AS ID, " +
								"		SUM(servMilho.valor) AS VALOR " +
									
								"	FROM Servmilho servMilho " +
		
								"		INNER JOIN Milho milho " +
								"		ON milho.id = servMilho.fazendaProdutor_id " +
								"		AND servMilho.data > milho.dataFaturamento " +
								"		AND servMilho.data <= :dataFinal " +
								"		AND servMilho.automatico = 'N' " +
								"		AND servMilho.preco_id = 20 " +
								"			GROUP BY ID " +
							") AS armazenagem " +
							"ON fatMilho.fazendaProdutor_id = armazenagem.id " +
							
							"LEFT JOIN ( " +
							
								"SELECT  servMilho.fazendaProdutor_id AS ID, " +
										"SUM(servMilho.valor) AS VALOR " +
									
									"FROM Servmilho servMilho " +
		
										"INNER JOIN Milho milho " +
										"ON milho.id = servMilho.fazendaProdutor_id " +
										"AND servMilho.data > milho.dataFaturamento " +
										"AND servMilho.data <= :dataFinal " +
										"AND servMilho.automatico = 'N' " +
										"AND servMilho.preco_id = 21 " +
											"GROUP BY ID " +
							") AS limpeza " +
							"ON fatMilho.fazendaProdutor_id = limpeza.id " +
							
							"LEFT JOIN ( " +
							
								"SELECT  servMilho.fazendaProdutor_id AS ID, " +
										"SUM(servMilho.valor) AS VALOR " +
									
									"FROM Servmilho servMilho " +
		
										"INNER JOIN Milho milho " +
										"ON milho.id = servMilho.fazendaProdutor_id " +
										"AND servMilho.data > milho.dataFaturamento " +
										"AND servMilho.data <= :dataFinal " +
										"AND servMilho.automatico = 'N' " +
										"AND servMilho.preco_id = 22 " +
											"GROUP BY ID " +
							") AS secagem " +
							"ON fatMilho.fazendaProdutor_id = secagem.id " +
							
							"LEFT JOIN ( " +
							
								"SELECT  servMilho.fazendaProdutor_id AS ID, " +
										"SUM(servMilho.valor) AS VALOR " +
									
									"FROM Servmilho servMilho " +
		
										"INNER JOIN Milho milho " +
										"ON milho.id = servMilho.fazendaProdutor_id " +
										"AND servMilho.data > milho.dataFaturamento " +
										"AND servMilho.data <= :dataFinal " +
										"AND servMilho.automatico = 'N' " +
										"AND servMilho.preco_id = 23 " +
											"GROUP BY ID " +
							") AS recepcao " +
							"ON fatMilho.fazendaProdutor_id = recepcao.id " +
							
							"LEFT JOIN ( " +
							
								"SELECT  servMilho.fazendaProdutor_id AS ID, " +
										"SUM(servMilho.valor) AS VALOR " +
									
									"FROM Servmilho servMilho " +
		
										"INNER JOIN Milho milho " +
										"ON milho.id = servMilho.fazendaProdutor_id " +
										"AND servMilho.data > milho.dataFaturamento " +
										"AND servMilho.data <= :dataFinal " +
										"AND servMilho.automatico = 'N' " +
										"AND servMilho.preco_id = 24 " +
											"GROUP BY ID " +
							") AS carga " +
							"ON fatMilho.fazendaProdutor_id = carga.id " +
							
							"AND fatMilho.data = :dataFinal " +
					
					") servico " +
				
				"SET fatMilho.armazenagem = fatMilho.armazenagem + servico.armazenagem, " +
					"fatMilho.limpeza = fatMilho.limpeza + servico.limpeza, " +
					"fatMilho.secagem = fatMilho.secagem + servico.secagem, " +
					"fatMilho.recepcao = fatMilho.recepcao + servico.recepcao, " +
					"fatMilho.carga = fatMilho.carga + servico.carga, " +
					"fatMilho.total = fatMilho.total + " +
									 "servico.armazenagem + " +
									 "servico.limpeza + " +
									 "servico.secagem + " +
									 "servico.recepcao + " +
									 "servico.carga " +
									 
				"WHERE fatMilho.data = :dataFinal " +
				"AND fatMilho.fazendaProdutor_id = servico.id ";
		
		if (relatorio.getIdFazenda() > 0) {
			
			consulta += "AND fatMilho.fazendaProdutor_id = :idFazenda";
			
		}
		
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("idFazenda", relatorio.getIdFazenda());
			
		}
		
		query.setParameter("dataFinal", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}
	
	public JSONObject getJSONById(int id) {
		
		Servmilho servmilho = buscaPorId(id);
		
		FazendaProdutor fazendaProdutor = servmilho.getFazendaProdutor();
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		Preco preco = servmilho.getPreco();
		
		JSONObject servmilhoJSON = new JSONObject();
			
		Set<Baixamilho> baixamilho = new HashSet<Baixamilho>();
			
		baixamilho = servmilho.getBaixamilho();
		
		JSONArray baixamilhosArray = new JSONArray();
		
		BigDecimal valorPago = new BigDecimal(0.00);
		
		for (Baixamilho baixa : baixamilho) {
			
			JSONObject baixamilhoJSON = new JSONObject();
			
			valorPago = valorPago.add(baixa.getValor());
			
			baixamilhoJSON.put("id", baixa.getId());
			baixamilhoJSON.put("data", baixa.getDate());
			baixamilhoJSON.put("valor", baixa.getValor());
			baixamilhoJSON.put("obs", baixa.getObs());
			
			baixamilhosArray.put(baixamilhoJSON);
			
			servmilhoJSON.put("baixas", baixamilhosArray);
			
		}
		
		BigDecimal valorTotal = servmilho.getValor();
		
		BigDecimal valorRestante = valorTotal.subtract(valorPago);
		
		servmilhoJSON.put("id", servmilho.getId());
		servmilhoJSON.put("data", servmilho.getDate());
		servmilhoJSON.put("produtor", produtor.getNome());
		servmilhoJSON.put("idFazenda", fazendaProdutor.getId());
		servmilhoJSON.put("idServico", preco.getId());
		servmilhoJSON.put("fazenda", fazendaProdutor.getNome());
		servmilhoJSON.put("servico", preco.getNome());
		servmilhoJSON.put("fechado", servmilho.getPago());
		servmilhoJSON.put("automatico", servmilho.getAutomatico());
		servmilhoJSON.put("liquido", servmilho.getLiquido());
		servmilhoJSON.put("total", valorTotal);
		servmilhoJSON.put("pago", valorPago);
		servmilhoJSON.put("valor", valorRestante);
		servmilhoJSON.put("obs", servmilho.getObs());
		
		return servmilhoJSON;
	}
	
	public List getListById(int id) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT produtor.nome AS PRODUTOR, " +
								"fazendaProdutor.nome AS FAZENDA, " +
								"preco.nome AS SERVICO, " +
								"servMilho.liquido AS LIQUIDO, " +
								"servMilho.valor AS TOTAL, " +
								"IFNULL(baixas.PAGO, 0) AS PAGO, " +
								"(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS VALOR, " +
								"servMilho.obs AS OBS " +
						"FROM Servmilho servMilho " +
						"INNER JOIN Preco preco " +
						"ON servMilho.preco_id = preco.id " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON servMilho.fazendaProdutor_id = fazendaProdutor.id " +
						BaixamilhoSql.getConsultaTotalPago() + 
							"INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id " +
							"WHERE servMilho.id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		return query.list();
		
	}
	
	public List getList(Relatorio relatorio) {

		String consulta = "SELECT servMilho.id, " +
								"servMilho.data AS data, " +
								"preco.nome, " +
								"servMilho.valor AS total, " +
								"IFNULL(baixas.PAGO, 0), " +
								"(servMilho.valor - IFNULL(baixas.PAGO, 0)) ";
						
		String tabela =	"FROM Servmilho servMilho " +
						"INNER JOIN Preco preco " +
						"ON servMilho.preco_id = preco.id " +
						BaixamilhoSql.getConsultaTotalPago();
						
		String campoIdFazenda = "";
		
		String condicao = ServmilhoSql.getTipoConsulta(relatorio.getTipo());
		
		String ordenacao = "ORDER BY data, IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, ''), total ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(servMilho.id) AS QTD, " + 
								"SUM(servMilho.valor) AS TOTAL, " +
								"SUM(IFNULL(baixas.PAGO, 0)) AS PAGO, " +
								"SUM(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS VALOR " +
							"FROM Servmilho servMilho " +
							BaixamilhoSql.getConsultaTotalPago();
		
		String campoIdFazenda = "";
		
		String condicao = ServmilhoSql.getTipoConsulta(relatorio.getTipo());
		
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
			jsonObject.put("total", object[1]);
			jsonObject.put("pago", object[2]);
			jsonObject.put("valor", object[3]);
			
		}
		
		return jsonObject;
		
	}
	
	public List getListSintetizado(Relatorio relatorio) {

		String consulta = ServmilhoSql.getConsultaSintetizado(relatorio.getTipo());

		String tabela = "FROM Milho milho ";

		switch (relatorio.getTipo()) {
			
			case 0:
				tabela += ServmilhoSql.getConsultaServico();
									
				break;
			case 1:
				tabela += ServmilhoSql.getConsultaServicoFaturar();
									
				break;
			case 2:
				tabela += ServmilhoSql.getConsultaServico() + ServmilhoSql.getConsultaServicoFaturar();
				
				break;
		
		}
		
		String campoIdFazenda = "milho.id";
		
		String condicao = "HAVING TOTAL > 0 ";
		
		String ordenacao = "ORDER BY IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, '') ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotalSintetizado(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(servico.ID) AS QTD, " +
									"SUM(servico.ARMAZENAGEM) AS ARMAZENAGEM, " +
									"SUM(servico.RECEPCAO) AS RECEPCAO, " +
									"SUM(servico.LIMPEZA) AS LIMPEZA, " +
									"SUM(servico.SECAGEM) AS SECAGEM, " +
									"SUM(servico.CARGA) AS CARGA, " +
									"SUM(servico.TOTAL) AS TOTAL " +
								"FROM ( ";
		
		consulta += ServmilhoSql.getConsultaSintetizado(relatorio.getTipo());
		
		consulta += "FROM Milho milho " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON fazendaProdutor.id = milho.id ";
		
		String consulta2 = "INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id ";
							
		String fazenda = "AND milho.id = '" + relatorio.getIdFazenda() + "' ";
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
				consulta += consulta2 + ServmilhoSql.getConsultaServico() + consulta3;
				
				break;
			case 1:
				consulta += consulta2 + ServmilhoSql.getConsultaServicoFaturar() + consulta3;
				
				break;
			case 2:
				consulta += consulta2 + ServmilhoSql.getConsultaServico() + ServmilhoSql.getConsultaServicoFaturar() + consulta3;
				
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
			jsonObject.put("armazenagem", object[1]);
			jsonObject.put("recepcao", object[2]);
			jsonObject.put("limpeza", object[3]);
			jsonObject.put("secagem", object[4]);
			jsonObject.put("carga", object[5]);
			jsonObject.put("total", object[6]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 7);
			
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
			jsonObject.put("armazenagem", object[1]);
			jsonObject.put("recepcao", object[2]);
			jsonObject.put("limpeza", object[3]);
			jsonObject.put("secagem", object[4]);
			jsonObject.put("carga", object[5]);
			jsonObject.put("total", object[6]);
			
		}
		
		return jsonObject;
		
	}
	
}
