package br.net.lls.cafe;

import javax.validation.constraints.NotNull;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

@Entity
public class Guia {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {GuiaValida.class})
	private int id;
	
	@NotNull(message="{cadastro.id.nulo}", groups = {GuiaValida.class})
	private int numero;
		
	public interface GuiaValida{}
	
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
	
	public String getGuia(int id) {
		
		String guia = "";
		
		switch (id) {
			
			case 1:
				guia = "GR";
				break;
			case 2:
				guia = "OS";
				break;
			case 3:
				guia = "GE";
				break;
			case 4:
				guia = "GT";
				break;
		
		}
		
		return guia + String.format("%06d", getNumero() + 1);
		
	}
	
}
