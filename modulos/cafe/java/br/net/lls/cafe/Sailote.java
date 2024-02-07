package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Type;

import br.net.lls.cafe.Status;

public class Sailote {
	
	@NotNull(message="{cadastro.id.nulo}", groups = {SailoteValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {SailoteValida.class})
	private int id;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SailoteValida.class})
	private int ticket = 0;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SailoteValida.class})
	private int sacasDespejo;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SailoteValida.class})
	private BigDecimal pesoDespejo = new BigDecimal(0.00);
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SailoteValida.class})
	private int sacas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SailoteValida.class})
	private BigDecimal peso = new BigDecimal(0.00);
	
	@Type(type="yes_no")
	private boolean cobrar = true;
	
	private String obs;
	
	public interface SailoteValida{}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setTicket(int ticket) {
		this.ticket = ticket;
	}
	
	public int getTicket() {
		return this.ticket;
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
	
	public void setSacasDespejo(int sacasDespejo) {
		this.sacasDespejo = sacasDespejo;
	}
	
	public int getSacasDespejo() {
		return this.sacasDespejo;
	}
	
	public void setPesoDespejo(BigDecimal pesoDespejo) {
		this.pesoDespejo = pesoDespejo;
	}
	
	public BigDecimal getPesoDespejo() {
		return this.pesoDespejo;
	}
	
	public void setObservacao(String obs) {
		this.obs = obs;
	}
	
	public String getObservacao() {
		return this.obs;
	}
	
	public void setCobrar(boolean cobrar) {
		
		this.cobrar = cobrar;
		
	}
	
	public boolean getCobrar() {
		
		return this.cobrar;
		
	}
	
}
