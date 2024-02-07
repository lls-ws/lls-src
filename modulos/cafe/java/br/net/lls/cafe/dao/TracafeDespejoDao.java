package br.net.lls.cafe.dao;

import java.util.Set;
import org.json.JSONObject;

import br.net.lls.cafe.TracafeDespejo;
import br.net.lls.componentes.LancamentoDao;

public interface TracafeDespejoDao extends LancamentoDao {
	
	void adiciona(TracafeDespejo tracafeDespejo);
	
	void altera(TracafeDespejo tracafeDespejo);
	
	void apaga(TracafeDespejo tracafeDespejo);
	
	TracafeDespejo buscaPorId(int id);
	
	int getSacasDespejo(Set<TracafeDespejo> tracafeDespejos, JSONObject tracafeJSONObject);
	
}
