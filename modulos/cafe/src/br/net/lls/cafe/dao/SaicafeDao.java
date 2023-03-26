package br.net.lls.cafe.dao;

import org.json.JSONObject;
import org.json.JSONArray;
import javax.servlet.http.HttpSession;

import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.Lote;
import br.net.lls.componentes.LancamentoDao;

public interface SaicafeDao extends LancamentoDao {
	
	void adiciona(Saicafe saicafe);
	
	void altera(Saicafe saicafe);
	
	Saicafe buscaPorId(int id);
	
	Saicafe urlDecoder(Saicafe saicafe);
	
	JSONObject getJSONById(Saicafe saicafe, JSONObject saicafeJSONObject, int sacasDespejo);
	
	JSONObject getJSONById(Saicafe saicafe, JSONObject saicafeJSONObject);
	
	void checkStatusDespejado(Saicafe saicafe, Lote despejo, HttpSession session);
	
	void setStatusDespejado(Saicafe saicafe, boolean despejado, HttpSession session);
	
	void setStatusFechado(Saicafe saicafe, boolean fechado, HttpSession session);
	
}
