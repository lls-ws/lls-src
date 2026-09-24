package br.net.lls.config; // Certifique-se de usar o seu pacote correto

import br.net.lls.model.User;
import br.net.lls.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Injeção de dependências do JPA e do criptógrafo do Spring Security
    public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // O Seeder só rodará se a tabela 'users' do MySQL estiver totalmente limpa
        if (userRepository.count() == 0) {
            
            // Gerando o hash BCrypt seguro para a senha de testes
            String senhaCriptografada = passwordEncoder.encode("admin123");

            // 1. Criando e persistindo o perfil ADMINISTRADOR (Possui ADMIN e USER)
            User admin = new User(
                "Administrador do Sistema", 
                "admin@email.com", 
                senhaCriptografada, 
                Set.of("ADMIN", "USER") // Popula automaticamente a tabela user_roles
            );
            userRepository.save(admin);

            // 2. Criando e persistindo o perfil USUÁRIO COMUM (Possui apenas USER)
            User comum = new User(
                "João da Silva", 
                "user@email.com", 
                senhaCriptografada, 
                Set.of("USER")
            );
            userRepository.save(comum);

            System.out.println("=========================================================");
            System.out.println(">>> BANCO DE DADOS POPULADO COM MÚLTIPLAS ROLES! <<<");
            System.out.println(">>> Login Administrador: admin@email.com / admin123");
            System.out.println(">>> Login Usuário Comum: user@email.com  / admin123");
            System.out.println("=========================================================");
        }
    }
}
