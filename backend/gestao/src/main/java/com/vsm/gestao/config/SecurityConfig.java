package com.vsm.gestao.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors() // ATIVA CORS para o Spring Security
            .and()
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize -> authorize
                // --- Endpoints Públicos ---
                .requestMatchers("/api/auth/**", "/error").permitAll()

                // --- Regras para Visualização (GET) ---
                .requestMatchers(HttpMethod.GET, "/api/servicos/**", "/api/produtos/**").authenticated()

                // --- Regras para Barbeiros e Admins ---
                .requestMatchers("/api/agendamentos/**").hasAnyAuthority("ADMIN", "BARBEIRO")
                .requestMatchers("/api/servicos-realizados/**").hasAnyAuthority("ADMIN", "BARBEIRO")
                .requestMatchers(HttpMethod.POST, "/api/vendas-produtos").hasAnyAuthority("ADMIN", "BARBEIRO")

                // --- Regras Apenas para ADMIN ---
                .requestMatchers("/api/usuarios/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/produtos/**", "/api/servicos/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/produtos/**", "/api/servicos/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/produtos/**", "/api/servicos/**").hasAuthority("ADMIN")
                .requestMatchers("/api/gastos/**").hasAuthority("ADMIN") // Gasto agora é só admin
                .requestMatchers("/api/fechamentos-caixa/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/vendas-produtos").hasAuthority("ADMIN")

                // Qualquer outra requisição precisa ser autenticada
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuração global de CORS para a aplicação.
     * Permite requisições vindas do frontend em http://localhost:5173
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // origem frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // permite cookies/tokens
        configuration.setMaxAge(3600L); // cache das preflight por 1 hora

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // aplica para todos endpoints

        return source;
    }
}