package br.net.lls.cafe;

import java.io.Serializable;
 
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.Lote;
 
@Embeddable
public class TracafeDespejoId implements Serializable { 
    
    @ManyToOne
    private Tracafe tracafe;
    
    @ManyToOne
    private Lote lote;
 
    public Tracafe getTracafe() {
        return tracafe;
    }
 
    public void setTracafe(Tracafe tracafe) {
        this.tracafe = tracafe;
    }
 
    public Lote getLote() {
        return lote;
    }
 
    public void setLote(Lote lote) {
        this.lote = lote;
    }
    
}
