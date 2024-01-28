package br.net.lls.fatmilho.dao;

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

@Repository
public class JpaFatmilhoDao implements FatmilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void remove(int id) {};
	
	public List getListById(int id) { return null; };
	
	private void rodarMovimento(Relatorio relatorio) {

		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "INSERT INTO Fatmilho (fazendaProdutor_id, data, saldoAnterior, entradas, saidas, saldo, " +
												"recepcao, limpeza, secagem, carga) " +
						"SELECT milho.id," +
								":dataFinal," +
								"(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0))," +
								"IFNULL(entradas.total,0)," +
								"IFNULL(saidas.total,0)," +
								"(IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0))+IFNULL(entradas.total,0)-IFNULL(saidas.total,0), " +
								"IFNULL(entradas.recepcao,0)," +
								"IFNULL(entradas.limpeza,0)," +
								"IFNULL(entradas.secagem,0)," +
								"IFNULL(entradas.carga,0) " +
						"FROM Milho milho " +
						"INNER JOIN Empresa empresa " +
						"ON empresa.id = 1 " +
						
						"LEFT JOIN ( " +
							"SELECT id AS id, " +
									"sum(entAnt.liquido) AS total " +
								"FROM Milho milhoAnt " +
								
								"LEFT JOIN ( " +
									"SELECT fazendaProdutor_id AS idFaz, " +
											"data AS data, " +
											"liquido AS liquido " +
									"FROM Entmilho " +
								") entAnt " +
								"ON entAnt.data <= milhoAnt.dataFaturamento " +
								"AND entAnt.idFaz = milhoAnt.id " +
								"GROUP BY id " +
						") AS entradasAnterior " +
						"ON entradasAnterior.id = milho.id " +
						
						"LEFT JOIN ( " +
							"SELECT id AS id, " +
									"sum(saiAnt.liquido) AS total " +
								"FROM Milho milhoAnt " +
								
								"LEFT JOIN ( " +
									"SELECT fazendaProdutor_id AS idFaz, " +
											"data AS data, " +
											"liquido AS liquido " +
									"FROM Saimilho " +
								") saiAnt " +
								"ON saiAnt.data <= milhoAnt.dataFaturamento " +
								"AND saiAnt.idFaz = milhoAnt.id " +
								"GROUP BY id " +
						") AS saidasAnterior " +
						"ON saidasAnterior.id = milho.id " +
						
						"LEFT JOIN ( " +
							"SELECT id AS id, " +
									"sum(entAtual.recepcao) AS recepcao, " +
									"sum(entAtual.limpeza) AS limpeza, " +
									"sum(entAtual.secagem) AS secagem, " +
									"sum(entAtual.carga) AS carga, " +
									"sum(entAtual.liquido) AS total " +
								"FROM Milho milhoAtual " +
								
								"LEFT JOIN ( " +
									"SELECT fazendaProdutor_id AS idFaz, " +
											"data AS data, " +
											"recepcao AS recepcao, " +
											"limpeza AS limpeza, " +
											"secagem AS secagem, " +
											"carga AS carga, " +
											"liquido AS liquido " +
										"FROM Entmilho " +
								") entAtual " +
								"ON entAtual.data > milhoAtual.dataFaturamento " +
								"AND entAtual.data <= :dataFinal " +
								"AND entAtual.idFaz = milhoAtual.id " +
								"GROUP BY id " +
						") AS entradas " +
						"ON entradas.id = milho.id " +
						
						"LEFT JOIN ( " +
							"SELECT id AS id, " +
									"sum(saiAtual.liquido) AS total " +
								"FROM Milho milhoAtual " +
								
								"LEFT JOIN ( " +
									"SELECT fazendaProdutor_id AS idFaz, " +
											"data AS data, " +
											"liquido AS liquido " +
										"FROM Saimilho " +
								") saiAtual " +
								"ON saiAtual.data > milhoAtual.dataFaturamento " +
								"AND saiAtual.data <= :dataFinal " +
								"AND saiAtual.idFaz = milhoAtual.id " +
								"GROUP BY id " +
						") AS saidas " +
						"ON saidas.id = milho.id " +
						
						"WHERE (IFNULL(entradasAnterior.total,0) - IFNULL(saidasAnterior.total,0)) + IFNULL(entradas.total,0) + IFNULL(saidas.total,0) > 0 " +
						"AND (milho.dataFaturamento = empresa.dataMilho " +
						"OR milho.dataFaturamento < :dataFinal) ";
						
		if (relatorio.getIdFazenda() > 0) {
			
			consulta += "AND milho.id = :idFazenda";
			
		}
		
		Query query = session.createSQLQuery(consulta);
		
		if (relatorio.getIdFazenda() > 0) {
			
			query.setParameter("idFazenda", relatorio.getIdFazenda());
			
		}
		
		query.setParameter("dataFinal", relatorio.getDataFinal());
		
		query.executeUpdate();
		
	}

	private List getFatmilhoIds(Relatorio relatorio) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT fazendaProdutor_id " +
							"FROM Fatmilho " +
							"WHERE data = :data " +
							"AND armazenagem = 0 ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("data", relatorio.getDataFinal());
		
		return query.list();
		
	}

	private void calculaArmazenagem(int idFazenda, Relatorio relatorio) {
	
		Session session = (Session) entityManager.getDelegate();

		String consulta = "UPDATE Fatmilho fatMilho, (" +
				"SELECT id AS ID, " +
					   "SUM(arma.valor) AS VALOR " +
					"FROM ( " +
					"SELECT fatMilho.fazendaProdutor_id AS ID, " +
							"@dias\\:= 0 AS DIAS, " +
							"@anterior\\:= fatMilho.saldoAnterior AS ANTERIOR, " +
							"@preco\\:= (preco.valor/1000) AS PRECO, " +
							"@taxa\\:= (@preco*@dias/30) AS TAXA, " +
							"@valor\\:= 0 AS VALOR, " +
							"@data\\:= milho.dataFaturamento AS DATA, " +
							"@entrada\\:= 0 AS ENTRADA, " +
							"@saida\\:= 0 AS SAIDA, " +
							"@saldo\\:= @anterior AS SALDO " +
						"FROM Fatmilho fatMilho " +
							"INNER JOIN Milho milho " +
							"ON fatMilho.fazendaProdutor_id = milho.id " +
							"INNER JOIN Preco preco " +
							"ON preco.id = 20 " +
							"AND fatMilho.data = :dataFinal " +
							"AND fatMilho.fazendaProdutor_id = :idFazenda " +
							
					 "UNION ALL " +
					 
					 "SELECT entradas.id AS ID, " +
							"@dias\\:= DATEDIFF(entradas.data, @data) AS DIAS, " +
							"@saldo AS ANTERIOR, " +
							"@preco AS PRECO, " +
							"@taxa\\:= (@preco*@dias/30) AS TAXA, " +
							"( " +
							"CASE " +
							"	WHEN @saldo > 0 THEN @valor\\:= (@saldo*@taxa) " +
							"	ELSE @valor\\:= 0 " +
							"END) AS VALOR, " +
							"@data\\:= entradas.data AS DATA, " +
							"@entrada\\:= IFNULL(entradas.liquido, 0) AS ENTRADA, " +
							"@saida\\:= 0 AS SAIDA, " +
							"@saldo\\:= @saldo + @entrada - @saida AS SALDO " +
						"FROM ( " +
							"SELECT fazendaProdutor_id AS ID, " +
									"data AS DATA, " +
									"SUM(liquido) AS LIQUIDO " +
								 "FROM Entmilho " +
									"INNER JOIN Milho milho " +
									"ON fazendaProdutor_id = milho.id " +
									"AND data > milho.dataFaturamento " +
									"AND data <= :dataFinal " +
									"AND fazendaProdutor_id = :idFazenda " +
									"GROUP BY DATA " +
							") entradas " +
									
					"UNION ALL " +
					
					"SELECT saidas.id AS ID, " +
							"@dias\\:= DATEDIFF(saidas.data, @data) AS DIAS, " +
							"@saldo AS ANTERIOR, " +
							"@preco AS PRECO, " +
							"@taxa\\:= (@preco*@dias/30) AS TAXA, " +
							"( " +
							"CASE " +
							"	WHEN @saldo > 0 THEN @valor\\:= (@saldo*@taxa) " +
							"	ELSE @valor\\:= 0 " +
							"END) AS VALOR, " +
							"@data\\:= saidas.data AS DATA, " +
							"@entrada\\:= 0 AS ENTRADA, " +
							"@saida\\:= IFNULL(saidas.liquido, 0) AS SAIDA, " +
							"@saldo\\:= @saldo + @entrada - @saida AS SALDO " +
						"FROM ( " +
							"SELECT fazendaProdutor_id AS ID, " +
									"data AS DATA, " +
									"SUM(liquido) AS LIQUIDO " +
								 "FROM Saimilho " +
									"INNER JOIN Milho milho " +
									"ON fazendaProdutor_id = milho.id " +
									"AND data > milho.dataFaturamento " +
									"AND data <= :dataFinal " +
									"AND fazendaProdutor_id = :idFazenda " +
									"GROUP BY DATA " +
							") saidas " +
							
					 "UNION ALL " +
					 
					 "SELECT fatMilho.fazendaProdutor_id AS ID, " +
							"@dias\\:= DATEDIFF(fatMilho.data, @data) AS DIAS, " +
							"@saldo AS ANTERIOR, " +
							"@preco AS PRECO, " +
							"@taxa\\:= (@preco*@dias/30) AS TAXA, " +
							"@valor\\:= (@saldo*@taxa) AS VALOR, " +
							"@data\\:= fatMilho.data AS DATA, " +
							"@entrada\\:= 0 AS ENTRADA, " +
							"@saida\\:= 0 AS SAIDA, " +
							"@saldo\\:= @saldo + @entrada - @saida AS SALDO " +
						"FROM Fatmilho fatMilho " +
							"WHERE fatMilho.data = :dataFinal " +
							"AND fatMilho.fazendaProdutor_id = :idFazenda " +
					") arma " +
					
				") armazenagem " +
				"SET fatMilho.armazenagem = armazenagem.valor, " +
					"fatMilho.total = armazenagem.valor + " +
									 "fatMilho.limpeza + " +
									 "fatMilho.secagem + " +
									 "fatMilho.carga + " +
									 "fatMilho.recepcao " +
				"WHERE fatMilho.data = :dataFinal " +
				"AND fatMilho.fazendaProdutor_id = armazenagem.id " +
				"AND fatMilho.fazendaProdutor_id = :idFazenda";
		
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

		String consulta = "SELECT dataMilho " +
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

	public Date getDataFatMilho(int id) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT dataFaturamento " +
							"FROM Milho " +
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
		
		rodarMovimento(relatorio);
		
		if (relatorio.getIdFazenda() == 0) {
		
			List fatMilhoList = getFatmilhoIds(relatorio);
		
			for (Iterator iterator = fatMilhoList.iterator(); iterator.hasNext();) {
					
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
			
			dataUltimoFaturamento = getDataFatMilho(relatorio.getIdFazenda());
			
		}
		
		return dataUltimoFaturamento;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT fatMilho.fazendaProdutor_id, " +
								  "fatMilho.data AS data, " +
								  "IFNULL(fatMilho.saldoAnterior,0), " +
								  "IFNULL(fatMilho.entradas,0), " +
								  "IFNULL(fatMilho.saidas,0), " +
								  "IFNULL(fatMilho.saldo,0), " +
								  "IFNULL(fatMilho.armazenagem, 0), " +
								  "IFNULL(fatMilho.limpeza,0), " +
								  "IFNULL(fatMilho.secagem,0), " +
								  "IFNULL(fatMilho.carga,0), " +
								  "IFNULL(fatMilho.recepcao,0), " +
								  "IFNULL(fatMilho.total, 0) ";
								  
		String tabela = "FROM Fatmilho fatMilho ";
		
		String campoIdFazenda = "";
		
		String condicao = "WHERE IFNULL(fatMilho.total,0) > 0 ";
		
		String ordenacao = "ORDER BY data, IFNULL(produtor.nome, ''), IFNULL(fazendaProdutor.nome, '') ";
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT SUM(fatmilho.QTD) AS QTD, " +
									"CASE WHEN (SUM(fatmilho.SALDO_ATUAL) + SUM(fatmilho.SAIDAS) - SUM(fatmilho.ENTRADAS) < 0) " +
										"THEN ((SUM(fatmilho.SALDO_ATUAL) + SUM(fatmilho.SAIDAS) - SUM(fatmilho.ENTRADAS)) * -1) " +
										"ELSE SUM(fatmilho.SALDO_ATUAL) + SUM(fatmilho.SAIDAS) - SUM(fatmilho.ENTRADAS) " +
									"END AS SALDO_ANTERIOR, " +
									"SUM(fatmilho.ENTRADAS) AS ENTRADAS, " +
									"SUM(fatmilho.SAIDAS) AS SAIDAS, " +
									"SUM(fatmilho.SALDO_ATUAL) AS SALDO_ATUAL, " +
									"SUM(fatmilho.ARMAZENAGEM) AS ARMAZENAGEM, " +
									"SUM(fatmilho.LIMPEZA) AS LIMPEZA, " +
									"SUM(fatmilho.SECAGEM) AS SECAGEM, " +
									"SUM(fatmilho.CARGA) AS CARGA, " +
									"SUM(fatmilho.RECEPCAO) AS RECEPCAO, " +
									"SUM(fatmilho.ARMAZENAGEM) + SUM(fatmilho.RECEPCAO) + " +
									"SUM(fatmilho.LIMPEZA) + SUM(fatmilho.SECAGEM) + " +
									"SUM(fatmilho.CARGA) AS TOTAL, " +
									"fatmilho.id AS ID " +
								
								"FROM ( " +
								
									"SELECT 0 AS ID, " +
											"0 AS QTD, " +
											"0 AS SALDO_ANTERIOR, " +
											"0 AS ENTRADAS, " +
											"0 AS SAIDAS, " +
											"SUM(saldo) AS SALDO_ATUAL, " +
											"0 AS ARMAZENAGEM, " +
											"0 AS LIMPEZA, " +
											"0 AS SECAGEM, " +
											"0 AS CARGA, " +
											"0 AS RECEPCAO " +
										"FROM Fatmilho fatMilho " +
										"INNER JOIN Milho milho " +
										"ON fatMilho.fazendaProdutor_id = milho.id " +
										"INNER JOIN Empresa empresa " +
										"ON empresa.id = 1 " +
											"WHERE fatMilho.data = " +
						"if( " +
							"DATEDIFF(:dataFinal, " +
								"if( " +
									"DATEDIFF(milho.dataFaturamento, empresa.dataMilho) > 0, " +
									"milho.dataFaturamento, empresa.dataMilho " +
								") " +
							") < 0, " +
								"(SELECT fatMilho.data AS DATA " +
									"FROM Fatmilho fatMilho " +
										"WHERE fatMilho.data <= :dataFinal " +
										"AND fatMilho.fazendaProdutor_id = fatMilho.fazendaProdutor_id " +
											"ORDER BY DATA DESC " +
											"LIMIT 1), " +
								"if( " +
									"DATEDIFF(milho.dataFaturamento, empresa.dataMilho) > 0, " +
									"milho.dataFaturamento, empresa.dataMilho " +
								") " +
						") ";
							
		String consulta2 = "UNION ALL " +
		
					"SELECT 0 AS ID, " +
							"COUNT(fatMilho.fazendaProdutor_id) AS QTD, " +
							"0 AS SALDO_ANTERIOR, " +
							"SUM(fatMilho.entradas) AS ENTRADAS, " +
							"SUM(fatMilho.saidas) AS SAIDAS, " +
							"0 AS SALDO_ATUAL, " +
							"SUM(fatMilho.armazenagem) AS ARMAZENAGEM, " +	
							"SUM(fatMilho.limpeza) AS LIMPEZA, " +
							"SUM(fatMilho.secagem) AS SECAGEM, " +
							"SUM(fatMilho.carga) AS CARGA, " +
							"SUM(fatMilho.recepcao) AS RECEPCAO " +
						"FROM Fatmilho fatMilho " +
						"INNER JOIN Milho milho " +
						"ON fatMilho.fazendaProdutor_id = milho.id " +
							"WHERE fatMilho.data >= :dataInicial " +
							"AND fatMilho.data <= :dataFinal ";
		
		String consulta3 = ") AS fatmilho " +
							"GROUP BY ID";
						
		String fazenda = "AND fatMilho.fazendaProdutor_id = '" + relatorio.getIdFazenda() + "' ";
		
		if (relatorio.getIdFazenda() > 0) {
			
			consulta += fazenda;
			consulta2 += fazenda;
			
		}
		
		consulta += consulta2 + consulta3;
		
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
			jsonObject.put("saldo", object[5]);
			
			jsonObject.put("armazenagem", object[6]);
			jsonObject.put("limpeza", object[7]);
			jsonObject.put("secagem", object[8]);
			jsonObject.put("carga", object[9]);
			jsonObject.put("recepcao", object[10]);
			
			jsonObject.put("total", object[11]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 12);
			
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
			jsonObject.put("anterior", object[1]);
			jsonObject.put("entradas", object[2]);
			jsonObject.put("saidas", object[3]);
			jsonObject.put("saldo", object[4]);
			
			jsonObject.put("armazenagem", object[5]);
			jsonObject.put("limpeza", object[6]);
			jsonObject.put("secagem", object[7]);
			jsonObject.put("carga", object[8]);
			jsonObject.put("recepcao", object[9]);
			
			jsonObject.put("total", object[10]);
			
		}
		
		return jsonObject;
		
	}
	
}
