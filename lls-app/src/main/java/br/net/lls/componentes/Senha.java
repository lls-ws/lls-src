package br.net.lls.componentes;

import javax.validation.constraints.Size;

public class Senha {
	
	@Size(max=6, message="{usuario.senha.tamanho}")
	private String codigoSeguranca;
	
	@Size(min=6, max=10, message="{usuario.senha.tamanho}")
	private String senhaAtual;
	
	@Size(min=6, max=10, message="{usuario.senha.tamanho}")
	private String senhaNova;
	
	@Size(min=6, max=10, message="{usuario.senha.tamanho}")
	private String senhaConfirma;
	
    @Size(max=255, message="{usuario.email.tamanho}")
	private String email;
	
	public void setCodigoSeguranca(String codigoSeguranca) {
		
		this.codigoSeguranca = codigoSeguranca;
		
	}
	
	public String getCodigoSeguranca() {
		
		return this.codigoSeguranca;
		
	}
	
	public void setSenhaAtual(String senhaAtual) {
		
		this.senhaAtual = senhaAtual;
		
	}
	
	public String getSenhaAtual() {
		
		return this.senhaAtual;
		
	}
	
	public void setSenhaNova(String senhaNova) {
		
		this.senhaNova = senhaNova;
		
	}
	
	public String getSenhaNova() {
		
		return this.senhaNova;
		
	}
	
	public void setSenhaConfirma(String senhaConfirma) {
		
		this.senhaConfirma = senhaConfirma;
		
	}
	
	public String getSenhaConfirma() {
		
		return this.senhaConfirma;
		
	}
	
	public void setEmail(String email) {
		
		this.email = email;
		
	}
	
	public String getEmail() {
		
		return this.email;
		
	}
	
}
