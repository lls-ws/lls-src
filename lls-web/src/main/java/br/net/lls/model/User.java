package br.net.lls.model; // Ajuste para o seu pacote correto

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    private boolean enabled = true;

    /**
     * CRIA A TABELA 'user_roles' AUTOMATICAMENTE NO MYSQL
     * Armazena os perfis de acesso vinculados ao ID do usuário (ex: 'USER', 'ADMIN')
     */
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "user_roles", // Nome da tabela de relacionamento no MySQL
        joinColumns = @JoinColumn(name = "user_id") // Chave estrangeira ligando à tabela 'users'
    )
    @Column(name = "role") // Nome da coluna que guardará a String do perfil
    private Set<String> roles = new HashSet<>();

    // Construtores
    public User() {}

    public User(String name, String email, String password, Set<String> roles) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    // Getters e Setters
    public Long getId() { return id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}
