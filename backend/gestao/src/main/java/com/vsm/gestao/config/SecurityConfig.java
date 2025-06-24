package com.vsm.gestao.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desabilita a proteção CSRF (Cross-Site Request Forgery)
            // Essencial para permitir requisições POST/PUT/DELETE do Postman sem complexidade
            .csrf(AbstractHttpConfigurer::disable)

            // 2. Configura as regras de autorização de requisições HTTP
            .authorizeHttpRequests(authorize -> authorize
                // Diz ao Spring para permitir QUALQUER requisição (permitAll) sem autenticação
                .anyRequest().permitAll()
            );

        return http.build();
    }
}