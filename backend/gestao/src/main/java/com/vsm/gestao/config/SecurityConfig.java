package com.vsm.gestao.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize -> authorize
                // Endpoints públicos
                .requestMatchers("/api/auth/**", "/error").permitAll() // <-- ADICIONEI "/error" AQUI

                // Regras para ADMIN
                .requestMatchers("/api/usuarios/**").hasAuthority("ADMIN")
                .requestMatchers("/api/vendas-produtos").hasAnyAuthority("ADMIN", "BARBEIRO")
                .requestMatchers("/api/agendamentos/**").hasAnyAuthority("ADMIN", "BARBEIRO")
                .requestMatchers("/api/fechamentos-caixa").hasAuthority("ADMIN")
                .requestMatchers("/api/servicos-realizados").hasAnyAuthority("ADMIN", "BARBEIRO'")
                .requestMatchers("/api/servicos/**").hasAuthority("ADMIN")
                .requestMatchers("/api/produtos/**").hasAuthority("ADMIN")
                .requestMatchers("/api/gastos/**").hasAuthority("ADMIN")
                
                // Qualquer outra requisição precisa ser autenticada
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}