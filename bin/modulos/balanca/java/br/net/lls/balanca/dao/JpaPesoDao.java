package br.net.lls.balanca.dao;

import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Iterator;
import java.math.BigDecimal;
import org.apache.commons.lang.StringUtils;
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
import br.net.lls.balanca.Peso;
import br.net.lls.balanca.TipoPeso;
import br.net.lls.balanca.TipoProduto;
import br.net.lls.balanca.dao.PesoSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.cafe.Entcafe;

@Repository
public class JpaPesoDao implements PesoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public List getListById(int id) { return null; }
	
	public void adiciona(Peso peso) {
		
		urlDecoder(peso);
		
		entityManager.persist(peso);
		
	}
	
	public void altera(Peso peso) {
		
		urlDecoder(peso);
		
		entityManager.merge(peso);
		
	}
	
	public void remove(int id) {
		
		Peso peso = buscaPorId(id);
		
		entityManager.remove(peso);
		
	}
	
	public Peso buscaPorId(int id) {
		
		return entityManager.find(Peso.class, id);
		
	}
	
	public Peso urlDecoder(Peso peso) {
		 
		 if (peso != null) {
		 
			 try {
			
				peso.setProduto(URLDecoder.decode(peso.getProduto(), "UTF-8"));
				peso.setProdutor(URLDecoder.decode(peso.getProdutor(), "UTF-8"));
				peso.setDestino(URLDecoder.decode(peso.getDestino(), "UTF-8"));
				peso.setMotorista(URLDecoder.decode(peso.getMotorista(), "UTF-8"));
				peso.setObservacao(URLDecoder.decode(peso.getObservacao(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return peso;
		
	}
	
	public List getList(Relatorio relatorio) {
		
		String consulta = "SELECT peso.id AS id, " +
								"DATE(peso.data) AS data, " +
								"peso.ticket AS ticket, " +
								"peso.placa, " +
								"peso.produto, " +
								"peso.tipoPeso, " +
								"peso.tara, " +
								"peso.bruto, " +
								"peso.liquido ";
		
		consulta = PesoSql.getConsulta(relatorio, consulta, 0);
		
		String ordenacao = "ORDER BY data, ticket " + Consulta.getOrdem(relatorio);
		
		int firstResult = (relatorio.getPagina() - 1) * relatorio.getLinhas();
		int maxResults = relatorio.getLinhas();
		
		String limit = "LIMIT " + firstResult + ", " + maxResults;
		
		if (relatorio.getPagina() == 0) limit = "";
		
		consulta += ordenacao + limit;
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		Consulta.setParameter(relatorio, query);

		return query.list();
		
	}
	
	public List getListTotal(Relatorio relatorio) {
		
		String consulta = "SELECT COUNT(peso.id) AS qtd, " +
								 "SUM(peso.tara) AS tara, " +
								 "SUM(peso.bruto) AS bruto, " +
								 "SUM(peso.liquido) AS liquido ";
		
		consulta = PesoSql.getConsulta(relatorio, consulta, 1);
		
		if (relatorio.getIdFazenda() == 0) {
			
			String consultaTotal = "SELECT SUM(total.qtd), " +
										  "SUM(total.tara), " +
										  "SUM(total.bruto), " +
										  "SUM(total.liquido) ";
			
			consulta = consultaTotal + "FROM ( " + consulta + " ) AS total ";
			
		}
		
		Session session = (Session) entityManager.getDelegate();
		
		Query query = session.createSQLQuery(consulta);
		
		Consulta.setParameter(relatorio, query);

		return query.list();
		
	}
	
	public JSONArray getListaJSONArray(Relatorio relatorio) {
		
		List list = getList(relatorio);
		
		JSONArray jsonArray = new JSONArray();
		
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			
			Object[] object = (Object[]) iterator.next();
			
			JSONObject jsonObject = new JSONObject();
			
			String tipoPeso = StringUtils.capitalize(object[5].toString().toLowerCase());
			
			jsonObject.put("id", object[0]);
			jsonObject.put("data", object[1]);
			jsonObject.put("ticket", object[2]);
			jsonObject.put("placa", object[3]);
			jsonObject.put("produto", object[4]);
			jsonObject.put("tipoPeso", tipoPeso);
			jsonObject.put("tara", object[6]);
			jsonObject.put("bruto", object[7]);
			jsonObject.put("liquido", object[8]);
			
			Consulta.setFazenda(relatorio, object, jsonObject, 9);
		
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
			jsonObject.put("tara", object[1]);
			jsonObject.put("bruto", object[2]);
			jsonObject.put("liquido", object[3]);
			
		}
		
		return jsonObject;
		
	}
	
	public JSONObject getJSONById(Peso peso) {
		
		JSONObject pesoJSONObject = new JSONObject();
		
		if (peso.getTipoProduto() == TipoProduto.CAFE &&
			peso.getFazendaProdutor_id() > 0 &&
			peso.getTipoPeso() == TipoPeso.ENTRADA) {
			
			int sacas = 0;
			
			String lote = "";
			String nota = "";
			
			BigDecimal pesoNota = new BigDecimal(0.00);
			BigDecimal valor = new BigDecimal(0.00);
		
			Set<Entcafe> entcafes = peso.getEntcafes();
			
			for (Entcafe entcafe : entcafes) {
				
				lote = entcafe.getLote();
				nota = entcafe.getNota();
				valor = entcafe.getValor();
				
				if (entcafe.getPeso().compareTo(BigDecimal.ZERO) > 0) {
					
					sacas = entcafe.getSacas();
					pesoNota = entcafe.getPeso();
					
				}
				else {
					sacas = entcafe.getSacasNota();
					pesoNota = entcafe.getPesoNota();
				}
				
			}

			pesoJSONObject.put("lote", lote);
			pesoJSONObject.put("nota", nota);
			pesoJSONObject.put("sacas", sacas);
			pesoJSONObject.put("pesoNota", pesoNota);
			pesoJSONObject.put("valor", valor);
			
		}
		
		pesoJSONObject.put("id", peso.getId());
		pesoJSONObject.put("data", peso.getDate());
		pesoJSONObject.put("hora", peso.getHora());
		pesoJSONObject.put("dataFinalizado", peso.getDateFinalizado());
		pesoJSONObject.put("horaFinalizado", peso.getHoraFinalizado());
		pesoJSONObject.put("placa", peso.getPlaca());
		pesoJSONObject.put("destino", peso.getDestino());
		pesoJSONObject.put("motorista", peso.getMotorista());
		pesoJSONObject.put("ticket", peso.getTicket());
		pesoJSONObject.put("qtd", peso.getQtd());
		pesoJSONObject.put("produto", peso.getTipoProduto());
		pesoJSONObject.put("descricao", peso.getProduto());
		pesoJSONObject.put("tipoPeso", peso.getTipoPesoNome());
		pesoJSONObject.put("tara", peso.getTara());
		pesoJSONObject.put("bruto", peso.getBruto());
		pesoJSONObject.put("liquido", peso.getLiquido());
		pesoJSONObject.put("fechado", peso.getFechado());
		pesoJSONObject.put("automatico", peso.getAutomatico());
		pesoJSONObject.put("usuario", peso.getUsuario());
		pesoJSONObject.put("observacao", peso.getObservacao());
		
		return pesoJSONObject;
		
	}
	
}
