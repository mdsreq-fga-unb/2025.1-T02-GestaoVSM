package com.vsm.gestao.service;

import com.vsm.gestao.dto.VendaProdutoDTO;
import com.vsm.gestao.entity.Produto;
import com.vsm.gestao.entity.TipoUsuario;
import com.vsm.gestao.entity.Usuario;
import com.vsm.gestao.entity.VendasProdutos;
import com.vsm.gestao.repository.ProdutoRepository;
import com.vsm.gestao.repository.UsuarioRepository;
import com.vsm.gestao.repository.VendasProdutosRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendasProdutosService {

    private final VendasProdutosRepository vendasProdutosRepository;
    private final ProdutoRepository produtoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public VendasProdutos registrarVenda(VendaProdutoDTO.VendaProdutoRequest dto, Usuario solicitante) {
        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !solicitante.getId().equals(dto.barbeiroId())) {
            throw new SecurityException("Barbeiros só podem registrar vendas para si mesmos.");
        }

        Produto produto = produtoRepository.findById(dto.produtoId())
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado."));
        
        Usuario barbeiro = usuarioRepository.findById(dto.barbeiroId())
                .orElseThrow(() -> new IllegalArgumentException("Barbeiro não encontrado."));

        if (!produto.isDisponivel()) {
            throw new IllegalStateException("Produto não está disponível para venda.");
        }

        VendasProdutos novaVenda = new VendasProdutos();
        novaVenda.setProduto(produto);
        novaVenda.setUsuario(barbeiro);
        novaVenda.setPreco(produto.getPreco());
        novaVenda.setPagamento(dto.formaPagamento());
        
        return vendasProdutosRepository.save(novaVenda);
    }

    @Transactional
    public void cancelarVenda(Long vendaId, Usuario solicitante) {
        VendasProdutos venda = vendasProdutosRepository.findById(vendaId)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada."));

        if (solicitante.getTipoUsuario() == TipoUsuario.BARBEIRO && !solicitante.getId().equals(venda.getUsuario().getId())) {
            throw new SecurityException("Usuário não autorizado para cancelar esta venda.");
        }
        vendasProdutosRepository.delete(venda);
    }

    public List<VendasProdutos> listarVendas(Usuario solicitante) {
        if (solicitante.getTipoUsuario() == TipoUsuario.ADMIN) {
            return vendasProdutosRepository.findAll();
        }
        return vendasProdutosRepository.findAllByUsuarioId(solicitante.getId());
    }
}