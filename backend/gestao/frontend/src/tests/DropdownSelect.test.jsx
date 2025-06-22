import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DropdownSelect from '../components/DropdownSelect';
import '@testing-library/jest-dom';

describe('DropdownSelect', () => {
  const mockOptions = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3' },
  ];

  // Teste: Deve renderizar o placeholder quando nenhum valor estiver selecionado
  it('deve renderizar o placeholder quando nenhum valor estiver selecionado', () => {
    render(
      <DropdownSelect
        label="Exemplo"
        options={mockOptions}
        value=""
        onChange={vi.fn()}
        placeholder="Selecione uma opção"
      />
    );

    expect(screen.getByText(/Selecione uma opção/i)).toBeInTheDocument();
  });

  // Teste: Deve exibir todas as opções disponíveis ao abrir o dropdown
  it('deve exibir todas as opções quando aberto', () => {
    render(
      <DropdownSelect
        label="Exemplo"
        options={mockOptions}
        value=""
        onChange={vi.fn()}
      />
    );

    const select = screen.getByRole('combobox', { name: /Exemplo/i });
    fireEvent.mouseDown(select); // abrir o dropdown

    expect(screen.getByText('Opção 1')).toBeInTheDocument();
    expect(screen.getByText('Opção 2')).toBeInTheDocument();
    expect(screen.getByText('Opção 3')).toBeInTheDocument();
  });

  // Teste: Deve chamar onChange ao selecionar uma opção do dropdown
  it('deve chamar onChange ao selecionar uma opção', () => {
    const mockOnChange = vi.fn();

    render(
      <DropdownSelect
        label="Exemplo"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox', { name: /Exemplo/i });
    fireEvent.mouseDown(select);

    const option = screen.getByText('Opção 2');
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalled();
  });

  // Teste: Deve utilizar renderValue personalizado quando fornecido
  it('deve usar renderValue personalizado se fornecido', () => {
    const customRenderValue = (selected) => `Selecionado: ${selected}`;

    render(
      <DropdownSelect
        label="Exemplo"
        options={mockOptions}
        value="2"
        onChange={vi.fn()}
        renderValue={customRenderValue}
      />
    );

    expect(screen.getByText('Selecionado: 2')).toBeInTheDocument();
  });
});
