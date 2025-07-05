package com.vsm.gestao.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vsm.gestao.entity.Produto;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public Produto criarProduto(Produto produto, Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        produto.setDisponivel(true);
        return produtoRepository.save(produto);
    }

    @Transactional
    public Produto atualizarProduto(Long id, Produto produtoAtualizado, Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        Produto produto = produtoRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Não existe."));
        produto.setNome(produtoAtualizado.getNome());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setComissaoProduto(produtoAtualizado.getComissaoProduto());
        produto.setDisponivel(produtoAtualizado.isDisponivel());

        return produtoRepository.save(produto);

    }

    @Transactional
    public void deletarUsuario(Long id, Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        produtoRepository.deleteById(id);

    }

    @Transactional
    public List<Produto> listarProdutos(Usuario usuario){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        return produtoRepository.findAll();
    }
    
    @Transactional
    public Optional<Produto> buscarPorId(Usuario usuario, Long id){
        if(usuario.getTipoUsuario() != TipoUsuario.ADMIN){
            throw new SecurityException("Apenas admin pode realizar essa ação.");
        }
        return produtoRepository.findById(id);
    }
}
