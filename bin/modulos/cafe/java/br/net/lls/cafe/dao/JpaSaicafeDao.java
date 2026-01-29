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
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.SaicafeDespejo;
import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaSaicafeDao implements SaicafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public List getListById(int id) { return null; }
	
	public void adiciona(Saicafe saicafe) {
		
		urlDecoder(saicafe);
		
		entityManager.persist(saicafe);
		
	}
	
	public void altera(Saicafe saicafe) {
		
		urlDecoder(saicafe);
		
		entityManager.merge(saicafe);
		
	}
	
	public void remove(int id) {
		
		Saicafe saicafe = buscaPorId(id);
		
		entityManager.remove(saicafe);
		
	}
	
	public Saicafe buscaPorId(int id) {
		
		return entityManager.find(Saicafe.class, id);
		
	}
	
	public Saicafe urlDecoder(Saicafe saicafe) {
		 
		 if (saicafe != null) {
		 
			 try {
			
				saicafe.setDestino(URLDecoder.decode(saicafe.getDestino(), "UTF-8"));
				saicafe.setObservacao(URLDecoder.decode(saicafe.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return saicafe;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT saicafe.id AS id, " +
								"saicafe.data AS data, " +
								"saicafe.lote AS lote, " +
								"saicafe.ticket, " +
								"saicafe.destino, " +
								"IF(saicafe.status = 'FECHADA',saicafe.sacasSaida,saicafe.sacas) AS sacas, " +
								"IF(saicafe.status = 'FECHADA',saicafe.pesoSaida,saicafe.peso) AS peso ";
									
		String tabela = "FROM Saicafe saicafe ";
		
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "saicafe");
		
		String ordenacao = "ORDER BY data, CAST(REPLACE(lote,'GE', '') AS unsigned) " +
			Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(saicafe.id), " +
								"SUM(IF(saicafe.status = 'FECHADA',saicafe.sacasSaida,saicafe.sacas)), " +
								"SUM(IF(saicafe.status = 'FECHADA',saicafe.pesoSaida,saicafe.peso)) " +
							"FROM Saicafe saicafe ";
			
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "saicafe");
		
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
			jsonObject.put("ticket", object[3]);
			jsonObject.put("destino", object[4]);
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
	
	public JSONObject getJSONById(Saicafe saicafe, JSONObject saicafeJSONObject, int sacasDespejo) {
		
		int sacasRestantes = 0;
		
		sacasRestantes = saicafe.getSacas() - sacasDespejo;
		
		FazendaProdutor fazendaProdutor = saicafe.getFazendaProdutor();
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		saicafeJSONObject.put("data", saicafe.getDate());
		saicafeJSONObject.put("ticket", saicafe.getTicket());
		saicafeJSONObject.put("idProdutor", produtor.getId());
		saicafeJSONObject.put("produtor", produtor.getNome());
		saicafeJSONObject.put("idFazenda", fazendaProdutor.getId());
		saicafeJSONObject.put("fazenda", fazendaProdutor.getNome());
		saicafeJSONObject.put("statusCafe", saicafe.getStatusNome());
		saicafeJSONObject.put("indexStatus", Status.getStatusIndex(saicafe.getStatus()));
		saicafeJSONObject.put("usuario", saicafe.getUsuario());
		saicafeJSONObject.put("sacasDesdobras", sacasDespejo);
		saicafeJSONObject.put("sacasRestantes", sacasRestantes);
		saicafeJSONObject.put("destino", saicafe.getDestino());
		saicafeJSONObject.put("cobrar", saicafe.getCobrar());
		saicafeJSONObject.put("observacao", saicafe.getObservacao());
		
		return calculaResultado(saicafe, saicafeJSONObject, 2);
		
	}
	
	public JSONObject getJSONById(Saicafe saicafe, JSONObject saicafeJSONObject) {
		
		return calculaResultado(saicafe, saicafeJSONObject, 1);
		
	}
	
	public void checkStatusDespejado(Saicafe saicafe, Lote despejo, HttpSession session) {
		
		if (despejo == null) {
			despejo = new Lote();
			despejo.setPeso(new BigDecimal(0.00));
		}
		
		Set<SaicafeDespejo> saicafeDespejos = new HashSet<SaicafeDespejo>();
		
		saicafeDespejos = saicafe.getSaicafeDespejos();
		
		int sacasTotal = 0;
		BigDecimal pesoTotal = new BigDecimal(0.00);
				
		if (saicafeDespejos.isEmpty() || saicafeDespejos == null) {
			
			sacasTotal = despejo.getSacas();
			pesoTotal = despejo.getPeso();
			
		}
		else {
			
			int count = 0;
			
			for (SaicafeDespejo saicafeDespejo : saicafeDespejos) {
				
				sacasTotal += saicafeDespejo.getSacas();
				pesoTotal = pesoTotal.add(saicafeDespejo.getPeso());
				
				if (saicafeDespejo.getLote().getId() == despejo.getId()) count++;
				
			}
			
			if (count == 0) {
				sacasTotal += despejo.getSacas();
				pesoTotal = pesoTotal.add(despejo.getPeso());
			}
			
		}
		
		boolean despejado = false;
		
		if (sacasTotal == saicafe.getSacas()) {
			
			despejado = true;
			
			saicafe.setPeso(pesoTotal);
			
		}
		
		setStatusDespejado(saicafe, despejado, session);
		
	}
	
	public void setStatusDespejado(Saicafe saicafe, boolean despejado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		saicafe.setUsuario(usuario.getEmail());
		saicafe.setStatusDespejado(despejado);
		
		if (!despejado) {
			
			BigDecimal peso = new BigDecimal(60.50);
			
			peso  = peso.multiply(new BigDecimal(saicafe.getSacas()));
			
			saicafe.setPeso(peso);
			
		}
		
		altera(saicafe);
		
	}
	
	public void setStatusFechado(Saicafe saicafe, boolean fechado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		saicafe.setUsuario(usuario.getEmail());
		saicafe.setStatusFechado(fechado);
			
		altera(saicafe);
		
	}
	
	private JSONObject calculaResultado(Saicafe saicafe, JSONObject saicafeJSONObject, int tipo) {
		
		saicafeJSONObject.put("id", saicafe.getId());
		saicafeJSONObject.put("lote", saicafe.getLote());
		
		if (tipo == 1) {
		
			saicafeJSONObject.put("cobrar", saicafe.getCobrar());
			saicafeJSONObject.put("observacao", saicafe.getObservacao());
			saicafeJSONObject.put("sacasDespejo", saicafe.getSacas());
			saicafeJSONObject.put("pesoDespejo", saicafe.getPeso());

		}
		else {
			
			saicafeJSONObject.put("sacas", saicafe.getSacas());
			saicafeJSONObject.put("peso", saicafe.getPeso());
			saicafeJSONObject.put("sacasSaida", saicafe.getSacasSaida());
			saicafeJSONObject.put("pesoSaida", saicafe.getPesoSaida());
			
		}
		
		return saicafeJSONObject;
		
	}
	
}
