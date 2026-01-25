package br.net.lls.cadastro.dao;

import org.springframework.stereotype.Repository;
import javax.persistence.PersistenceContext;
import javax.persistence.EntityManager;

import br.net.lls.cadastro.Empresa;

import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaEmpresaDao implements EmpresaDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Empresa empresa) {
		
		urlDecoder(empresa);
		
		entityManager.persist(empresa);
		
	}
	
	public void altera(Empresa empresa) {
		
		urlDecoder(empresa);
		
		entityManager.merge(empresa);
		
	}
	
	public Empresa buscaPorId(int id) {
		
		return entityManager.find(Empresa.class, id);
		
	}
	
	public JSONObject getJSONObject() {
		
		Empresa empresa = buscaPorId(1);
		
		JSONObject empresaObject = new JSONObject();
		
		empresaObject.put("nome", empresa.getNome());
		empresaObject.put("endereco", empresa.getEndereco());
		empresaObject.put("cidade", empresa.getCidade());
		empresaObject.put("estado", empresa.getEstado());
		empresaObject.put("fone", empresa.getTelefone());
		empresaObject.put("email", empresa.getEmail());
		empresaObject.put("cnpj", empresa.getCpfcnpj());
		empresaObject.put("ie", empresa.getIe());
		
		return empresaObject;
		
	}
	
	public Empresa urlDecoder(Empresa empresa) {
		
		 try {
		
			empresa.setNome(URLDecoder.decode(empresa.getNome(), "UTF-8"));
			empresa.setEndereco(URLDecoder.decode(empresa.getEndereco(), "UTF-8"));
			empresa.setBairro(URLDecoder.decode(empresa.getBairro(), "UTF-8"));
			empresa.setCidade(URLDecoder.decode(empresa.getCidade(), "UTF-8"));
		
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return empresa;
		
	}
	
}
