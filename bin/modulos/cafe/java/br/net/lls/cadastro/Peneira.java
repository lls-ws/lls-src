package br.net.lls.cadastro;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;
import javax.persistence.Column;
import javax.validation.constraints.Size;

@Entity
public class Peneira {

	@Id
	@GeneratedValue
	@NotNull(message="{cadastro.id.nulo}", groups = {PeneiraValida.class})
	private int id;

	@Column(length = 30, nullable = false, unique = false, columnDefinition="varchar(30) default ''")
	@Size(min=0, max=30, message="{cadastro.nome.tamanho}", groups = {PeneiraValida.class})
	private String nome;

	public interface PeneiraValida{}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getNome() {
		return this.nome;
	}
	
}
