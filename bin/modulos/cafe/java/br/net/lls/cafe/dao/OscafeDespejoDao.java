package br.net.lls.cafe.dao;

import java.util.Set;
import org.json.JSONObject;

import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.componentes.LancamentoDao;

public interface OscafeDespejoDao extends LancamentoDao {
	
	void adiciona(OscafeDespejo oscafeDespejo);
	
	void altera(OscafeDespejo oscafeDespejo);
	
	void apaga(OscafeDespejo oscafeDespejo);
	
	OscafeDespejo buscaPorId(int id);
	
	int getSacasDespejo(Set<OscafeDespejo> oscafeDespejos, JSONObject oscafeJSONObject);
	
}
