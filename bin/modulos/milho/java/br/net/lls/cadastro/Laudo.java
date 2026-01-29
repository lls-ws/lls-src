package br.net.lls.cadastro;

import javax.validation.constraints.NotNull;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

@Entity
public class Laudo {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {LaudoValida.class})
	private int id;
	
	@NotNull(message="{cadastro.id.nulo}", groups = {LaudoValida.class})
	private int laudo;
		
	public interface LaudoValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setLaudo(int laudo) {
		
		this.laudo = laudo;
		
	}
	
	public int getLaudo() {
		
		return this.laudo;
		
	}
	
}
