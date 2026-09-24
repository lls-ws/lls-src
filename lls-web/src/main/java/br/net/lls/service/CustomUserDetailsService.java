package br.net.lls.service;

import br.net.lls.model.User;
import br.net.lls.model.UserPrincipal;
import br.net.lls.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Buscando o usuário utilizando o e-mail enviado no formulário
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("E-mail não cadastrado no sistema."));

        // Retorna o nosso principal customizado contendo o Nome
        return new UserPrincipal(user);
    }
}
