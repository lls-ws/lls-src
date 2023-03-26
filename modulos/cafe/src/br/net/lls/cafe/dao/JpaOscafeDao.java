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
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

@Repository
public class JpaOscafeDao implements OscafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public List getListById(int id) { return null; }
	
	public void adiciona(Oscafe oscafe) {
		
		urlDecoder(oscafe);
		
		entityManager.persist(oscafe);
		
	}
	
	public void altera(Oscafe oscafe) {
		
		urlDecoder(oscafe);
		
		entityManager.merge(oscafe);
		
	}
	
	public void remove(int id) {
		
		Oscafe oscafe = buscaPorId(id);
		
		entityManager.remove(oscafe);
		
	}
	
	public Oscafe buscaPorId(int id) {
		
		return entityManager.find(Oscafe.class, id);
		
	}
	
	public Oscafe urlDecoder(Oscafe oscafe) {
		 
		 if (oscafe != null) {
		 
			 try {
			
				oscafe.setInstrucoes(URLDecoder.decode(oscafe.getInstrucoes(), "UTF-8"));
				oscafe.setObservacao(URLDecoder.decode(oscafe.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return oscafe;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT oscafe.id AS id, " +
								"oscafe.data AS data, " +
								"oscafe.lote AS lote, " +
								"IF(oscafe.status = 'FECHADA',oscafe.sacas-oscafe.sacasQuebra+oscafe.sacasAcrescimo,oscafe.sacas) AS sacas, " +
								"IF(oscafe.status = 'FECHADA',oscafe.peso-oscafe.pesoQuebra+oscafe.pesoAcrescimo,oscafe.peso) AS peso ";
									
		String tabela = "FROM Oscafe oscafe ";
		
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "oscafe");
		
		String ordenacao = "ORDER BY data, CAST(REPLACE(lote,'OS', '') AS unsigned) " +
			Consulta.getOrdem(relatorio);
		
		Session session = (Session) entityManager.getDelegate();
		
		return Consulta.getList(relatorio, consulta, tabela, ordenacao, campoIdFazenda, condicao, session);
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(oscafe.id), " +
								"SUM(IF(oscafe.status = 'FECHADA',oscafe.sacas-oscafe.sacasQuebra+oscafe.sacasAcrescimo,oscafe.sacas)), " +
								"SUM(IF(oscafe.status = 'FECHADA',oscafe.peso-oscafe.pesoQuebra+oscafe.pesoAcrescimo,oscafe.peso)) " +
							"FROM Oscafe oscafe ";
			
		String campoIdFazenda = "";
		
		String condicao = ConsultaSql.getStatusConsulta(relatorio.getTipo(), "oscafe");
		
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
	
	public JSONObject getJSONById(Oscafe oscafe, JSONObject oscafeJSONObject, int sacasCafeFormacao) {
		
		int sacasRestantes = 0;
		
		sacasRestantes = oscafe.getSacas() - sacasCafeFormacao;
		
		FazendaProdutor fazendaProdutor = oscafe.getFazendaProdutor();
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		oscafeJSONObject.put("data", oscafe.getDate());
		oscafeJSONObject.put("idProdutor", produtor.getId());
		oscafeJSONObject.put("produtor", produtor.getNome());
		oscafeJSONObject.put("idFazenda", fazendaProdutor.getId());
		oscafeJSONObject.put("fazenda", fazendaProdutor.getNome());
		oscafeJSONObject.put("statusCafe", oscafe.getStatusNome());
		oscafeJSONObject.put("indexStatus", Status.getStatusIndex(oscafe.getStatus()));
		oscafeJSONObject.put("usuario", oscafe.getUsuario());
		oscafeJSONObject.put("sacasDesdobras", sacasCafeFormacao);
		oscafeJSONObject.put("sacasRestantes", sacasRestantes);
		oscafeJSONObject.put("instrucoes", oscafe.getInstrucoes());
		oscafeJSONObject.put("observacao", oscafe.getObservacao());
		
		return calculaResultado(oscafe, oscafeJSONObject, 2);
		
	}
	
	public JSONObject getJSONById(Oscafe oscafe, JSONObject oscafeJSONObject) {
		
		return calculaResultado(oscafe, oscafeJSONObject, 1);
		
	}
	
	public void checkStatusDespejado(Oscafe oscafe, Lote despejo, HttpSession session) {
		
		if (despejo == null) {
			despejo = new Lote();
			despejo.setPeso(new BigDecimal(0.00));
		}
		
		Set<OscafeDespejo> oscafeDespejos = new HashSet<OscafeDespejo>();
		
		oscafeDespejos = oscafe.getOscafeDespejos();
		
		int sacasTotal = 0;
		BigDecimal pesoTotal = new BigDecimal(0.00);
				
		if (oscafeDespejos.isEmpty() || oscafeDespejos == null) {
			
			sacasTotal = despejo.getSacas();
			pesoTotal = despejo.getPeso();
			
		}
		else {
			
			int count = 0;
			
			for (OscafeDespejo oscafeDespejo : oscafeDespejos) {
				
				sacasTotal += oscafeDespejo.getSacas();
				pesoTotal = pesoTotal.add(oscafeDespejo.getPeso());
				
				if (oscafeDespejo.getLote().getId() == despejo.getId()) count++;
				
			}
			
			if (count == 0) {
				sacasTotal += despejo.getSacas();
				pesoTotal = pesoTotal.add(despejo.getPeso());
			}
			
		}
		
		boolean despejado = false;
		
		if (sacasTotal == oscafe.getSacas()) {
			
			despejado = true;
			
			oscafe.setPeso(pesoTotal);
			
		}
		
		setStatusDespejado(oscafe, despejado, session);
		
	}
	
	public void setStatusDespejado(Oscafe oscafe, boolean despejado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		oscafe.setUsuario(usuario.getEmail());
		oscafe.setStatusDespejado(despejado);
		
		if (!despejado) {
			
			BigDecimal peso = new BigDecimal(60.50);
			
			peso  = peso.multiply(new BigDecimal(oscafe.getSacas()));
			
			oscafe.setPeso(peso);
			
		}
			
		altera(oscafe);
		
	}
	
	public void checkStatusFechado(Oscafe oscafe, Lote desdobra, HttpSession session) {
		
		Set<Lote> lotes = new HashSet<Lote>();
		
		lotes = oscafe.getLotes();
		
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
		
		int sacasResultado = oscafe.getSacas() - oscafe.getSacasQuebra() + oscafe.getSacasAcrescimo();
		
		BigDecimal pesoResultado = oscafe.getPeso();
		pesoResultado = pesoResultado.subtract(oscafe.getPesoQuebra());
		pesoResultado = pesoResultado.add(oscafe.getPesoAcrescimo());
		
		if (sacasTotal == sacasResultado &&
			pesoTotal.compareTo(pesoResultado) == 0) fechado = true;
		
		setStatusFechado(oscafe, fechado, session);
		
	}
	
	public void setStatusFechado(Oscafe oscafe, boolean fechado, HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
		oscafe.setUsuario(usuario.getEmail());
		oscafe.setStatusFechado(fechado);
			
		altera(oscafe);
		
	}
	
	private JSONObject calculaResultado(Oscafe oscafe, JSONObject oscafeJSONObject, int tipo) {
		
		int sacasDespejo = oscafe.getSacas();
		int sacasQuebra = oscafe.getSacasQuebra();
		int sacasAcrescimo = oscafe.getSacasAcrescimo();
		int sacasResultado = 0;
		
		BigDecimal pesoDespejo = oscafe.getPeso();
		BigDecimal pesoQuebra = oscafe.getPesoQuebra();
		BigDecimal pesoAcrescimo = oscafe.getPesoAcrescimo();
		BigDecimal pesoResultado = new BigDecimal(0.00);
		
		sacasResultado = sacasDespejo - sacasQuebra + sacasAcrescimo;
		pesoResultado = pesoDespejo.subtract(pesoQuebra);
		pesoResultado = pesoResultado.add(pesoAcrescimo);
		
		oscafeJSONObject.put("id", oscafe.getId());
		oscafeJSONObject.put("lote", oscafe.getLote());
		oscafeJSONObject.put("desdobras", oscafe.getDesdobras());
		oscafeJSONObject.put("sacasQuebra", sacasQuebra);
		oscafeJSONObject.put("pesoQuebra", pesoQuebra);
		oscafeJSONObject.put("sacasAcrescimo", sacasAcrescimo);
		oscafeJSONObject.put("pesoAcrescimo", pesoAcrescimo);
		
		if (tipo == 1) {
		
			oscafeJSONObject.put("sacasDespejo", sacasDespejo);
			oscafeJSONObject.put("pesoDespejo", pesoDespejo);
			oscafeJSONObject.put("sacas", sacasResultado);
			oscafeJSONObject.put("peso", pesoResultado);

		}
		else {
			
			oscafeJSONObject.put("sacas", oscafe.getSacas());
			oscafeJSONObject.put("peso", oscafe.getPeso());
			oscafeJSONObject.put("sacasResultado", sacasResultado);
			oscafeJSONObject.put("pesoResultado", pesoResultado);
			
		}
		
		return oscafeJSONObject;
		
	}
	
}
