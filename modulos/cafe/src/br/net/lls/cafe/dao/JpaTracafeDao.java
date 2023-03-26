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
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.TracafeDespejo;
import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaTracafeDao implements TracafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public List getListById(int id) { return null; }
	
	public void adiciona(Tracafe tracafe) {
		
		urlDecoder(tracafe);
		
		entityManager.persist(tracafe);
		
	}
	
	public void altera(Tracafe tracafe) {
		
		urlDecoder(tracafe);
		
		entityManager.merge(tracafe);
		
	}
	
	public void remove(int id) {
		
		Tracafe tracafe = buscaPorId(id);
		
		entityManager.remove(tracafe);
		
	}
	
	public Tracafe buscaPorId(int id) {
		
		return entityManager.find(Tracafe.class, id);
		
	}
	
	public Tracafe urlDecoder(Tracafe tracafe) {
		 
		 if (tracafe != null) {
		 
			 try {
			
				tracafe.setObservacao(URLDecoder.decode(tracafe.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return tracafe;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT tracafe.id AS id, " +
								"tracafe.data AS data, " +
								"tracafe.lote AS lote, " +
								"tracafe.sacas AS sacas, " +
								"tracafe.peso AS peso ";
									
		String tabela = "FROM Tracafe tracafe ";
		
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "tracafe");
		
		String ordenacao = "ORDER BY data, CAST(REPLACE(lote,'GT', '') AS unsigned) " +
			Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(tracafe.id), " +
								"SUM(tracafe.sacas), " +
								"SUM(tracafe.peso) " +
							"FROM Tracafe tracafe ";
			
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "tracafe");
		
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
			jsonObject.put("sacas", object[3]);
			jsonObject.put("peso", object[4]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 5);
		
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
	
	public JSONObject getJSONById(Tracafe tracafe, JSONObject tracafeJSONObject, int sacasCafeFormacao) {
		
		int sacasRestantes = 0;
		
		sacasRestantes = tracafe.getSacas() - sacasCafeFormacao;
		
		FazendaProdutor fazendaProdutor = tracafe.getFazendaProdutor();
		Produtor produtor = fazendaProdutor.getProdutor();
		
		FazendaProdutor fazendaDestino = tracafe.getFazendaDestino();
		Produtor produtorDestino = fazendaDestino.getProdutor();
		
		tracafeJSONObject.put("data", tracafe.getDate());
		tracafeJSONObject.put("idProdutor", produtor.getId());
		tracafeJSONObject.put("produtor", produtor.getNome());
		tracafeJSONObject.put("idFazenda", fazendaProdutor.getId());
		tracafeJSONObject.put("fazenda", fazendaProdutor.getNome());
		tracafeJSONObject.put("idProdutorDestino", produtorDestino.getId());
		tracafeJSONObject.put("produtorDestino", produtorDestino.getNome());
		tracafeJSONObject.put("idFazendaDestino", fazendaDestino.getId());
		tracafeJSONObject.put("fazendaDestino", fazendaDestino.getNome());
		tracafeJSONObject.put("statusCafe", tracafe.getStatusNome());
		tracafeJSONObject.put("indexStatus", Status.getStatusIndex(tracafe.getStatus()));
		tracafeJSONObject.put("usuario", tracafe.getUsuario());
		tracafeJSONObject.put("sacasDesdobras", sacasCafeFormacao);
		tracafeJSONObject.put("sacasRestantes", sacasRestantes);
		tracafeJSONObject.put("observacao", tracafe.getObservacao());
		
		return calculaResultado(tracafe, tracafeJSONObject, 2);
		
	}
	
	public JSONObject getJSONById(Tracafe tracafe, JSONObject tracafeJSONObject) {
		
		return calculaResultado(tracafe, tracafeJSONObject, 1);
		
	}
	
	public void checkStatusDespejado(Tracafe tracafe, Lote despejo, HttpSession session) {
		
		if (despejo == null) {
			despejo = new Lote();
			despejo.setPeso(new BigDecimal(0.00));
		}
		
		Set<TracafeDespejo> tracafeDespejos = new HashSet<TracafeDespejo>();
		
		tracafeDespejos = tracafe.getTracafeDespejos();
		
		int sacasTotal = 0;
		BigDecimal pesoTotal = new BigDecimal(0.00);
				
		if (tracafeDespejos.isEmpty() || tracafeDespejos == null) {
			
			sacasTotal = despejo.getSacas();
			pesoTotal = despejo.getPeso();
			
		}
		else {
			
			int count = 0;
			
			for (TracafeDespejo tracafeDespejo : tracafeDespejos) {
				
				sacasTotal += tracafeDespejo.getSacas();
				pesoTotal = pesoTotal.add(tracafeDespejo.getPeso());
				
				if (tracafeDespejo.getLote().getId() == despejo.getId()) count++;
				
			}
			
			if (count == 0) {
				sacasTotal += despejo.getSacas();
				pesoTotal = pesoTotal.add(despejo.getPeso());
			}
			
		}
		
		boolean despejado = false;
		
		if (sacasTotal == tracafe.getSacas()) {
			
			despejado = true;
			
			tracafe.setPeso(pesoTotal);
			
		}
		
		setStatusDespejado(tracafe, despejado, session);
		
	}
	
	public void setStatusDespejado(Tracafe tracafe, boolean despejado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		tracafe.setUsuario(usuario.getEmail());
		tracafe.setStatusDespejado(despejado);
		
		if (!despejado) {
			
			BigDecimal peso = new BigDecimal(60.50);
			
			peso  = peso.multiply(new BigDecimal(tracafe.getSacas()));
			
			tracafe.setPeso(peso);
			
		}
			
		altera(tracafe);
		
	}
	
	public void checkStatusFechado(Tracafe tracafe, Lote desdobra, HttpSession session) {
		
		Set<Lote> lotes = new HashSet<Lote>();
		
		lotes = tracafe.getLotes();
		
		int sacasTotal = 0;
		
		BigDecimal pesoTotal = new BigDecimal(0.00);
				
		if (lotes.isEmpty() || lotes == null) {
			
			sacasTotal = desdobra.getSacas();
			pesoTotal = desdobra.getPeso();
			
		}
		else {
			
			int count = 0;
			
			for (Lote lote : lotes) {
				
				sacasTotal += lote.getSacas();
				pesoTotal = pesoTotal.add(lote.getPeso());
				
				if (lote.getId() == desdobra.getId()) count++;
				
			}
			
			if (count == 0) {
				sacasTotal += desdobra.getSacas();
				pesoTotal = pesoTotal.add(desdobra.getPeso());
			}
			
		}
		
		boolean fechado = false;
		
		if (sacasTotal == tracafe.getSacas() &&
			pesoTotal.compareTo(tracafe.getPeso()) == 0) fechado = true;
		
		setStatusFechado(tracafe, fechado, session);
		
	}
	
	public void setStatusFechado(Tracafe tracafe, boolean fechado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		tracafe.setUsuario(usuario.getEmail());
		tracafe.setStatusFechado(fechado);
			
		altera(tracafe);
		
	}
	
	private JSONObject calculaResultado(Tracafe tracafe, JSONObject tracafeJSONObject, int tipo) {
		
		tracafeJSONObject.put("id", tracafe.getId());
		tracafeJSONObject.put("lote", tracafe.getLote());
		tracafeJSONObject.put("desdobras", tracafe.getDesdobras());
		tracafeJSONObject.put("sacas", tracafe.getSacas());
		tracafeJSONObject.put("peso", tracafe.getPeso());
		
		if (tipo == 1) {
		
			tracafeJSONObject.put("sacasDespejo", tracafe.getSacas());
			tracafeJSONObject.put("pesoDespejo", tracafe.getPeso());

		}
		else {
			
			tracafeJSONObject.put("sacasResultado", tracafe.getSacas());
			tracafeJSONObject.put("pesoResultado", tracafe.getPeso());
			
		}
		
		return tracafeJSONObject;
		
	}
	
}
