package br.net.lls.repository;

import br.net.lls.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Procura o usuário no banco usando a coluna email
    Optional<User> findByEmail(String email);
}
