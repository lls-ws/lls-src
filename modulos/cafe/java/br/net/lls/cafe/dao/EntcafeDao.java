package br.net.lls.cafe.dao;

import org.json.JSONObject;
import org.json.JSONArray;
import javax.servlet.http.HttpSession;

import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Entlote;
import br.net.lls.componentes.LancamentoDao;

public interface EntcafeDao extends LancamentoDao {
	
	void adiciona(Entcafe entcafe);
	
	void altera(Entcafe entcafe);
	
	Entcafe buscaPorId(int id);
	
	Entcafe urlDecoder(Entcafe entcafe);
	
	JSONObject getJSONById(Entcafe entcafe, JSONObject entcafeJSONObject, int sacasDesdobras);
	
	JSONObject getJSONById(Entcafe entcafe, JSONObject entcafeJSONObject);
	
	void checkFechado(Entcafe entcafe, Entlote entlote, HttpSession session);
	
	void setFechado(Entcafe entcafe, boolean fechado, HttpSession session);
	
}
