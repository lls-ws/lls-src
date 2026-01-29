package br.net.lls.balanca;

import java.math.BigDecimal;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

public class Pesocafe {
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesocafeValida.class})
	private int sacas;
	
	@Size(min=0, max=10, message="{cafe.nota.tamanho}", groups = {PesocafeValida.class})
	private String nota;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesocafeValida.class})
	private BigDecimal valor;
	
	public interface PesocafeValida{}
	
	public void setSacas(int sacas) {
		this.sacas = sacas;
	}
	
	public int getSacas() {
		return this.sacas;
	}
	
	public void setNota(String nota) {
		this.nota = nota;
	}
	
	public String getNota() {
		return this.nota;
	}
	
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	
	public BigDecimal getValor() {
		return this.valor;
	}
	
}
