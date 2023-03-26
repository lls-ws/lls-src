package br.net.lls.milho;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import java.math.BigDecimal;

import br.net.lls.cadastro.FazendaProdutor;

@Entity
public class Saimilho {

	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {SaimilhoValida.class})
	private int id;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Column(length = 6, nullable = true, unique = false)
	@Size(min=0, max=6, message="{milho.laudo.tamanho}", groups = {SaimilhoValida.class})
	private String laudo;
	
	@Column(length = 6, nullable = true, unique = false)
	@Size(min=0, max=6, message="{milho.tiket.tamanho}", groups = {SaimilhoValida.class})
	private String tiket;
	
	@Column(length = 7, nullable = true, unique = false)
	@Size(min=0, max=7, message="{milho.placa.tamanho}", groups = {SaimilhoValida.class})
	private String placa;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {SaimilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquido;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {SaimilhoValida.class})
	private String obs;

	@Column(length = 1, nullable = true, unique = false)
	@Size(min=0, max=1, message="{milho.cilo.tamanho}", groups = {SaimilhoValida.class})
	private String cilo;

	@Column(length = 1, nullable = true, unique = false)
	@Size(min=0, max=1, message="{milho.fat.tamanho}", groups = {SaimilhoValida.class})
	private String fat;
	
	@Column(length = 50, nullable = false, unique = false, columnDefinition="varchar(50) default ''")
	@Size(min=0, max=50, message="{milho.destino.maximo}", groups = {SaimilhoValida.class})
	private String destino;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	public interface SaimilhoValida{}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
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

	public void setLaudo(String laudo) {
		this.laudo = laudo;
	}

	public String getLaudo() {
		return this.laudo;
	}
	
	public void setTiket(String tiket) {
		this.tiket = tiket;
	}

	public String getTiket() {
		return this.tiket;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getPlaca() {
		return this.placa;
	}

	public void setLiquido(BigDecimal liquido) {
		this.liquido = liquido;
	}

	public BigDecimal getLiquido() {
		return this.liquido;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getObs() {
		return this.obs;
	}

	public void setCilo(String cilo) {
		this.cilo = cilo;
	}

	public String getCilo() {
		return this.cilo;
	}

	public void setFat(String fat) {
		this.fat = fat;
	}

	public String getFat() {
		return this.fat;
	}

	public void setDestino(String destino) {
		this.destino = destino;
	}

	public String getDestino() {
		return this.destino;
	}

	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
