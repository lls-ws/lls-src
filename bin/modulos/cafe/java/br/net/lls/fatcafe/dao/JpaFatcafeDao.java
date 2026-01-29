package br.net.lls.fatcafe.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.hibernate.Query;
import org.hibernate.Session;
import java.util.List;
import java.util.Date;
import java.util.Iterator;
import org.json.JSONArray;
import org.json.JSONObject;

import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.Data;
import br.net.lls.fatcafe.dao.FatcafeSql;

@Repository
public class JpaFatcafeDao implements FatcafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void remove(int id) {};
	
	public List getListById(int id) { return null; };
	
	private void rodarMovimento(Relatorio relatorio) {

		Session session = (Session) entityManager.getDelegate();
		
		String consulta = FatcafeSql.getConsulta(relatorio);
						
		if (relatorio.getIdFazenda() > 0) {
			
			consulta += "AND cafe.id = :idFazenda";
			
		}
		
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("idFazenda", relatorio.getIdFazenda());
			
		}
		
		query.setParameter("dataFinal", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}

	private List getFatcafeIds(Relatorio relatorio) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT fazendaProdutor_id " +
							"FROM Fatcafe " +
							"WHERE data = :data " +
							"AND armazenagem = 0 ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("data", relatorio.getDataFinal());
		
		return query.list();
		
	}

	private void calculaArmazenagem(int idFazenda, Relatorio relatorio) {
	
		Session session = (Session) entityManager.getDelegate();

		String consulta = FatcafeSql.getConsultaArmazenagem();
		
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("idFazenda", relatorio.getIdFazenda());
			
		}
		else {
			
			query.setParameter("idFazenda", idFazenda);
			
		}
		
		query.setParameter("dataFinal", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}
	
	public Date getDataFatEmpresa() {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT dataCafe " +
							"FROM Empresa " +
								"WHERE id = '1' ";
						
		Query query = session.createSQLQuery(consulta);
		
		List empresaList = query.list();
		
		Date dataFaturamento = null;
		
		for (Iterator iterator = empresaList.iterator(); iterator.hasNext();) {
			
			dataFaturamento = (Date) iterator.next();
			
		}
		
		return dataFaturamento;
		
	}

	private Date getDataFatCafe(int id) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT dataFaturamento " +
							"FROM Cafe " +
								"WHERE id = :id ";
						
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", id);
		
		List empresaList = query.list();
		
		Date dataFaturamento = null;
		
		for (Iterator iterator = empresaList.iterator(); iterator.hasNext();) {
			
			dataFaturamento = (Date) iterator.next();
			
		}
		
		return dataFaturamento;
		
	}

	public void setFaturamento(Relatorio relatorio) {
		
		updateCafe(relatorio);
		
		rodarMovimento(relatorio);
		
		if (relatorio.getIdFazenda() == 0) {
		
			List fatCafeList = getFatcafeIds(relatorio);
		
			for (Iterator iterator = fatCafeList.iterator(); iterator.hasNext();) {
					
				int id = (Integer) iterator.next();
				
				calculaArmazenagem(id, relatorio);
				
			}
		
		}
		else {
		
			calculaArmazenagem(relatorio.getIdFazenda(), relatorio);
			
		}
		
	}
	
	public Date getDataUltimoFaturamento(Relatorio relatorio) {
		
		Date dataUltimoFaturamento = null;
			
		if (relatorio.getIdFazenda() == 0) {
			
			dataUltimoFaturamento = getDataFatEmpresa();
			
		}
		else {
			
			dataUltimoFaturamento = getDataFatCafe(relatorio.getIdFazenda());
			
		}
		
		return dataUltimoFaturamento;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT fatCafe.fazendaProdutor_id, " +
								 "fatCafe.data AS data, " +
								 "IFNULL(fatCafe.saldoAnterior,0), " +
								 "IFNULL(fatCafe.entradas,0), " +
								 "IFNULL(fatCafe.saidas,0), " +
								 "IFNULL(fatCafe.quebras,0), " +
								 "IFNULL(fatCafe.acrescimos,0), " +
								 "IFNULL(fatCafe.recebidas,0), " +
								 "IFNULL(fatCafe.emitidas,0), " +
								 "IFNULL(fatCafe.saldo,0), " +
								 "IFNULL(fatCafe.armazenagem, 0), " +
								 "IFNULL(fatCafe.servicos, 0), " +
								 "IFNULL(fatCafe.total, 0) ";
								  
		String tabela = "FROM Fatcafe fatCafe ";
		
		String campoIdFazenda = "";
		
		String condicao = "WHERE IFNULL(fatCafe.total,0) > 0 ";
		
		String ordenacao = "ORDER BY data, IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, '') ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT SUM(fatcafe.QTD) AS QTD, " +
								"SUM(fatcafe.SALDO_ATUAL) + SUM(fatcafe.SAIDAS) - SUM(fatcafe.ENTRADAS) + " +
								"SUM(fatcafe.QUEBRAS) - SUM(fatcafe.ACRESCIMOS) - SUM(fatcafe.RECEBIDAS) + " +
								"SUM(fatcafe.EMITIDAS) AS SALDO_ANTERIOR, " +
								"SUM(fatcafe.ENTRADAS) AS ENTRADAS, " +
								"SUM(fatcafe.SAIDAS) AS SAIDAS, " +
								"SUM(fatcafe.QUEBRAS) AS QUEBRAS, " +
								"SUM(fatcafe.ACRESCIMOS) AS ACRESCIMOS, " +
								"SUM(fatcafe.RECEBIDAS) AS RECEBIDAS, " +
								"SUM(fatcafe.EMITIDAS) AS EMITIDAS, " +
								"SUM(fatcafe.SALDO_ATUAL) AS SALDO_ATUAL, " +
								"SUM(ARMAZENAGEM) AS ARMAZENAGEM, " +
								"SUM(SERVICOS) AS SERVICOS, " +
								"SUM(ARMAZENAGEM) + SUM(SERVICOS) AS TOTAL, " +
								"fatcafe.id AS ID " +
	
				"FROM ( " +
				
					"SELECT 0 AS ID, " +
							"0 AS QTD, " +
							"0 AS SALDO_ANTERIOR, " +
							"0 AS ENTRADAS, " +
							"0 AS SAIDAS, " +
							"0 AS QUEBRAS, " +
							"0 AS ACRESCIMOS, " +
							"0 AS RECEBIDAS, " +
							"0 AS EMITIDAS, " +
							"SUM(saldo) AS SALDO_ATUAL, " +
							"0 AS ARMAZENAGEM, " +
							"0 AS SERVICOS " +
						"FROM Fatcafe fatCafe " +
							"INNER JOIN Empresa empresa " +
							"ON empresa.id = 1 " +
							"INNER JOIN Cafe cafe " +
							"ON fatCafe.fazendaProdutor_id = cafe.id ";
							
		String consultaData = "WHERE fatCafe.data = " +
									
									"if( " +
										"DATEDIFF(:dataFinal, " +
											"if( " +
												"DATEDIFF(cafe.dataFaturamento, empresa.dataCafe) > 0, " +
												"cafe.dataFaturamento, empresa.dataCafe " +
											") " +
										") < 0, " +
										
											"(SELECT fatCafe.data AS DATA " +
												"FROM Fatcafe fatcafe " +
													"WHERE fatcafe.data <= :dataFinal " +
													"AND fatcafe.fazendaProdutor_id = fatCafe.fazendaProdutor_id " +
														"ORDER BY DATA DESC " +
														"LIMIT 1), " +
											"if( " +
												"DATEDIFF(cafe.dataFaturamento, empresa.dataCafe) > 0, " +
												"cafe.dataFaturamento, empresa.dataCafe " +
											") " +
									") ";
							
		String consulta2 = "UNION ALL " +
		
					"SELECT 0 AS ID, " +
							"COUNT(fatCafe.fazendaProdutor_id) AS QTD, " +
							"0 AS SALDO_ANTERIOR, " +
							"SUM(fatCafe.entradas) AS ENTRADAS, " +
							"SUM(fatCafe.saidas) AS SAIDAS, " +
							"SUM(fatCafe.quebras) AS QUEBRAS, " +
							"SUM(fatCafe.acrescimos) AS ACRESCIMOS, " +
							"SUM(fatCafe.recebidas) AS RECEBIDAS, " +
							"SUM(fatCafe.emitidas) AS EMITIDAS, " +
							"0 AS SALDO_ATUAL, " +
							"SUM(fatCafe.armazenagem) AS ARMAZENAGEM, " +
							"SUM(fatCafe.servicos) AS SERVICOS " +
						"FROM Fatcafe fatCafe " +
							"INNER JOIN Cafe cafe " +
							"ON fatCafe.fazendaProdutor_id = cafe.id ";
							
		String consulta3 = "WHERE fatCafe.data >= :dataInicial " +
							"AND fatCafe.data <= :dataFinal ";
		
		String consulta4 = ") AS fatcafe " +
							"GROUP BY ID";
		
		String consultaProdutor = "INNER JOIN FazendaProdutor fazendaProdutor " +
								  "ON fatCafe.fazendaProdutor_id = fazendaProdutor.id ";
		
		String fazenda = "AND fatCafe.fazendaProdutor_id = '" + relatorio.getIdFazenda() + "' ";
		String produtor = "AND fazendaProdutor.produtor_id = '" + relatorio.getIdProdutor() + "' ";
		
		if (relatorio.getIdFazenda() > 0) {
			
			if (relatorio.getIdProdutor() == 0) {
			
				consulta += fazenda;
				consulta2 += fazenda;
				
			
			} else {
				
				consultaProdutor += produtor;
				
				consulta += consultaProdutor;
				consulta2 += consultaProdutor;
				
			}
			
		}
		
		consulta += consultaData + consulta2 + consulta3 + consulta4;
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("dataInicial", relatorio.getDataInicial());
		query.setParameter("dataFinal", relatorio.getDataFinal());
		
		return query.list();
		
	}
	
	public JSONArray getListaJSONArray(Relatorio relatorio) {
		
		List list = getList(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("id", object[0]);
			jsonObject.put("data", object[1]);
			jsonObject.put("anterior", object[2]);
			jsonObject.put("entradas", object[3]);
			jsonObject.put("saidas", object[4]);
			jsonObject.put("quebras", object[5]);
			jsonObject.put("acrescimos", object[6]);
			jsonObject.put("recebidas", object[7]);
			jsonObject.put("emitidas", object[8]);
			jsonObject.put("saldo", object[9]);
			jsonObject.put("armazenagem", object[10]);
			jsonObject.put("servicos", object[11]);
			jsonObject.put("total", object[12]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 13);
			
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
			jsonObject.put("anterior", object[1]);
			jsonObject.put("entradas", object[2]);
			jsonObject.put("saidas", object[3]);
			jsonObject.put("quebras", object[4]);
			jsonObject.put("acrescimos", object[5]);
			jsonObject.put("recebidas", object[6]);
			jsonObject.put("emitidas", object[7]);
			jsonObject.put("saldo", object[8]);
			jsonObject.put("armazenagem", object[9]);
			jsonObject.put("servicos", object[10]);
			jsonObject.put("total", object[11]);
			
		}
		
		return jsonObject;
		
	}
	
	private void updateCafe(Relatorio relatorio) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String nomeTabela[] = {"Entcafe","Oscafe","Tracafe","Saicafe","Tracafe"};
		
		for( int i = 0; i < nomeTabela.length; i++) {
			
			String consulta = FatcafeSql.getConsultaCafe(relatorio, nomeTabela[i], i);
						
			Query query = session.createSQLQuery(consulta);
			
			query.setParameter("dataInicial", relatorio.getDataInicial());
			query.setParameter("dataFinal", relatorio.getDataFinal());
			
			query.executeUpdate();
			
		}
		
	}
	
}
