package br.net.lls.cadastro;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import java.util.HashSet;
import java.util.Set;

import br.net.lls.milho.Entmilho;

@Entity
public class Umidade {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {UmidadeValida.class})
	private int id;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {UmidadeValida.class})
	@Column(nullable = false, unique = true, columnDefinition="Decimal(4,2) default '0.00'")
	private BigDecimal codigo;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(4,2) default '0.00'")
	private BigDecimal desconto;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {UmidadeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(6,2) default '0.00'")
	private BigDecimal valor;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "umidade")
	private Set<Entmilho> entmilhos = new HashSet<Entmilho>();
	
	public interface UmidadeValida{}
	
	public Set<Entmilho> getEntmilho() {
		return entmilhos;
	}

	public void setEntmilho(Set<Entmilho> entmilhos) {
		this.entmilhos = entmilhos;
	}

	public void addEntmilho(Entmilho entmilho) {
		entmilho.setUmidade(this);
		this.entmilhos.add(entmilho);
	}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setCodigo(BigDecimal codigo) {
		
		this.codigo = codigo;
		
	}
	
	public BigDecimal getCodigo() {
		
		return this.codigo;
		
	}
	
	public void setValor(BigDecimal valor) {
		
		this.valor = valor;
		
	}
	
	public BigDecimal getValor() {
		
		return this.valor;
		
	}
	
	public void setDesconto(BigDecimal desconto) {
		
		this.desconto = desconto;
		
	}
	
	public BigDecimal getDesconto() {
		
		return this.desconto;
		
	}
	
}
