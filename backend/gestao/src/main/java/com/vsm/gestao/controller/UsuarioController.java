package com.vsm.gestao.controller;

import com.vsm.gestao.dto.UsuarioDTO;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDTO.UsuarioResponse> criarUsuario(
            @RequestBody UsuarioDTO.UsuarioRequest requestDTO,
            @AuthenticationPrincipal Usuario admin) {
        
        Usuario entidadeSalva = usuarioService.criarUsuario(admin, requestDTO);
        UsuarioDTO.UsuarioResponse responseDTO = UsuarioDTO.UsuarioResponse.fromEntity(entidadeSalva);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO.UsuarioResponse>> listarUsuarios(@AuthenticationPrincipal Usuario admin) {
        List<Usuario> usuarios = usuarioService.listarUsuarios(admin);
        List<UsuarioDTO.UsuarioResponse> responseDTOs = usuarios.stream()
                .map(UsuarioDTO.UsuarioResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO.UsuarioResponse> buscarPorId(@PathVariable Long id, @AuthenticationPrincipal Usuario admin) {
        return usuarioService.buscarPorId(id, admin)
                .map(UsuarioDTO.UsuarioResponse::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO.UsuarioResponse> atualizarUsuario(
            @PathVariable Long id,
            @RequestBody UsuarioDTO.UsuarioRequest requestDTO,
            @AuthenticationPrincipal Usuario admin) {
        
        Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, requestDTO, admin);
        UsuarioDTO.UsuarioResponse responseDTO = UsuarioDTO.UsuarioResponse.fromEntity(usuarioAtualizado);
        return ResponseEntity.ok(responseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id, @AuthenticationPrincipal Usuario admin) {
        usuarioService.deletarUsuario(id, admin);
        return ResponseEntity.noContent().build();
    }
}