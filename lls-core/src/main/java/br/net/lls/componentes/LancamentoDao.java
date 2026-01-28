package br.net.lls.componentes;

import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

import br.net.lls.componentes.Relatorio;

public interface LancamentoDao {
	
	void remove(int id);
	
	List getList(Relatorio relatorio);
	
	List getListTotal(Relatorio relatorio);
	
	List getListById(int id);
	
	JSONArray getListaJSONArray(Relatorio relatorio);
	
	JSONObject getTotalJSONObject(Relatorio relatorio);
	
}
