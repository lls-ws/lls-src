package br.net.lls.cafe.dao;

import java.util.Set;
import org.json.JSONObject;

import br.net.lls.cafe.SaicafeDespejo;
import br.net.lls.componentes.LancamentoDao;

public interface SaicafeDespejoDao extends LancamentoDao {
	
	void adiciona(SaicafeDespejo saicafeDespejo);
	
	void altera(SaicafeDespejo saicafeDespejo);
	
	void apaga(SaicafeDespejo saicafeDespejo);
	
	SaicafeDespejo buscaPorId(int id);
	
	int getSacasDespejo(Set<SaicafeDespejo> saicafeDespejos, JSONObject saicafeJSONObject);
	
}
