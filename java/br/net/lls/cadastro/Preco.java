package br.net.lls.cadastro;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;

@Entity
public class Preco {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {PrecoValida.class})
	private int id;
	
	@NotNull(message="{cadastro.nome.nulo}", groups = {PrecoValida.class})
	@Size(min=1, max=50, message="{cadastro.nome.tamanho}", groups = {PrecoValida.class})
	@Column(length = 50, unique = true, nullable = false)
	private String nome;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PrecoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(5,2) default '0.00'")
	private BigDecimal valor;
	
	public interface PrecoValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setValor(BigDecimal valor) {
		
		this.valor = valor;
		
	}
	
	public BigDecimal getValor() {
		
		return this.valor;
		
	}
	
	public void setNome(String nome) {
		
		this.nome = nome;
		
	}
	
	public String getNome() {
		
		return this.nome;
		
	}
	
}
