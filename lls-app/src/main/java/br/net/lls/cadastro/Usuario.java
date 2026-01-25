package br.net.lls.cadastro;

import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import br.net.lls.cadastro.Empresa;

@Entity
public class Usuario {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {UsuarioValida.class})
	private int id;
	
	@NotEmpty(message="{usuario.email.vazio}")
    @Email(message="{usuario.email.incorreto}")
    @Size(max=255, message="{usuario.email.tamanho}")
    @Column(length = 255, unique = true, nullable = false)
	private String email;
	
	@Size(min=6, max=10, message="{usuario.senha.tamanho}")
	@Column(length = 10)
	private String senha;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Size(min=1, max=60, message="{cadastro.nome.tamanho}", groups = {UsuarioValida.class})
	@Column(length = 60, unique = false, nullable = true)
	private String nome;
	
	@Size(min=10, max=11, message="{telefone.telefone.tamanho}", groups = {UsuarioValida.class})
	@Column(length = 11)
	private String telefone;
	
	@Size(max=6, message="{usuario.senha.tamanho}")
	@Column(length = 6)
	private String codigoSeguranca;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean ativado = false;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean adm = false;
	
	@ManyToOne
	private Empresa empresa;
	
	public interface UsuarioValida{}
	
	public void setId(int id) {
		
		this.id = id;
		
	}
	
	public int getId() {
		
		return this.id;
		
	}

	public void setEmail(String email) {
		
		this.email = email;
		
	}
	
	public String getEmail() {
		
		return this.email;
		
	}
	
	public void setSenha(String senha) {
		
		this.senha = senha;
		
	}
	
	public String getSenha() {
		
		return this.senha;
		
	}
	
	public void setData(Calendar data) {
		this.data = data;
	}

	public Calendar getData() {
		return this.data;
	}

	public String getDataText() {
		if (getData() != null) {
			SimpleDateFormat dataFormatada = new SimpleDateFormat("dd/MM/yyyy");
			dataFormatada.setCalendar(getData());
			return dataFormatada.format(getData().getTime());
		}
		else {
			 return "";
		}
	}

	public void setNome(String nome) {
		
		this.nome = nome;
		
	}
	
	public String getNome() {
		
		return this.nome;
		
	}
	
	public void setTelefone(String telefone) {
		
		this.telefone = telefone;
		
	}
	
	public String getTelefone() {
		
		return this.telefone;
		
	}
	
	public void setCodigoSeguranca(String codigoSeguranca) {
		
		this.codigoSeguranca = codigoSeguranca;
		
	}
	
	public String getCodigoSeguranca() {
		
		return this.codigoSeguranca;
		
	}
	
	public void setAdm(boolean adm) {
		
		this.adm = adm;
		
	}
	
	public boolean getAdm() {
		
		return this.adm;
		
	}
	
	public void setAtivado(boolean ativado) {
		
		this.ativado = ativado;
		
	}
	
	public boolean getAtivado() {
		
		return this.ativado;
		
	}
	
	public void setEmpresa(Empresa empresa) {
		
		this.empresa = empresa;
		
	}
	
	public Empresa getEmpresa() {
		
		return this.empresa;
		
	}
	
}
