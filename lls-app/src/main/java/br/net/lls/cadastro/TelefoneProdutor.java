package br.net.lls.cadastro;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.Column;
import javax.persistence.ManyToOne;

import br.net.lls.componentes.Tipo;
import br.net.lls.componentes.Operadora;

@Entity
public class TelefoneProdutor {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {TelefoneProdutorValida.class})
	private int id;
	
	@NotNull(message="{telefone.numero.nulo}", groups = {TelefoneProdutorValida.class})
	@Size(min=10, max=11, message="{telefone.numero.tamanho}", groups = {TelefoneProdutorValida.class})
	@Column(length = 11)
	private String numero;
	
	@Size(max=50, message="{telefone.responsavel.maximo}", groups = {TelefoneProdutorValida.class})
	@Column(length = 50)
	private String responsavel;
	
	@Column(length = 7, columnDefinition = "varchar(7)")
	@Enumerated(EnumType.STRING)
	private Tipo tipo;
	
	@Column(length = 6, columnDefinition = "varchar(6)")
	@Enumerated(EnumType.STRING)
	private Operadora operadora;
	
	@ManyToOne
	private Produtor produtor;
	
	public interface TelefoneProdutorValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}
	
	public void setNumero(String numero) {
		
		this.numero = numero;
		
	}
	
	public String getNumero() {
		
		return this.numero;
		
	}
	
	public void setResponsavel(String responsavel) {
		
		this.responsavel = responsavel;
		
	}
	
	public String getResponsavel() {
		
		return this.responsavel;
		
	}
	
	public void setTipo(Tipo tipo) {
		
		this.tipo = tipo;
		
	}
	
	public Tipo getTipo() {
		
		return this.tipo;
		
	}
	
	public String getTipoNome() {
		
		if (this.tipo == null) return "";
		else return this.tipo.getTipoNome(this.tipo);
		
	}
	
	public void setOperadora(Operadora operadora) {
		
		this.operadora = operadora;
		
	}
	
	public Operadora getOperadora() {
		
		return this.operadora;
		
	}
	
	public String getOperadoraNome() {
		
		if (this.operadora == null) return "";
		else return this.operadora.getOperadoraNome(this.operadora);
		
	}
	
	public void setProdutor(Produtor produtor) {
		
		this.produtor = produtor;
		
	}
	
	public Produtor getProdutor() {
		
		return this.produtor;
		
	}
	
}
