package br.net.lls;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // ESSA ANOTAÇÃO É OBRIGATÓRIA
public class LlsWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(LlsWebApplication.class, args);
    }
}
