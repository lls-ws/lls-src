package br.net.lls.balanca.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import br.net.lls.balanca.Ticket;

@Repository
public class JpaTicketDao implements TicketDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void altera(Ticket ticket) {
		
		entityManager.merge(ticket);
		
	}
	
	public Ticket buscaPorId(int id) {
		
		return entityManager.find(Ticket.class, id);
		
	}
	
	public void soma(int id) {
		
		Ticket ticket = buscaPorId(id);
		
		ticket.setNumero(ticket.getTicket());
		
		altera(ticket);
		
	}
	
}
