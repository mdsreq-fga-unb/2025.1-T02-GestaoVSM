package com.vsm.gestao.controller;

import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.UsuarioService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario novoUsuario, @AuthenticationPrincipal Usuario admin) {
        Usuario usuarioCriado = usuarioService.criarUsuario(admin, novoUsuario);
        return new ResponseEntity<>(usuarioCriado, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios(@AuthenticationPrincipal Usuario admin) {
        List<Usuario> usuarios = usuarioService.listarUsuarios(admin);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Usuario admin) {
        return usuarioService.buscarPorId(id, admin)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario dadosUsuario, @AuthenticationPrincipal Usuario admin) {
        Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, dadosUsuario, admin);
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id, @AuthenticationPrincipal Usuario admin) {
        usuarioService.deletarUsuario(id, admin);
        return ResponseEntity.noContent().build();
    }
}