package com.vsm.gestao.service;

import com.vsm.gestao.dto.ProdutoDTO;
import com.vsm.gestao.entity.Produto;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Transactional
    public Produto criarProduto(ProdutoDTO.ProdutoRequest dto, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem criar produtos.");
        }
        Produto produto = new Produto();
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setComissaoProduto(dto.comissaoProduto());
        produto.setDisponivel(dto.disponivel());
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizarProduto(Long id, ProdutoDTO.ProdutoRequest dto, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem atualizar produtos.");
        }
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Produto com ID " + id + " não encontrado."));
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setComissaoProduto(dto.comissaoProduto());
        produto.setDisponivel(dto.disponivel());
        return produtoRepository.save(produto);
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }
    
    @Transactional
    public void deletarProduto(Long id, Usuario solicitante) {
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN) {
            throw new SecurityException("Apenas administradores podem deletar produtos.");
        }
        produtoRepository.deleteById(id);
    }
}