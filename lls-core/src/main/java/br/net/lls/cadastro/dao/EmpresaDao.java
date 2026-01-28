package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.cadastro.Empresa;

import org.json.JSONObject;

public interface EmpresaDao {
	
	Empresa buscaPorId(int id);
	
	void adiciona(Empresa empresa);
	
	void altera(Empresa empresa);
	
	JSONObject getJSONObject();
	
	Empresa urlDecoder(Empresa empresa);
	
}
