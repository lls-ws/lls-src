package br.net.lls.componentes;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class Id {
	
	@NotNull(message="{remover.id.nulo}", groups = {IdValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {IdValida.class})
	private int id;
	
	private String nome;
	
	public interface IdValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setNome(String nome) {
		
		this.nome = nome;
		
	}
	
	public String getNome() {
		
		return this.nome;
		
	}
	
}
