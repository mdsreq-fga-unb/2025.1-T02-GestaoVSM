package com.vsm.gestao.service;

import com.vsm.gestao.entity.Produto;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.VendasProdutos;
import com.vsm.gestao.repository.ProdutoRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import com.vsm.gestao.repository.VendasProdutosRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VendasProdutosService {

    @Autowired
    private VendasProdutosRepository vendasProdutosRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public VendasProdutos registrarVenda(Long produtoId, Long barbeiroId, String formaPagamento, Usuario solicitante) {
        // Admin pode vender por qualquer um, barbeiro só por si mesmo
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && !solicitante.getId().equals(barbeiroId)) {
            throw new SecurityException("Usuário não autorizado para registrar esta venda.");
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado."));
        
        Usuario barbeiro = usuarioRepository.findById(barbeiroId)
                .orElseThrow(() -> new IllegalArgumentException("Barbeiro não encontrado."));

        if (!produto.isDisponivel()) {
            throw new IllegalStateException("Produto não está disponível para venda.");
        }

        VendasProdutos novaVenda = new VendasProdutos();
        novaVenda.setProduto(produto);
        novaVenda.setUsuario(barbeiro);
        novaVenda.setPreco(produto.getPreco()); // Preço da venda é o preço do produto
        novaVenda.setPagamento(formaPagamento);
        // A data da venda é gerada automaticamente via @CreationTimestamp na entidade

        return vendasProdutosRepository.save(novaVenda);
    }

    @Transactional
    public void cancelarVenda(Long vendaId, Usuario solicitante) {
        VendasProdutos venda = vendasProdutosRepository.findById(vendaId)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada."));

        // Admin pode cancelar qualquer venda, barbeiro só a sua
        if (solicitante.getTipoUsuario() != TipoUsuario.ADMIN && !solicitante.getId().equals(venda.getUsuario().getId())) {
            throw new SecurityException("Usuário não autorizado para cancelar esta venda.");
        }

        vendasProdutosRepository.delete(venda);
    }

}