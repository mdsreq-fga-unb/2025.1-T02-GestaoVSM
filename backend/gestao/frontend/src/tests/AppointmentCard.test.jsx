import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppointmentCard from '../components/AppointmentCard';
import '@testing-library/jest-dom';

describe('AppointmentCard', () => {
  // Dados base para os testes do componente AppointmentCard
  const baseAppointment = {
    id: 1,
    clientName: 'João Silva',
    time: '09:30 - 10:00',
    status: 'agendado',
    paymentMethod: '',
    services: [
      { id: 1, name: 'Corte de cabelo', price: 30, done: false },
      { id: 2, name: 'Barba', price: 20, done: true },
    ],
  };

  let mockToggle;

  // Função mock para simular callback onToggleServiceDone antes de cada teste
  beforeEach(() => {
    mockToggle = vi.fn();
  });

  // Função para renderizar o componente com dados opcionais
  const renderComponent = (appointment = baseAppointment) => {
    render(<AppointmentCard appointment={appointment} onToggleServiceDone={mockToggle} />);
  };

  // Teste: Deve exibir nome do cliente e horário do agendamento
  it('deve exibir o nome do cliente e o horário', () => {
    renderComponent();

    expect(screen.getByText(baseAppointment.clientName)).toBeInTheDocument();
    expect(screen.getByText(baseAppointment.time)).toBeInTheDocument();
  });

  // Teste: Deve exibir o status correto conforme propriedade "status"
  it('deve exibir o status correto conforme a propriedade "status"', () => {
    const statusValues = ['agendado', 'em andamento', 'finalizado'];

    statusValues.forEach((status) => {
      renderComponent({ ...baseAppointment, status });
      expect(screen.getByText(new RegExp(status, 'i'))).toBeInTheDocument();
    });
  });

  // Teste: Deve exibir método de pagamento somente quando status for "finalizado" e paymentMethod definido
  it('deve exibir o método de pagamento somente quando status for "finalizado" e paymentMethod estiver definido', () => {
    const appointmentFinalizado = {
      ...baseAppointment,
      status: 'finalizado',
      paymentMethod: 'PIX',
    };

    renderComponent(appointmentFinalizado);

    expect(screen.getByText(/finalizado/i)).toBeInTheDocument();
    expect(screen.getByText(/PIX/i)).toBeInTheDocument();
  });

  // Teste: Não deve exibir método de pagamento se status for diferente de "finalizado"
  it('não deve exibir método de pagamento se status for diferente de "finalizado"', () => {
    const appointment = {
      ...baseAppointment,
      status: 'em andamento',
      paymentMethod: 'PIX',
    };

    renderComponent(appointment);

    expect(screen.queryByText(/PIX/i)).not.toBeInTheDocument();
  });

  // Teste: Deve mostrar mensagem ou não exibir serviços se lista estiver vazia
  it('deve mostrar mensagem ou não exibir serviços se lista de serviços estiver vazia', () => {
    const appointmentSemServicos = {
      ...baseAppointment,
      services: [],
    };

    renderComponent(appointmentSemServicos);

    const toggleBtn = screen.getByTestId('appointment-toggle-button');
    fireEvent.click(toggleBtn);

    // Como não há serviços, eles não devem aparecer
    expect(screen.queryByText(/Corte de cabelo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Barba/i)).not.toBeInTheDocument();
  });

  // Teste: Deve expandir e mostrar serviços ao clicar no botão de toggle
  it('deve expandir e mostrar os serviços ao clicar no botão de toggle', () => {
    renderComponent();

    // Inicialmente, serviços não estão visíveis
    expect(screen.queryByText('Corte de cabelo')).not.toBeInTheDocument();

    const toggleBtn = screen.getByTestId('appointment-toggle-button');
    fireEvent.click(toggleBtn);

    // Após clique, serviços aparecem
    expect(screen.getByText('Corte de cabelo')).toBeInTheDocument();
    expect(screen.getByText('Barba')).toBeInTheDocument();
  });

  // Teste: Deve alternar expandir/fechar ao clicar no botão de toggle
  it('deve alternar expandir/fechar ao clicar no botão de toggle', async () => {
    renderComponent();

    const toggleBtn = screen.getByTestId('appointment-toggle-button');

    // Expande serviços
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Corte de cabelo')).toBeInTheDocument();

    // Fecha serviços
    fireEvent.click(toggleBtn);
    await waitFor(() => {
      expect(screen.queryByText('Corte de cabelo')).not.toBeInTheDocument();
    });
  });

  // Teste: Ao clicar no checkbox do serviço, deve chamar onToggleServiceDone com IDs corretos
  it('ao clicar no checkbox do serviço, deve chamar onToggleServiceDone com IDs corretos', () => {
    renderComponent();

    const toggleBtn = screen.getByTestId('appointment-toggle-button');
    fireEvent.click(toggleBtn);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(baseAppointment.services.length);

    fireEvent.click(checkboxes[0]);
    expect(mockToggle).toHaveBeenCalledWith(baseAppointment.id, baseAppointment.services[0].id);
  });
});
