package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Type;

import br.net.lls.cafe.Status;

public class Oslote {
	
	@NotNull(message="{cadastro.id.nulo}", groups = {OsloteValida.class})
	@Min(value=1, message="{remover.id.tamanho}", groups = {OsloteValida.class})
	private int id;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private int desdobras;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private int sacasDespejo;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private BigDecimal pesoDespejo = new BigDecimal(0.00);
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private int sacasQuebra;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private BigDecimal pesoQuebra = new BigDecimal(0.00);
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private int sacasAcrescimo;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {OsloteValida.class})
	private BigDecimal pesoAcrescimo = new BigDecimal(0.00);
	
	public interface OsloteValida{}
	
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
	
	public void setSacasQuebra(int sacasQuebra) {
		this.sacasQuebra = sacasQuebra;
	}
	
	public int getSacasQuebra() {
		return this.sacasQuebra;
	}
	
	public void setPesoQuebra(BigDecimal pesoQuebra) {
		this.pesoQuebra = pesoQuebra;
	}
	
	public BigDecimal getPesoQuebra() {
		return this.pesoQuebra;
	}
	
	public void setSacasAcrescimo(int sacasAcrescimo) {
		this.sacasAcrescimo = sacasAcrescimo;
	}
	
	public int getSacasAcrescimo() {
		return this.sacasAcrescimo;
	}
	
	public void setPesoAcrescimo(BigDecimal pesoAcrescimo) {
		this.pesoAcrescimo = pesoAcrescimo;
	}
	
	public BigDecimal getPesoAcrescimo() {
		return this.pesoAcrescimo;
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
	
}
