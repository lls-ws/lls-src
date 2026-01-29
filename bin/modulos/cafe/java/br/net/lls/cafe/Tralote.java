package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import br.net.lls.cafe.Status;

public class Tralote {
	
	@NotNull(message="{cadastro.id.nulo}", groups = {TraloteValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {TraloteValida.class})
	private int id;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {TraloteValida.class})
	private int desdobras;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {TraloteValida.class})
	private int sacas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {TraloteValida.class})
	private BigDecimal peso = new BigDecimal(0.00);
	
	public interface TraloteValida{}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setDesdobras(int desdobras) {
		this.desdobras = desdobras;
	}
	
	public int getDesdobras() {
		return this.desdobras;
	}
	
	public void setSacas(int sacas) {
		this.sacas = sacas;
	}
	
	public int getSacas() {
		return this.sacas;
	}
	
	public void setPeso(BigDecimal peso) {
		this.peso = peso;
	}
	
	public BigDecimal getPeso() {
		return this.peso;
	}
	
}
