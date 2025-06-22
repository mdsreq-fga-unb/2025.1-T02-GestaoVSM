import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../components/Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar', () => {
  // Teste: Deve renderizar o botão para abrir o menu lateral
  it('renderiza o botão de abrir menu', () => {
    render(<Sidebar />);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  // Teste: Ao clicar no botão de abrir, o Drawer deve abrir
  it('abre o Drawer ao clicar no botão de abrir menu', () => {
    render(<Sidebar />);
    const openButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(openButton);

    expect(screen.getByText('Gestão VSM')).toBeInTheDocument();
  });

  // Teste: Deve renderizar todos os itens do menu dentro do Drawer
  it('renderiza todos os itens do menu dentro do Drawer', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));

    const menuItems = [
      'Agenda',
      'Registrar Gasto',
      'Fechar Caixa',
      'Produtos',
      'Serviços',
      'Funcionários',
    ];

    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  // Teste: Ao clicar em um item de menu, deve executar um console.log de navegação
  it('executa console.log ao clicar em um item de menu', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

    render(<Sidebar />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));

    const menuItem = screen.getByText('Agenda');
    fireEvent.click(menuItem);

    expect(consoleSpy).toHaveBeenCalledWith('Navegar para: Agenda');

    consoleSpy.mockRestore();
  });

  // Teste: Deve fechar o Drawer ao clicar no botão de fechar
  it('fecha o Drawer ao clicar no botão de fechar', async () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));

    const closeButton = screen.getByLabelText('Fechar menu');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Gestão VSM')).not.toBeInTheDocument();
    });
  });
});