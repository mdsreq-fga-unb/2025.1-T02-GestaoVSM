package com.vsm.gestao.dto;

import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;

// DTOs para desacoplar a API da entidade de banco de dados.
public class UsuarioDTO {


    public record UsuarioRequest(
            String nome,
            String login,
            String password,
            TipoUsuario tipoUsuario

    ) {}


    public record UsuarioResponse(
            Long id,
            String nome,
            String login,
            TipoUsuario tipoUsuario,
            boolean ativo
    ) {
       
        public static UsuarioResponse fromEntity(Usuario usuario) {
            return new UsuarioResponse(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getLogin(),
                    usuario.getTipoUsuario(),
                    usuario.isAtivo()
            );
        }
    }
}