package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Type;

public class Entlote {
	
	@NotNull(message="{cadastro.id.nulo}", groups = {EntloteValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {EntloteValida.class})
	private int id;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntloteValida.class})
	private int sacas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntloteValida.class})
	private BigDecimal peso;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntloteValida.class})
	private int desdobras;
	
	@Type(type="yes_no")
	private boolean cobrar = true;
	
	public interface EntloteValida{}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
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
	
	public void setDesdobras(int desdobras) {
		this.desdobras = desdobras;
	}
	
	public int getDesdobras() {
		return this.desdobras;
	}
	
	public void setCobrar(boolean cobrar) {
		
		this.cobrar = cobrar;
		
	}
	
	public boolean getCobrar() {
		
		return this.cobrar;
		
	}
	
}
