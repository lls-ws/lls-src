package br.net.lls.cafe.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import br.net.lls.cafe.Guia;

@Repository
public class JpaGuiaDao implements GuiaDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void altera(Guia guia) {
		
		entityManager.merge(guia);
		
	}
	
	public Guia buscaPorId(int id) {
		
		return entityManager.find(Guia.class, id);
		
	}
	
	public void soma(int id) {
		
		Guia guia = buscaPorId(id);
		
		guia.setNumero(guia.getNumero() + 1);
		
		altera(guia);
		
	}
	
}
