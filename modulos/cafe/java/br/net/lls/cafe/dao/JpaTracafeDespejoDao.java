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
import br.net.lls.cafe.TracafeDespejo;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cafe.Lote;

@Repository
public class JpaTracafeDespejoDao implements TracafeDespejoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(TracafeDespejo tracafeDespejo) {
		
		entityManager.persist(tracafeDespejo);
		
	}
	
	public void altera(TracafeDespejo tracafeDespejo) {
		
		entityManager.merge(tracafeDespejo);
		
	}
	
	public void apaga(TracafeDespejo tracafeDespejo) {
		
		entityManager.remove(tracafeDespejo);
		
	}
	
	public void remove(int id) {}
	
	public TracafeDespejo buscaPorId(int id) { return null; }
	
	public List getList(Relatorio relatorio) { return null; }
	
	public List getListTotal(Relatorio relatorio) { return null; }
	
	public List getListById(int id) { return null; }
	
	public JSONArray getListaJSONArray(Relatorio relatorio) { return null; }
	
	public JSONObject getTotalJSONObject(Relatorio relatorio) { return null; }
	
	public int getSacasDespejo(Set<TracafeDespejo> tracafeDespejos, JSONObject tracafeJSONObject) {
		
		int contador = 0;
		
		int sacasDespejo = 0;
		
		BigDecimal pesoDespejo = new BigDecimal(0.00);
		
		JSONArray tracafeDespejosJSONArray = new JSONArray();
		
		for (TracafeDespejo tracafeDespejo : tracafeDespejos) {
			
			JSONObject tracafeDespejosJSONObject = new JSONObject();
			
			sacasDespejo = sacasDespejo + tracafeDespejo.getSacas();
			pesoDespejo = pesoDespejo.add(tracafeDespejo.getPeso());
			
			Lote lote = tracafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			tracafeDespejosJSONObject.put("id", lote.getId());
			tracafeDespejosJSONObject.put("lote", lote.getLote());
			tracafeDespejosJSONObject.put("sacas", tracafeDespejo.getSacas());
			tracafeDespejosJSONObject.put("peso", tracafeDespejo.getPeso());
			tracafeDespejosJSONObject.put("peneira", peneira.getNome());
			tracafeDespejosJSONObject.put("observacao", lote.getObservacao());
			tracafeDespejosJSONObject.put("pilha", lote.getPilha());
			
			tracafeDespejosJSONArray.put(tracafeDespejosJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(tracafeDespejosJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("totalQtd", contador);
		totalJSONObject.put("totalSacas", sacasDespejo);
		totalJSONObject.put("totalPeso", pesoDespejo);
		rodapeJSONArray.put(totalJSONObject);
		
		tracafeJSONObject.put("lancamentos", lancamentosJSONArray);
		tracafeJSONObject.put("rodape", rodapeJSONArray);
		
		return sacasDespejo;
		
	}
	
}
