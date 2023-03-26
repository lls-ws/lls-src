package br.net.lls.balanca;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Enumerated;
import javax.persistence.EnumType;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import org.apache.commons.lang.StringUtils;
import java.util.Calendar;
import org.hibernate.annotations.Type;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OrderBy;
import java.util.Set;
import java.util.HashSet;

import br.net.lls.componentes.Data;
import br.net.lls.balanca.TipoPeso;
import br.net.lls.balanca.TipoProduto;
import br.net.lls.cafe.Entcafe;

@Entity
public class Peso {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {PesoValida.class})
	private int id;
	
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar dataFinalizado;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesoValida.class})
	@Column(nullable = false, unique = true, columnDefinition="int(11) default 0")
	private int ticket = 0;
	
	@Column(length = 7, nullable = false, unique = false)
	@Size(min=7, max=7, message="{cafe.placa.tamanho}", groups = {PesoValida.class})
	private String placa;
	
	@Column(length = 50, nullable = false, unique = false)
	@Size(min=0, max=50, message="{peso.produto.tamanho}", groups = {PesoValida.class})
	private String produto;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal tara = new BigDecimal(0.00);
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal bruto = new BigDecimal(0.00);
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesoValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal liquido = new BigDecimal(0.00);
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {PesoValida.class})
	private String obs;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.email.maximo}", groups = {PesoValida.class})
	private String usuario;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean fechado = false;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'Y'")
	private boolean automatico = true;
	
	@Column(length = 8, columnDefinition = "varchar(8) default 'ENTRADA'")
	@Enumerated(EnumType.STRING)
	private TipoPeso tipoPeso;
	
	@Column(length = 6, columnDefinition = "varchar(6) default 'CAFE'")
	@Enumerated(EnumType.STRING)
	private TipoProduto tipoProduto;
	
	@NotNull(message="{cadastro.id.nulo}", groups = {PesoValida.class})
	private int fazendaProdutor_id;
	
	@Column(length = 60, nullable = false, unique = false)
	@Size(min=0, max=60, message="{cadastro.nome.tamanho}", groups = {PesoValida.class})
	private String produtor;
	
	@Column(length = 50, nullable = false, unique = false)
	@Size(min=0, max=50, message="{cadastro.nome.tamanho}", groups = {PesoValida.class})
	private String motorista;
	
	@Column(length = 50, nullable = false, unique = false)
	@Size(min=0, max=50, message="{cadastro.nome.tamanho}", groups = {PesoValida.class})
	private String destino;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {PesoValida.class})
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int qtd = 0;
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "pesos")
	private Set<Entcafe> entcafes = new HashSet<Entcafe>(0);
	
	public interface PesoValida{}
	
	public Set<Entcafe> getEntcafes() {
		return this.entcafes;
	}

	public void setEntcafes(Set<Entcafe> entcafes) {
		this.entcafes = entcafes;
	}
	
	public void addEntcafe(Entcafe entcafe) {
		getEntcafes().add(entcafe);
		entcafe.getPesos().add(this);
    }
	
	public void removeEntcafe(Entcafe entcafe) {
		getEntcafes().remove(entcafe);
		entcafe.getPesos().remove(this);
    }
	
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
	
	public String getDate() {
		return Data.getDate(getData());
	}
	
	public String getDataText() {
		return Data.getDataText(getData());
	}
	
	public String getHora() {
		return Data.getHoraFormat(getData());
	}
	
	public void setDataFinalizado(Calendar dataFinalizado) {
		this.dataFinalizado = dataFinalizado;
	}
	
	public Calendar getDataFinalizado() {
		return this.dataFinalizado;
	}
	
	public String getDateFinalizado() {
		return Data.getDate(getDataFinalizado());
	}
	
	public String getDataFinalizadoText() {
		return Data.getDataText(getDataFinalizado());
	}
	
	public String getHoraFinalizado() {
		return Data.getHoraFormat(getDataFinalizado());
	}
	
	public void setTicket(int ticket) {
		this.ticket = ticket;
	}
	
	public int getTicket() {
		return this.ticket;
	}
	
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	
	public String getPlaca() {
		return this.placa;
	}
	
	public void setProduto(String produto) {
		this.produto = produto;
	}
	
	public String getProduto() {
		return this.produto;
	}
	
	public void setTara(BigDecimal tara) {
		this.tara = tara;
	}
	
	public BigDecimal getTara() {
		return this.tara;
	}
	
	public void setBruto(BigDecimal bruto) {
		this.bruto = bruto;
	}
	
	public BigDecimal getBruto() {
		return this.bruto;
	}
	
	public void setLiquido(BigDecimal liquido) {
		this.liquido = liquido;
	}
	
	public BigDecimal getLiquido() {
		return this.liquido;
	}
	
	public void setObservacao(String obs) {
		this.obs = obs;
	}
	
	public String getObservacao() {
		return this.obs;
	}
	
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public String getUsuario() {
		return this.usuario;
	}
	
	public void setFechado(boolean fechado) {
		
		this.fechado = fechado;
		
	}
	
	public boolean getFechado() {
		
		return this.fechado;
		
	}
	
	public void setAutomatico(boolean automatico) {
		
		this.automatico = automatico;
		
	}
	
	public boolean getAutomatico() {
		
		return this.automatico;
		
	}
	
	public void setTipoPeso(TipoPeso tipoPeso) {
		
		this.tipoPeso = tipoPeso;
		
	}
	
	public TipoPeso getTipoPeso() {
		
		return this.tipoPeso;
		
	}
	
	public String getTipoPesoNome() {
		
		if (this.tipoPeso == null) return "";
		else return StringUtils.capitalize(this.tipoPeso.getTipoPesoNome(this.tipoPeso).toLowerCase());
		
	}
	
	public void setFazendaProdutor_id(int fazendaProdutor_id) {
		this.fazendaProdutor_id = fazendaProdutor_id;
	}
	
	public int getFazendaProdutor_id() {
		return this.fazendaProdutor_id;
	}
	
	public void setProdutor(String produtor) {
		this.produtor = produtor;
	}
	
	public String getProdutor() {
		return this.produtor;
	}
	
	public void setMotorista(String motorista) {
		this.motorista = motorista;
	}
	
	public String getMotorista() {
		return this.motorista;
	}
	
	public void setDestino(String destino) {
		this.destino = destino;
	}
	
	public String getDestino() {
		return this.destino;
	}
	
	public void setQtd(int qtd) {
		this.qtd = qtd;
	}
	
	public int getQtd() {
		return this.qtd;
	}
	
	public void setTipoProduto(TipoProduto tipoProduto) {
		
		this.tipoProduto = tipoProduto;
		
	}
	
	public TipoProduto getTipoProduto() {
		
		return this.tipoProduto;
		
	}
	
	public String getTipoProdutoNome() {
		
		if (this.tipoProduto == null) return "";
		else return StringUtils.capitalize(this.tipoProduto.getTipoProdutoNome(this.tipoProduto).toLowerCase());
		
	}
	
}
