package br.net.lls.balanca.dao;

import org.json.JSONObject;
import org.json.JSONArray;

import br.net.lls.balanca.Peso;
import br.net.lls.componentes.LancamentoDao;

public interface PesoDao extends LancamentoDao {
	
	void adiciona(Peso peso);
	
	void altera(Peso peso);
	
	Peso buscaPorId(int id);
	
	Peso urlDecoder(Peso peso);
	
	JSONObject getJSONById(Peso peso);
	
}
