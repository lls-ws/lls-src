package br.net.lls.balanca;

import javax.validation.constraints.NotNull;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

@Entity
public class Ticket {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {TicketValida.class})
	private int id;
	
	@NotNull(message="{cadastro.id.nulo}", groups = {TicketValida.class})
	private int numero;
		
	public interface TicketValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setNumero(int numero) {
		
		this.numero = numero;
		
	}
	
	public int getNumero() {
		
		return this.numero;
		
	}
	
	public int getTicket() {
		
		return getNumero() + 1;
		
	}
	
}
