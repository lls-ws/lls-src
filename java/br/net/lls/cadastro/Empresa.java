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
import org.hibernate.annotations.Type;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import br.net.lls.componentes.Estado;

@Entity
public class Empresa {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {EmpresaValida.class})
	private int id;
	
	@NotNull(message="{cadastro.nome.nulo}", groups = {EmpresaValida.class})
	@Size(min=1, max=60, message="{cadastro.nome.tamanho}", groups = {EmpresaValida.class})
	@Column(length = 60, unique = false, nullable = false)
	private String nome;
	
	@Size(max=60, message="{cadastro.endereco.maximo}", groups = {EmpresaValida.class})
	@Column(length = 60)
	private String endereco;
	
	@Size(max=50, message="{cadastro.bairro.maximo}", groups = {EmpresaValida.class})
	@Column(length = 50)
	private String bairro;
	
	@Size(max=50, message="{cadastro.cidade.maximo}", groups = {EmpresaValida.class})
	@Column(length = 50)
	private String cidade;
	
	@Column(length = 2, columnDefinition = "varchar(2)")
	@Enumerated(EnumType.STRING)
	private Estado estado;
	
	@Size(max=8, message="{cadastro.cep.maximo}", groups = {EmpresaValida.class})
	@Column(length = 8)
	private String cep;
	
	@NotNull(message="{cadastro.cpfcnpj.nulo}", groups = {EmpresaValida.class})
	@Size(max=14, message="{cadastro.cpfcnpj.maximo}", groups = {EmpresaValida.class})
	@Column(length = 14, unique = false)
	private String cpfcnpj;
	
	@Size(max=20, message="{contato.ie.maximo}", groups = {EmpresaValida.class})
	@Column(length = 20, unique = false, nullable = true)
	private String ie;
	
	@Size(max=50, message="{cadastro.email.maximo}", groups = {EmpresaValida.class})
	@Column(length = 50)
	private String email;
	
	@Size(max=50, message="{cadastro.site.maximo}", groups = {EmpresaValida.class})
	@Column(length = 50)
	private String site;
	
	@NotNull(message="{telefone.telefone.nulo}", groups = {EmpresaValida.class})
	@Size(min=10, max=11, message="{telefone.telefone.tamanho}", groups = {EmpresaValida.class})
	@Column(length = 11)
	private String telefone;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataMilho;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataCafe;
	
	public interface EmpresaValida{}
	
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
	
	public String getEstado() {
		
		if (this.estado == null) return "";
		else return this.estado.getEstadoNome(this.estado);
		
	}
	
	public void setCep(String cep) {
		
		this.cep = cep;
		
	}
	
	public String getCep() {
		
		return this.cep;
		
	}
	
	public void setCpfcnpj(String cpfcnpj) {
		
		this.cpfcnpj = cpfcnpj;
		
	}
	
	public String getCpfcnpj() {
		
		return this.cpfcnpj;
		
	}
	
	public void setIe(String ie) {
		
		this.ie = ie;
		
	}
	
	public String getIe() {
		
		return this.ie;
		
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
	
	public void setTelefone(String telefone) {
		
		this.telefone = telefone;
		
	}
	
	public String getTelefone() {
		
		return this.telefone;
		
	}
	
	public void setDataMilho(Calendar dataMilho) {
		this.dataMilho = dataMilho;
	}

	public Calendar getDataMilho() {
		return this.dataMilho;
	}

	public String getDataMilhoText() {
		if (getDataMilho() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataMilho());
			return dataFormatada.format(getDataMilho().getTime());
		}
		else {
			 return "";
		}
	}
	
	public void setDataCafe(Calendar dataCafe) {
		this.dataCafe = dataCafe;
	}

	public Calendar getDataCafe() {
		return this.dataCafe;
	}

	public String getDataCafeText() {
		if (getDataCafe() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getDataCafe());
			return dataFormatada.format(getDataCafe().getTime());
		}
		else {
			 return "";
		}
	}
	
}
