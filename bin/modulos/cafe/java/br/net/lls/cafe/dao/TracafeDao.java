package br.net.lls.cafe.dao;

import org.json.JSONObject;
import org.json.JSONArray;
import javax.servlet.http.HttpSession;

import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.Lote;
import br.net.lls.componentes.LancamentoDao;

public interface TracafeDao extends LancamentoDao {
	
	void adiciona(Tracafe tracafe);
	
	void altera(Tracafe tracafe);
	
	Tracafe buscaPorId(int id);
	
	Tracafe urlDecoder(Tracafe tracafe);
	
	JSONObject getJSONById(Tracafe tracafe, JSONObject tracafeJSONObject, int sacasCafeFormacao);
	
	JSONObject getJSONById(Tracafe tracafe, JSONObject tracafeJSONObject);
	
	void checkStatusDespejado(Tracafe tracafe, Lote despejo, HttpSession session);
	
	void setStatusDespejado(Tracafe tracafe, boolean despejado, HttpSession session);
	
	void checkStatusFechado(Tracafe tracafe, Lote lote, HttpSession session);
	
	void setStatusFechado(Tracafe tracafe, boolean fechado, HttpSession session);
	
}
