package com.vsm.gestao.controller;

import com.vsm.gestao.config.JwtService;
import com.vsm.gestao.dto.AuthRequestDTO;
import com.vsm.gestao.dto.AuthResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        // 1. Autenticar o usuário
        // O AuthenticationManager chama nosso AuthenticationProvider, que usa o
        // UserDetailsService e o PasswordEncoder para validar a senha.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.login(), request.password())
        );

        // 2. Se a autenticação for bem-sucedida, buscar os detalhes do usuário
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.login());
        
        // 3. Gerar o token JWT para este usuário
        final String token = jwtService.generateToken(userDetails);

        // 4. Retornar o token na resposta
        return ResponseEntity.ok(new AuthResponseDTO(token));
    }
}