import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppointmentModal from '../modals/AppointmentModal';
import '@testing-library/jest-dom';

describe('AppointmentModal', () => {
  // Props mock para testar o componente AppointmentModal
  const mockProps = {
    open: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    clientName: '',
    onClientNameChange: vi.fn(),
    time: '',
    onTimeChange: vi.fn(),
    barberId: '',
    onBarberChange: vi.fn(),
    barbers: [
      { id: 1, name: 'Barbeiro 1' },
      { id: 2, name: 'Barbeiro 2' },
    ],
    services: [
      { id: 1, name: 'Corte de cabelo', price: 30, duration: 30 },
      { id: 2, name: 'Barba', price: 20, duration: 20 },
    ],
    selectedServices: [],
    onServicesChange: vi.fn(),
    availableTimes: ['09:00 - 09:30', '10:00 - 10:30'],
  };

  // Teste: Deve exibir os campos obrigatórios no modal
  it('deve exibir os campos obrigatórios: cliente, horário, barbeiro e serviços', () => {
    render(<AppointmentModal {...mockProps} />);

    expect(screen.getByPlaceholderText(/Nome do cliente/i)).toBeInTheDocument();
    expect(screen.getByText(/Horário/i)).toBeInTheDocument();
    expect(screen.getByText(/Barbeiro/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecione os serviços/i)).toBeInTheDocument();
  });

  // Teste: Deve chamar onClose ao clicar no botão "Cancelar"
  it('deve chamar onClose ao clicar em Cancelar', () => {
    render(<AppointmentModal {...mockProps} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  // Teste: Botão "Salvar" deve ficar desabilitado com campos obrigatórios vazios
  it('botão de salvar deve permanecer desabilitado com campos obrigatórios vazios', () => {
    render(<AppointmentModal {...mockProps} />);
    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    expect(saveButton).toBeDisabled();
  });

  // Teste: Botão "Salvar" deve habilitar quando campos obrigatórios forem preenchidos
  it('botão de salvar deve habilitar quando campos obrigatórios forem preenchidos', () => {
    const filledProps = {
      ...mockProps,
      clientName: 'João',
      time: '09:00 - 09:30',
      barberId: 1,
      selectedServices: [1],
    };

    render(<AppointmentModal {...filledProps} />);
    const saveButton = screen.getByRole('button', { name: /Salvar/i });
    expect(saveButton).toBeEnabled();
  });

  // Teste: Deve mostrar tempo estimado e subtotal corretamente ao selecionar serviços
  it('deve mostrar corretamente o tempo estimado e o subtotal ao selecionar serviços', () => {
    const filledProps = {
      ...mockProps,
      selectedServices: [1, 2], 
    };

    render(<AppointmentModal {...filledProps} />);

    expect(screen.getByText(/Tempo estimado/i)).toBeInTheDocument();
    expect(screen.getByText(/50 min/i)).toBeInTheDocument(); // 30 + 20 minutos
    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/R\$ 50\.00/i)).toBeInTheDocument(); // 30 + 20 reais
  });
});
