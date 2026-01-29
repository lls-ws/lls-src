package br.net.lls.cafe;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.EmbeddedId;
import javax.persistence.Transient;
import javax.persistence.Table;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;

import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.Lote;

@Entity
@Table(name = "Tracafe_Despejo")
@AssociationOverrides({
@AssociationOverride(name = "primaryKey.tracafe", joinColumns = @JoinColumn(name = "tracafe_id")),
@AssociationOverride(name = "primaryKey.lote", joinColumns = @JoinColumn(name = "lote_id")) })
public class TracafeDespejo {
	
	@EmbeddedId
	private TracafeDespejoId primaryKey = new TracafeDespejoId();
	
	@Column(nullable = false, unique = false, columnDefinition="int(11) default 0")
	private int sacas;
	
	@Column(nullable = false, unique = false, columnDefinition="Decimal(16, 2) default 0.00")
	private BigDecimal peso;
	
	public interface TracafeDespejoValida{}
	
	public TracafeDespejoId getPrimaryKey() {
        return primaryKey;
    }
 
    public void setPrimaryKey(TracafeDespejoId primaryKey) {
        this.primaryKey = primaryKey;
    }
	
	@Transient
	public Tracafe getTracafe() {
		return getPrimaryKey().getTracafe();
	}

	public void setTracafe(Tracafe tracafe) {
		getPrimaryKey().setTracafe(tracafe);
	}

	@Transient
	public Lote getLote() {
		return getPrimaryKey().getLote();
	}

	public void setLote(Lote lote) {
		getPrimaryKey().setLote(lote);
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
