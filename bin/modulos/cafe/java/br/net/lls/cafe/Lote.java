package br.net.lls.cafe;

import java.util.Set;
import java.util.HashSet;
import java.math.BigDecimal;
import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

import br.net.lls.cadastro.Peneira;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.TracafeDespejo;

@Entity
public class Lote {
	
	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {LoteValida.class})
	private int id;
	
	@Column(length = 10, nullable = false, unique = true)
	@Size(min=1, max=10, message="{cafe.lote.tamanho}", groups = {LoteValida.class})
	private String lote;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {LoteValida.class})
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@NotNull(message="{cadastro.valor.nulo}", groups = {LoteValida.class})
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	@Column(nullable = true, unique = false, columnDefinition="int(11) default 0")
	private int saldoSacas;
	
	@Column(nullable = true, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal saldoPeso;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.observacao.maximo}", groups = {LoteValida.class})
	private String obs;
	
	@Column(length = 10, nullable = true, unique = false)
	@Size(min=0, max=10, message="{cafe.pilha.tamanho}", groups = {LoteValida.class})
	private String pilha;
	
	@Column(length = 50, nullable = true, unique = false)
	@Size(min=0, max=50, message="{cadastro.usuario.maximo}", groups = {LoteValida.class})
	private String usuario;
	
	@ManyToOne
	private Peneira peneira;
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "lotes")
	private Set<Entcafe> entcafes = new HashSet<Entcafe>(0);
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "primaryKey.lote")
	private Set<OscafeDespejo> oscafeDespejos = new HashSet<OscafeDespejo>(0);
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "lotes")
	private Set<Oscafe> oscafes = new HashSet<Oscafe>(0);
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "primaryKey.lote")
	private Set<SaicafeDespejo> saicafeDespejos = new HashSet<SaicafeDespejo>(0);
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "primaryKey.lote")
	private Set<TracafeDespejo> tracafeDespejos = new HashSet<TracafeDespejo>(0);
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "lotes")
	private Set<Tracafe> tracafes = new HashSet<Tracafe>(0);
	
	public interface LoteValida{}
	
	public Set<Tracafe> getTracafes() {
		return this.tracafes;
	}

	public void setTracafes(Set<Tracafe> tracafes) {
		this.tracafes = tracafes;
	}
	
	public void addTracafe(Tracafe tracafe) {
		getTracafes().add(tracafe);
		tracafe.getLotes().add(this);
    }
	
	public void removeTracafe(Tracafe tracafe) {
		getTracafes().remove(tracafe);
		tracafe.getLotes().remove(this);
    }
	
	public Set<TracafeDespejo> getTracafeDespejos() {
		return this.tracafeDespejos;
	}
	
	public void setTracafeDespejos(Set<TracafeDespejo> tracafeDespejos) {
		this.tracafeDespejos = tracafeDespejos;
	}
	
	public void addTracafeDespejo(TracafeDespejo tracafeDespejo) {
        this.tracafeDespejos.add(tracafeDespejo);
    }
	
    public Set<SaicafeDespejo> getSaicafeDespejos() {
		return this.saicafeDespejos;
	}
	
	public void setSaicafeDespejos(Set<SaicafeDespejo> saicafeDespejos) {
		this.saicafeDespejos = saicafeDespejos;
	}
	
	public void addSaicafeDespejo(SaicafeDespejo saicafeDespejo) {
        this.saicafeDespejos.add(saicafeDespejo);
    }
    
	public Set<Oscafe> getOscafes() {
		return this.oscafes;
	}

	public void setOscafes(Set<Oscafe> oscafes) {
		this.oscafes = oscafes;
	}
	
	public void addOscafe(Oscafe oscafe) {
		getOscafes().add(oscafe);
		oscafe.getLotes().add(this);
    }
	
	public void removeOscafe(Oscafe oscafe) {
		getOscafes().remove(oscafe);
		oscafe.getLotes().remove(this);
    }
	
	public Set<OscafeDespejo> getOscafeDespejos() {
		return this.oscafeDespejos;
	}
	
	public void setOscafeDespejos(Set<OscafeDespejo> oscafeDespejos) {
		this.oscafeDespejos = oscafeDespejos;
	}
	
	public void addOscafeDespejo(OscafeDespejo oscafeDespejo) {
        this.oscafeDespejos.add(oscafeDespejo);
    }
	
	public Set<Entcafe> getEntcafes() {
		return this.entcafes;
	}

	public void setEntcafes(Set<Entcafe> entcafes) {
		this.entcafes = entcafes;
	}
	
	public void addEntcafe(Entcafe entcafe) {
		getEntcafes().add(entcafe);
		entcafe.getLotes().add(this);
    }
	
	public void removeEntcafe(Entcafe entcafe) {
		getEntcafes().remove(entcafe);
		entcafe.getLotes().remove(this);
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
	
	public void setSaldoSacas(int saldoSacas) {
		this.saldoSacas = saldoSacas;
	}
	
	public int getSaldoSacas() {
		return this.saldoSacas;
	}
	
	public void setSaldoPeso(BigDecimal saldoPeso) {
		this.saldoPeso = saldoPeso;
	}
	
	public BigDecimal getSaldoPeso() {
		return this.saldoPeso;
	}
	
	public void setObservacao(String obs) {
		this.obs = obs;
	}
	
	public String getObservacao() {
		return this.obs;
	}
	
	public void setPilha(String pilha) {
		this.pilha = pilha;
	}
	
	public String getPilha() {
		return this.pilha;
	}
	
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	
	public String getUsuario() {
		return this.usuario;
	}
	
	public void setPeneira(Peneira peneira) {
		
		this.peneira = peneira;
		
	}
	
	public Peneira getPeneira() {
		
		return this.peneira;
		
	}
	
}
