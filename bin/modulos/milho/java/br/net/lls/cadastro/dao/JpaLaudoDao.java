package br.net.lls.cadastro.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import br.net.lls.cadastro.Laudo;

@Repository
public class JpaLaudoDao implements LaudoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void altera(Laudo laudo) {
		
		entityManager.merge(laudo);
		
	}
	
	public Laudo buscaPorId(int id) {
		
		return entityManager.find(Laudo.class, id);
		
	}
	
	public void soma() {
		
		Laudo laudo = buscaPorId(1);
		
		laudo.setLaudo(laudo.getLaudo() + 1);
		
		altera(laudo);
		
	}
	
}
