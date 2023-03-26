package br.net.lls.cafe.dao;

import java.util.Set;
import java.util.HashSet;
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
import javax.servlet.http.HttpSession;

import br.net.lls.cadastro.Usuario;

import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Entlote;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaEntcafeDao implements EntcafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public List getListById(int id) { return null; }
	
	public void adiciona(Entcafe entcafe) {
		
		urlDecoder(entcafe);
		
		entityManager.persist(entcafe);
		
	}
	
	public void altera(Entcafe entcafe) {
		
		urlDecoder(entcafe);
		
		entityManager.merge(entcafe);
		
	}
	
	public void remove(int id) {
		
		Entcafe entcafe = buscaPorId(id);
		
		entityManager.remove(entcafe);
		
	}
	
	public Entcafe buscaPorId(int id) {
		
		return entityManager.find(Entcafe.class, id);
		
	}
	
	public Entcafe urlDecoder(Entcafe entcafe) {
		 
		 if (entcafe != null) {
		 
			 try {
			
				entcafe.setObservacao(URLDecoder.decode(entcafe.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return entcafe;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT entcafe.id AS id, " +
								"entcafe.data AS data, " +
								"entcafe.lote AS lote, " +
								"entcafe.placa, " +
								"entcafe.ticket, " +
								"CASE " + 
									"WHEN entcafe.sacas = 0 THEN entcafe.sacasNota " +
									"ELSE entcafe.sacas " +
								"END AS sacas," +
								"CASE " + 
									"WHEN entcafe.peso = 0 THEN entcafe.pesoNota " +
									"ELSE entcafe.peso " +
								"END AS peso ";
									
		String tabela = "FROM Entcafe entcafe ";
		
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getTipoConsulta(relatorio.getTipo(), "entcafe");
		
		String ordenacao = "ORDER BY data, CAST(REPLACE(lote,'GR', '') AS unsigned) " +
			Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(entcafe.id), " +
								"SUM(" +
									"CASE " + 
										"WHEN entcafe.sacas = 0 THEN entcafe.sacasNota " +
										"ELSE entcafe.sacas " +
									"END" +
								"), " +
								"SUM(" +
									"CASE " + 
										"WHEN entcafe.peso = 0 THEN entcafe.pesoNota " +
										"ELSE entcafe.peso " +
									"END" +
								") " +
							"FROM Entcafe entcafe ";
			
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getTipoConsulta(relatorio.getTipo(), "entcafe");
		
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
			jsonObject.put("lote", object[2]);
			jsonObject.put("placa", object[3]);
			jsonObject.put("ticket", object[4]);
			jsonObject.put("sacas", object[5]);
			jsonObject.put("peso", object[6]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 7);
		
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
			jsonObject.put("sacas", object[1]);
			jsonObject.put("peso", object[2]);
			
		}
		
		return jsonObject;
		
	}
	
	public JSONObject getJSONById(Entcafe entcafe, JSONObject entcafeJSONObject, int sacasDesdobras) {
		
		int sacasRestantes = 0;
		
		if (entcafe.getSacas() > 0) sacasRestantes = entcafe.getSacas() - sacasDesdobras;
		else sacasRestantes = entcafe.getSacasNota();
		
		FazendaProdutor fazendaProdutor = entcafe.getFazendaProdutor();
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		entcafeJSONObject.put("id", entcafe.getId());
		entcafeJSONObject.put("data", entcafe.getDate());
		entcafeJSONObject.put("lote", entcafe.getLote());
		entcafeJSONObject.put("nota", entcafe.getNota());
		entcafeJSONObject.put("valor", entcafe.getValor());
		entcafeJSONObject.put("placa", entcafe.getPlaca());
		entcafeJSONObject.put("ticket", entcafe.getTicket());
		entcafeJSONObject.put("sacasNota", entcafe.getSacasNota());
		entcafeJSONObject.put("pesoNota", entcafe.getPesoNota());
		entcafeJSONObject.put("sacas", entcafe.getSacas());
		entcafeJSONObject.put("peso", entcafe.getPeso());
		entcafeJSONObject.put("idProdutor", produtor.getId());
		entcafeJSONObject.put("produtor", produtor.getNome());
		entcafeJSONObject.put("idFazenda", fazendaProdutor.getId());
		entcafeJSONObject.put("fazenda", fazendaProdutor.getNome());
		entcafeJSONObject.put("desdobras", entcafe.getDesdobras());
		entcafeJSONObject.put("fechado", entcafe.getFechado());
		entcafeJSONObject.put("cobrar", entcafe.getCobrar());
		entcafeJSONObject.put("usuario", entcafe.getUsuario());
		entcafeJSONObject.put("sacasDesdobras", sacasDesdobras);
		entcafeJSONObject.put("sacasRestantes", sacasRestantes);
		entcafeJSONObject.put("observacao", entcafe.getObservacao());
		
		return entcafeJSONObject;
		
	}
	
	public JSONObject getJSONById(Entcafe entcafe, JSONObject entcafeJSONObject) {
		
		int sacas = entcafe.getSacas();
		BigDecimal peso = entcafe.getPeso();
		
		if (sacas == 0) {
			
			sacas = entcafe.getSacasNota();
			peso = entcafe.getPesoNota();
			
		}
		
		entcafeJSONObject.put("id", entcafe.getId());
		entcafeJSONObject.put("lote", entcafe.getLote());
		entcafeJSONObject.put("ticket", entcafe.getTicket());
		entcafeJSONObject.put("sacas", sacas);
		entcafeJSONObject.put("peso", peso);
		entcafeJSONObject.put("desdobras", entcafe.getDesdobras());
		entcafeJSONObject.put("cobrar", entcafe.getCobrar());
		
		return entcafeJSONObject;
		
	}
	
	public void checkFechado(Entcafe entcafe, Entlote entlote, HttpSession session) {
		
		entcafe.setSacas(entlote.getSacas());
		entcafe.setPeso(entlote.getPeso());
		entcafe.setDesdobras(entlote.getDesdobras());
		entcafe.setCobrar(entlote.getCobrar());
		
		Set<Lote> lotes = new HashSet<Lote>();
			
		lotes = entcafe.getLotes();
		
		int sacasDesdobras = 0;
		
		BigDecimal pesoDesdobras = new BigDecimal(0.00);
		
		for (Lote lote : lotes) {
			
			sacasDesdobras = sacasDesdobras + lote.getSacas();
			pesoDesdobras = pesoDesdobras.add(lote.getPeso());
			
		}
		
		boolean fechado = false;
		
		if (sacasDesdobras == entcafe.getSacas() &&
			pesoDesdobras.compareTo(entcafe.getPeso()) == 0) fechado = true;
		
		setFechado(entcafe, fechado, session);
		
	}
	
	public void setFechado(Entcafe entcafe, boolean fechado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		entcafe.setUsuario(usuario.getEmail());
		entcafe.setFechado(fechado);
			
		altera(entcafe);
		
	}
	
}
