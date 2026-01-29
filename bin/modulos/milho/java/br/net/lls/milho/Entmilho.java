package br.net.lls.milho;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import javax.validation.constraints.Size;
import java.math.BigDecimal;
import javax.persistence.ManyToOne;

import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.Umidade;

@Entity
public class Entmilho {

	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {EntmilhoValida.class})
	private int id;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;

	@Column(length = 6, nullable = true, unique = false)
	@Size(min=0, max=6, message="{milho.laudo.tamanho}", groups = {EntmilhoValida.class})
	private String laudo;

	@Column(length = 6, nullable = true, unique = false)
	@Size(min=0, max=6, message="{milho.tiket.tamanho}", groups = {EntmilhoValida.class})
	private String tiket;
	
	@Column(length = 7, nullable = true, unique = false)
	@Size(min=0, max=7, message="{milho.placa.tamanho}", groups = {EntmilhoValida.class})
	private String placa;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal bruto;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(4, 2) default 0.00")
	private BigDecimal impureza;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(4, 2) default 0.00")
	private BigDecimal chocho;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(4, 2) default 0.00")
	private BigDecimal quirela;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquido;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal limpeza;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal secagem;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal carga;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal recepcao;

	@NotNull(message="{cadastro.valor.nulo}", groups = {EntmilhoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal total;

	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {EntmilhoValida.class})
	private String obs;

	@Column(length = 1, nullable = true, unique = false)
	@Size(min=0, max=1, message="{milho.cilo.tamanho}", groups = {EntmilhoValida.class})
	private String cilo;

	@Column(length = 1, nullable = true, unique = false)
	@Size(min=0, max=1, message="{milho.fat.tamanho}", groups = {EntmilhoValida.class})
	private String fat;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@ManyToOne
	private Umidade umidade;
	
	public interface EntmilhoValida{}

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

	public void setBruto(BigDecimal bruto) {
		this.bruto = bruto;
	}

	public BigDecimal getBruto() {
		return this.bruto;
	}

	public void setImpureza(BigDecimal impureza) {
		this.impureza = impureza;
	}

	public BigDecimal getImpureza() {
		return this.impureza;
	}

	public void setChocho(BigDecimal chocho) {
		this.chocho = chocho;
	}

	public BigDecimal getChocho() {
		return this.chocho;
	}

	public void setQuirela(BigDecimal quirela) {
		this.quirela = quirela;
	}

	public BigDecimal getQuirela() {
		return this.quirela;
	}

	public void setLiquido(BigDecimal liquido) {
		this.liquido = liquido;
	}

	public BigDecimal getLiquido() {
		return this.liquido;
	}

	public void setLimpeza(BigDecimal limpeza) {
		this.limpeza = limpeza;
	}

	public BigDecimal getLimpeza() {
		return this.limpeza;
	}

	public void setSecagem(BigDecimal secagem) {
		this.secagem = secagem;
	}

	public BigDecimal getSecagem() {
		return this.secagem;
	}

	public void setCarga(BigDecimal carga) {
		this.carga = carga;
	}

	public BigDecimal getCarga() {
		return this.carga;
	}

	public void setRecepcao(BigDecimal recepcao) {
		this.recepcao = recepcao;
	}

	public BigDecimal getRecepcao() {
		return this.recepcao;
	}

	public void setTotal(BigDecimal total) {
		this.total = total;
	}

	public BigDecimal getTotal() {
		return this.total;
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

	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}

	public void setUmidade(Umidade umidade) {
		
		this.umidade = umidade;
		
	}
	
	public Umidade getUmidade() {
		
		return this.umidade;
		
	}
	
}
