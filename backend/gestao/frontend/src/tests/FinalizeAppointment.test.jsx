import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FinalizeAppointmentModal from '../modals/FinalizeAppointmentModal';
import '@testing-library/jest-dom';

describe('FinalizeAppointmentModal', () => {
  const baseAppointment = {
    id: 1,
    clientName: 'João',
    services: [
      { id: 1, name: 'Corte de cabelo', price: 30, done: true },
      { id: 2, name: 'Barba', price: 20, done: true },
      { id: 3, name: 'Hidratação', price: 50, done: false }, 
    ],
    paymentMethod: '',
  };

  const defaultProps = {
    open: true,
    appointment: baseAppointment,
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
    onPaymentChange: vi.fn(),
  };

  // Teste: Exibe somente os serviços marcados como concluídos e calcula subtotal corretamente
  it('deve exibir os serviços concluídos e subtotal correto', () => {
    render(<FinalizeAppointmentModal {...defaultProps} />);

    expect(screen.getByText(/Corte de cabelo/i)).toBeInTheDocument();
    expect(screen.getByText(/Barba/i)).toBeInTheDocument();
    // Serviço não concluído não deve aparecer
    expect(screen.queryByText(/Hidratação/i)).not.toBeInTheDocument();

    expect(screen.getByText(/Subtotal/i)).toBeInTheDocument();
    // Subtotal = soma dos serviços concluídos: 30 + 20 = 50
    expect(screen.getByText(/R\$ 50\.00/i)).toBeInTheDocument();
  });

  // Teste: Botão Confirmar deve estar desabilitado sem forma de pagamento selecionada
  it('deve desabilitar o botão Confirmar se não houver forma de pagamento selecionada', () => {
    render(<FinalizeAppointmentModal {...defaultProps} />);
    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    expect(confirmButton).toBeDisabled();
  });

  // Teste: Botão Confirmar habilita quando uma forma de pagamento é selecionada
  it('deve habilitar o botão Confirmar se uma forma de pagamento for selecionada', () => {
    const filledProps = {
      ...defaultProps,
      appointment: { ...baseAppointment, paymentMethod: 'PIX' },
    };

    render(<FinalizeAppointmentModal {...filledProps} />);
    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    expect(confirmButton).toBeEnabled();
  });

  // Teste: Chama callback onCancel ao clicar no botão Cancelar
  it('deve chamar onCancel ao clicar em Cancelar', () => {
    render(<FinalizeAppointmentModal {...defaultProps} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  // Teste: Chama callback onConfirm ao clicar em Confirmar quando botão habilitado
  it('deve chamar onConfirm ao clicar em Confirmar quando habilitado', () => {
    const filledProps = {
      ...defaultProps,
      appointment: { ...baseAppointment, paymentMethod: 'Débito' },
    };

    render(<FinalizeAppointmentModal {...filledProps} />);
    const confirmButton = screen.getByRole('button', { name: /Confirmar/i });
    fireEvent.click(confirmButton);
    expect(filledProps.onConfirm).toHaveBeenCalled();
  });

  // Teste: Não renderiza nada se appointment for null
  it('não deve renderizar nada se appointment for null', () => {
    render(
      <FinalizeAppointmentModal
        {...defaultProps}
        appointment={null}
      />
    );
    expect(screen.queryByText(/Finalizar Atendimento/i)).not.toBeInTheDocument();
  });
});
