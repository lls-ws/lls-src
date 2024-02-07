package br.net.lls.cafe;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
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
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cafe.Lote;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.balanca.Peso;

@Entity
public class Entcafe {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {EntcafeValida.class})
	private int id;
	
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern="dd/MM/yyyy")
	private Calendar data;
	
	@Column(length = 8, nullable = false, unique = true)
	@Size(min=1, max=8, message="{cafe.lote.tamanho}", groups = {EntcafeValida.class})
	private String lote;
	
	@Column(length = 10, nullable = true, unique = false)
	@Size(min=0, max=10, message="{cafe.nota.tamanho}", groups = {EntcafeValida.class})
	private String nota;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal valor;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacasNota;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal pesoNota = new BigDecimal(0.00);
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int sacas = 0;
	
	@Column(nullable = true, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso = new BigDecimal(0.00);
	
	@Column(length = 7, nullable = true, unique = false)
	@Size(min=0, max=7, message="{cafe.placa.tamanho}", groups = {EntcafeValida.class})
	private String placa;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {EntcafeValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int ticket = 0;
	
	@Column(length = 255, nullable = true, unique = false)
	@Size(min=0, max=255, message="{cadastro.observacao.maximo}", groups = {EntcafeValida.class})
	private String obs;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.email.maximo}", groups = {EntcafeValida.class})
	private String usuario;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int desdobras;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'N'")
	private boolean fechado = false;
	
	@Type(type="yes_no")
	@Column(columnDefinition="char(1) default 'Y'")
	private boolean cobrar = true;
	
	@ManyToOne
	private FazendaProdutor fazendaProdutor;
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Entcafe_Lote", joinColumns = {@JoinColumn(name = "entcafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "lote_id") })
	@OrderBy(value="lote")
	private Set<Lote> lotes = new HashSet<Lote>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Entcafe_Servcafe", joinColumns = {@JoinColumn(name = "entcafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "servcafe_id") })
	@OrderBy(value="lote")
	private Set<Servcafe> servcafes = new HashSet<Servcafe>(0);
	
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(name = "Entcafe_Peso", joinColumns = {@JoinColumn(name = "entcafe_id") },
		inverseJoinColumns = { @JoinColumn(name = "peso_id") })
	@OrderBy(value="ticket")
	private Set<Peso> pesos = new HashSet<Peso>(0);
	
	public interface EntcafeValida{}
	
	public Set<Peso> getPesos() {
		return this.pesos;
	}
	
	public void setPesos(Set<Peso> pesos) {
		this.pesos = pesos;
	}
	
	public Set<Servcafe> getServcafes() {
		return this.servcafes;
	}
	
	public void setServcafes(Set<Servcafe> servcafes) {
		this.servcafes = servcafes;
	}
	
	public Set<Lote> getLotes() {
		return this.lotes;
	}
	
	public void setLotes(Set<Lote> lotes) {
		this.lotes = lotes;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getId() {
		return this.id;
	}
	
	public void setLote(String lote) {
		this.lote = lote;
	}
	
	public String getLote() {
		return this.lote;
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
	
	public void setSacasNota(int sacasNota) {
		this.sacasNota = sacasNota;
	}
	
	public int getSacasNota() {
		return this.sacasNota;
	}
	
	public void setPesoNota(BigDecimal pesoNota) {
		this.pesoNota = pesoNota;
	}
	
	public BigDecimal getPesoNota() {
		return this.pesoNota;
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
	
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	
	public String getPlaca() {
		return this.placa;
	}
	
	public void setTicket(int ticket) {
		this.ticket = ticket;
	}
	
	public int getTicket() {
		return this.ticket;
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
	
	public void setCobrar(boolean cobrar) {
		
		this.cobrar = cobrar;
		
	}
	
	public boolean getCobrar() {
		
		return this.cobrar;
		
	}
	
	public void setDesdobras(int desdobras) {
		this.desdobras = desdobras;
	}
	
	public int getDesdobras() {
		return this.desdobras;
	}
	
	public void setFazendaProdutor(FazendaProdutor fazendaProdutor) {
		
		this.fazendaProdutor = fazendaProdutor;
		
	}
	
	public FazendaProdutor getFazendaProdutor() {
		
		return this.fazendaProdutor;
		
	}
	
}
