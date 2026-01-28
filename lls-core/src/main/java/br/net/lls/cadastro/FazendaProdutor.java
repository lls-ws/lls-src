package br.net.lls.cadastro;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;

import br.net.lls.cadastro.Produtor;
import br.net.lls.componentes.Estado;

@Entity
public class FazendaProdutor {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {FazendaProdutorValida.class})
	private int id;
	
	@NotNull(message="{cadastro.nome.nulo}", groups = {FazendaProdutorValida.class})
	@Size(min=1, max=60, message="{produtor.nome.tamanho}", groups = {FazendaProdutorValida.class})
	@Column(length = 60, unique = false, nullable = false)
	private String nome;
	
	@Size(max=50, message="{cadastro.endereco.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 50)
	private String endereco;
	
	@Size(max=50, message="{cadastro.bairro.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 50)
	private String bairro;
	
	@Size(max=50, message="{cadastro.cidade.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 50)
	private String cidade;
	
	@Column(length = 2, columnDefinition = "varchar(2)")
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	@Size(max=8, message="{cadastro.cep.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 8)
	private String cep;
	
	@Size(max=20, message="{contato.ie.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 20, unique = false, nullable = true)
	private String ie;
	
	@NotNull(message="{cadastro.cpfcnpj.nulo}", groups = {FazendaProdutorValida.class})
	@Size(max=14, message="{cadastro.cpfcnpj.maximo}", groups = {FazendaProdutorValida.class})
	@Column(length = 14, unique = false)
	private String cpfcnpj;
	
	@ManyToOne
	private Produtor produtor;
	
	public interface FazendaProdutorValida{}
	
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
	
	public void setEndereco(String endereco) {
		
		this.endereco = endereco;
		
	}
	
	public String getEndereco() {
		
		return this.endereco;
		
	}
	
	public void setBairro(String bairro) {
		
		this.bairro = bairro;
		
	}
	
	public String getBairro() {
		
		return this.bairro;
		
	}
	
	public void setCidade(String cidade) {
		
		this.cidade = cidade;
		
	}
	
	public String getCidade() {
		
		return this.cidade;
		
	}
	
	public void setEstado(Estado estado) {
		
		this.estado = estado;
		
	}
	
	public Estado getEstado() {
		
		return this.estado;
		
	}
	
	public String getEstadoNome() {
		
		if (this.estado == null) return "";
		else return this.estado.getEstadoNome(this.estado);
		
	}
	
	public void setCep(String cep) {
		
		this.cep = cep;
		
	}
	
	public String getCep() {
		
		return this.cep;
		
	}
	
	public void setIe(String ie) {
		
		this.ie = ie;
		
	}
	
	public String getIe() {
		
		return this.ie;
		
	}
	
	public void setCpfcnpj(String cpfcnpj) {
		
		this.cpfcnpj = cpfcnpj;
		
	}
	
	public String getCpfcnpj() {
		
		return this.cpfcnpj;
		
	}

	public void setProdutor(Produtor produtor) {
		
		this.produtor = produtor;
		
	}
	
	public Produtor getProdutor() {
		
		return this.produtor;
		
	}
	
}
