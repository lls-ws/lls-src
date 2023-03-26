package br.net.lls.cafe.dao;

import java.util.Set;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

import br.net.lls.cafe.Lote;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface LoteDao extends LancamentoDao {
	
	void adiciona(Lote lote);
	
	void altera(Lote lote);
	
	Lote buscaPorId(int id);
	
	boolean checkSaldo(Set<Lote> lotes);
	
	int getSacasDesdobras(Set<Lote> lotes, JSONObject cafeJSONObject);
	
	List getListaProcura(int pagina, String lote, int linhas);
	
	JSONObject juntaJSONObject(JSONObject[] jsonObjectArray);
	
	JSONArray getSaldoJSONArray(Relatorio relatorio);
	
	JSONObject getTotalSaldoJSONObject(Relatorio relatorio);
	
	JSONArray getResumoPeneiraJSONArray(Relatorio relatorio);
	
	Lote urlDecoder(Lote lote);
	
}
