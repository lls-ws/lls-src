package br.net.lls.cadastro.dao;

import br.net.lls.cadastro.TelefoneProdutor;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Repository;
import javax.persistence.TypedQuery;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaTelefoneProdutorDao implements TelefoneProdutorDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(TelefoneProdutor telefoneProdutor) {
		
		entityManager.persist(telefoneProdutor);
		
	}
	
	public void altera(TelefoneProdutor telefoneProdutor) {
		
		entityManager.merge(telefoneProdutor);
		
	}
	
	public List<TelefoneProdutor> lista() {
		
		TypedQuery<TelefoneProdutor> query = entityManager.createQuery("SELECT t FROM TelefoneProdutor t", TelefoneProdutor.class);
		
		return query.getResultList();
	}
	
	public void remove(int id) {
		
		TelefoneProdutor telefone = buscaPorId(id);
		
		entityManager.remove(telefone);
		
	}
	
	public TelefoneProdutor buscaPorId(int id) {
		
		return entityManager.find(TelefoneProdutor.class, id);
		
	}
	
	public List<String> achar(int id) {
		
		TelefoneProdutor telefone = buscaPorId(id);
		
		List<String> list = new ArrayList<String>();
		
		list.add(String.valueOf(telefone.getId()));
		list.add(telefone.getNumero());
		list.add(telefone.getResponsavel());
		list.add(telefone.getTipoNome());
		list.add(telefone.getOperadoraNome());
		
		return list;
		
	}
	
	public void urlDecoder(TelefoneProdutor telefoneProdutor) {
		 
		 if (telefoneProdutor != null) {
		 
			 try {
			
				telefoneProdutor.setResponsavel(URLDecoder.decode(telefoneProdutor.getResponsavel(), "UTF-8"));
				
				telefoneProdutor.setNumero(telefoneProdutor.getNumero());
				telefoneProdutor.setTipo(telefoneProdutor.getTipo());
				telefoneProdutor.setOperadora(telefoneProdutor.getOperadora());
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
	}
	
	public void urlDecoder(TelefoneProdutor telefoneProdutor, TelefoneProdutor telefone) {
		 
		 if (telefoneProdutor != null) {
		 
			 try {
			
				telefoneProdutor.setResponsavel(URLDecoder.decode(telefone.getResponsavel(), "UTF-8"));
				
				telefoneProdutor.setNumero(telefone.getNumero());
				telefoneProdutor.setTipo(telefone.getTipo());
				telefoneProdutor.setOperadora(telefone.getOperadora());
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
	}
	
}
