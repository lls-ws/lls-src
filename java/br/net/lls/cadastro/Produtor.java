package br.net.lls.cadastro;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import java.util.HashSet;
import java.util.Set;

import br.net.lls.componentes.Estado;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.TelefoneProdutor;

@Entity
public class Produtor {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {ProdutorValida.class})
	private int id;
	
	@NotNull(message="{cadastro.nome.nulo}", groups = {ProdutorValida.class})
	@Size(min=1, max=60, message="{cadastro.nome.tamanho}", groups = {ProdutorValida.class})
	@Column(length = 60, unique = false, nullable = false)
	private String nome;
	
	@Size(max=60, message="{cadastro.endereco.maximo}", groups = {ProdutorValida.class})
	@Column(length = 60)
	private String endereco;
	
	@Size(max=50, message="{cadastro.bairro.maximo}", groups = {ProdutorValida.class})
	@Column(length = 50)
	private String bairro;
	
	@Size(max=50, message="{cadastro.cidade.maximo}", groups = {ProdutorValida.class})
	@Column(length = 50)
	private String cidade;
	
	@Column(length = 2, columnDefinition = "varchar(2)")
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	@Size(max=8, message="{cadastro.cep.maximo}", groups = {ProdutorValida.class})
	@Column(length = 8)
	private String cep;
	
	@Size(max=50, message="{cadastro.email.maximo}", groups = {ProdutorValida.class})
	@Column(length = 50)
	private String email;
	
	@Size(max=50, message="{cadastro.site.maximo}", groups = {ProdutorValida.class})
	@Column(length = 50)
	private String site;
	
	@NotNull(message="{cadastro.cpfcnpj.nulo}", groups = {ProdutorValida.class})
	@Size(max=14, message="{cadastro.cpfcnpj.maximo}", groups = {ProdutorValida.class})
	@Column(length = 14, unique = false, nullable = false)
	private String cpfcnpj;
	
	@Size(max=255, message="{cadastro.observacao.maximo}", groups = {ProdutorValida.class})
	@Column(length = 255)
	private String observacao;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "produtor")
	private Set<TelefoneProdutor> produtorTelefones = new HashSet<TelefoneProdutor>();
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "produtor")
	private Set<FazendaProdutor> fazendas = new HashSet<FazendaProdutor>();
	
	public interface ProdutorValida{}
	
	public Set<TelefoneProdutor> getProdutorTelefones() {
		return produtorTelefones;
	}

	public void setProdutorTelefones(Set<TelefoneProdutor> produtorTelefones) {
		this.produtorTelefones = produtorTelefones;
	}

	public void addTelefoneProdutor(TelefoneProdutor telefoneProdutor) {
		telefoneProdutor.setProdutor(this);
		this.produtorTelefones.add(telefoneProdutor);
	}
	
	public Set<FazendaProdutor> getProdutorFazendaProdutors() {
		return fazendas;
	}

	public void setProdutorFazendaProdutors(Set<FazendaProdutor> fazendas) {
		this.fazendas = fazendas;
	}

	public void addFazendaProdutorProdutor(FazendaProdutor fazenda) {
		fazenda.setProdutor(this);
		this.fazendas.add(fazenda);
	}
	
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
	
	public void setObservacao(String observacao) {
		
		this.observacao = observacao;
		
	}
	
	public String getObservacao() {
		
		return this.observacao;
		
	}
	
	public void setEmail(String email) {
		
		this.email = email;
		
	}
	
	public String getEmail() {
		
		return this.email;
		
	}
	
	public void setSite(String site) {
		
		this.site = site;
		
	}
	
	public String getSite() {
		
		return this.site;
		
	}
	
	public void setCpfcnpj(String cpfcnpj) {
		
		this.cpfcnpj = cpfcnpj;
		
	}
	
	public String getCpfcnpj() {
		
		return this.cpfcnpj;
		
	}
	
}
