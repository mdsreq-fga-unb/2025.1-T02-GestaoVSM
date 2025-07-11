package com.vsm.gestao.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Obter o cabeçalho "Authorization" da requisição
        final String authHeader = request.getHeader("Authorization");

        // Se o cabeçalho não existir ou não começar com "Bearer ", passa para o próximo filtro
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extrair o token JWT (removendo o prefixo "Bearer ")
        final String jwt = authHeader.substring(7);
        final String userLogin;
        
        try {
            // 3. Extrair o login do usuário (subject) do token
            userLogin = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            // Se houver qualquer erro na extração, o token é inválido.
            filterChain.doFilter(request, response);
            return;
        }

        // 4. Se temos o login e o usuário ainda não está autenticado no contexto de segurança
        if (userLogin != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Carrega os detalhes do usuário a partir do banco de dados
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userLogin);

            // 5. Verifica se o token é válido (compara o usuário e a data de expiração)
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Se for válido, cria um token de autenticação para o Spring Security
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // Credenciais (senha) são nulas pois já validamos com o token
                        userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 6. Define o usuário como autenticado no SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 7. Continua a cadeia de filtros
        filterChain.doFilter(request, response);
    }
}