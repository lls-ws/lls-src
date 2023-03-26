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

import br.net.lls.cafe.dao.ConsultaSql;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cafe.Lote;

@Repository
public class JpaOscafeDespejoDao implements OscafeDespejoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(OscafeDespejo oscafeDespejo) {
		
		entityManager.persist(oscafeDespejo);
		
	}
	
	public void altera(OscafeDespejo oscafeDespejo) {
		
		entityManager.merge(oscafeDespejo);
		
	}
	
	public void apaga(OscafeDespejo oscafeDespejo) {
		
		entityManager.remove(oscafeDespejo);
		
	}
	
	public void remove(int id) {}
	
	public OscafeDespejo buscaPorId(int id) { return null; }
	
	public List getList(Relatorio relatorio) { return null; }
	
	public List getListTotal(Relatorio relatorio) { return null; }
	
	public List getListById(int id) { return null; }
	
	public JSONArray getListaJSONArray(Relatorio relatorio) { return null; }
	
	public JSONObject getTotalJSONObject(Relatorio relatorio) { return null; }
	
	public int getSacasDespejo(Set<OscafeDespejo> oscafeDespejos, JSONObject oscafeJSONObject) {
		
		int contador = 0;
		
		int sacasDespejo = 0;
		
		BigDecimal pesoDespejo = new BigDecimal(0.00);
		
		JSONArray oscafeDespejosJSONArray = new JSONArray();
		
		for (OscafeDespejo oscafeDespejo : oscafeDespejos) {
			
			JSONObject oscafeDespejosJSONObject = new JSONObject();
			
			sacasDespejo = sacasDespejo + oscafeDespejo.getSacas();
			pesoDespejo = pesoDespejo.add(oscafeDespejo.getPeso());
			
			Lote lote = oscafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			oscafeDespejosJSONObject.put("id", lote.getId());
			oscafeDespejosJSONObject.put("lote", lote.getLote());
			oscafeDespejosJSONObject.put("sacas", oscafeDespejo.getSacas());
			oscafeDespejosJSONObject.put("peso", oscafeDespejo.getPeso());
			oscafeDespejosJSONObject.put("peneira", peneira.getNome());
			oscafeDespejosJSONObject.put("observacao", lote.getObservacao());
			oscafeDespejosJSONObject.put("pilha", lote.getPilha());
			
			oscafeDespejosJSONArray.put(oscafeDespejosJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(oscafeDespejosJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("totalQtd", contador);
		totalJSONObject.put("totalSacas", sacasDespejo);
		totalJSONObject.put("totalPeso", pesoDespejo);
		rodapeJSONArray.put(totalJSONObject);
		
		oscafeJSONObject.put("lancamentos", lancamentosJSONArray);
		oscafeJSONObject.put("rodape", rodapeJSONArray);
		
		return sacasDespejo;
		
	}
	
}
