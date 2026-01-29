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
import br.net.lls.cafe.SaicafeDespejo;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cafe.Lote;

@Repository
public class JpaSaicafeDespejoDao implements SaicafeDespejoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(SaicafeDespejo saicafeDespejo) {
		
		entityManager.persist(saicafeDespejo);
		
	}
	
	public void altera(SaicafeDespejo saicafeDespejo) {
		
		entityManager.merge(saicafeDespejo);
		
	}
	
	public void apaga(SaicafeDespejo saicafeDespejo) {
		
		entityManager.remove(saicafeDespejo);
		
	}
	
	public void remove(int id) {}
	
	public SaicafeDespejo buscaPorId(int id) { return null; }
	
	public List getList(Relatorio relatorio) { return null; }
	
	public List getListTotal(Relatorio relatorio) { return null; }
	
	public List getListById(int id) { return null; }
	
	public JSONArray getListaJSONArray(Relatorio relatorio) { return null; }
	
	public JSONObject getTotalJSONObject(Relatorio relatorio) { return null; }
	
	public int getSacasDespejo(Set<SaicafeDespejo> saicafeDespejos, JSONObject saicafeJSONObject) {
		
		int contador = 0;
		
		int sacasDespejo = 0;
		
		BigDecimal pesoDespejo = new BigDecimal(0.00);
		
		JSONArray saicafeDespejosJSONArray = new JSONArray();
		
		for (SaicafeDespejo saicafeDespejo : saicafeDespejos) {
			
			JSONObject saicafeDespejosJSONObject = new JSONObject();
			
			sacasDespejo = sacasDespejo + saicafeDespejo.getSacas();
			pesoDespejo = pesoDespejo.add(saicafeDespejo.getPeso());
			
			Lote lote = saicafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			saicafeDespejosJSONObject.put("id", lote.getId());
			saicafeDespejosJSONObject.put("lote", lote.getLote());
			saicafeDespejosJSONObject.put("sacas", saicafeDespejo.getSacas());
			saicafeDespejosJSONObject.put("peso", saicafeDespejo.getPeso());
			saicafeDespejosJSONObject.put("peneira", peneira.getNome());
			saicafeDespejosJSONObject.put("observacao", lote.getObservacao());
			saicafeDespejosJSONObject.put("pilha", lote.getPilha());
			
			saicafeDespejosJSONArray.put(saicafeDespejosJSONObject);
			
			contador++;
			
		}
		
		JSONArray lancamentosJSONArray = new JSONArray();
		lancamentosJSONArray.put(saicafeDespejosJSONArray);
		
		JSONArray rodapeJSONArray = new JSONArray();
		JSONObject totalJSONObject = new JSONObject();
		totalJSONObject.put("totalQtd", contador);
		totalJSONObject.put("totalSacas", sacasDespejo);
		totalJSONObject.put("totalPeso", pesoDespejo);
		rodapeJSONArray.put(totalJSONObject);
		
		saicafeJSONObject.put("lancamentos", lancamentosJSONArray);
		saicafeJSONObject.put("rodape", rodapeJSONArray);
		
		return sacasDespejo;
		
	}
	
}
