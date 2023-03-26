package br.net.lls.cafe.dao;

import org.json.JSONObject;
import org.json.JSONArray;
import javax.servlet.http.HttpSession;

import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.Lote;
import br.net.lls.componentes.LancamentoDao;

public interface OscafeDao extends LancamentoDao {
	
	void adiciona(Oscafe oscafe);
	
	void altera(Oscafe oscafe);
	
	Oscafe buscaPorId(int id);
	
	Oscafe urlDecoder(Oscafe oscafe);
	
	JSONObject getJSONById(Oscafe oscafe, JSONObject oscafeJSONObject, int sacasCafeFormacao);
	
	JSONObject getJSONById(Oscafe oscafe, JSONObject oscafeJSONObject);
	
	void checkStatusDespejado(Oscafe oscafe, Lote despejo, HttpSession session);
	
	void setStatusDespejado(Oscafe oscafe, boolean despejado, HttpSession session);
	
	void checkStatusFechado(Oscafe oscafe, Lote lote, HttpSession session);
	
	void setStatusFechado(Oscafe oscafe, boolean fechado, HttpSession session);
	
}
