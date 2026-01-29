package br.net.lls.fatcafe.dao;

import java.util.Calendar;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import br.net.lls.componentes.Data;
import br.net.lls.fatcafe.Cafe;

@Repository
public class JpaCafeDao implements CafeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	private void adiciona(Cafe cafe) {
		
		entityManager.persist(cafe);
		
	}
	
	private Cafe buscaPorId(int id) {
		
		return entityManager.find(Cafe.class, id);
		
	}
	
	public void criaCafe(int id, Date dataFaturamento) {
		
		Cafe cafe = buscaPorId(id);
		
		if (cafe == null) {
			
			Calendar cal = Data.DateToCalendar(dataFaturamento);
			
			cafe = new Cafe();
			
			cafe.setId(id);
			cafe.setDataFaturamento(cal);
			
			adiciona(cafe);
			
		}
		
	}
	
}
