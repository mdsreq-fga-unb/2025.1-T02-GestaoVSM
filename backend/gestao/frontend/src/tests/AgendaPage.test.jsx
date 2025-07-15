import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AgendaPage from '../pages/AgendaPage';
import '@testing-library/jest-dom';

// Dados simulados de agendamentos para testes
const mockAppointments = [
  {
    id: 1,
    clientName: 'Cliente Agendado',
    time: '08:00 - 08:30',
    barberId: 1,
    services: [
      { id: 1, name: 'Corte de cabelo', price: 30, done: false },
      { id: 2, name: 'Coloração', price: 20, done: false },
    ],
    finalized: false,
    paymentMethod: '',
  },
  {
    id: 2,
    clientName: 'Cliente Em Andamento',
    time: '09:00 - 09:30',
    barberId: 1,
    services: [
      { id: 1, name: 'Barba', price: 30, done: true },
      { id: 2, name: 'Corte de cabelo', price: 20, done: false },
    ],
    finalized: false,
    paymentMethod: '',
  },
  {
    id: 3,
    clientName: 'Cliente Finalizado',
    time: '10:00 - 10:30',
    barberId: 1,
    services: [
      { id: 1, name: 'Hidratação', price: 30, done: true },
      { id: 2, name: 'Corte de cabelo', price: 20, done: true },
    ],
    finalized: true,
    paymentMethod: 'Dinheiro',
  },
  {
    id: 4,
    clientName: 'Cliente Para Finalizar',
    time: '11:00 - 11:30',
    barberId: 1,
    services: [
      { id: 1, name: 'Corte de cabelo', price: 30, done: false },
      { id: 2, name: 'Barba', price: 20, done: false },
    ],
    finalized: false,
    paymentMethod: '',
  }
];

// Barbeiros simulados para testes
const mockBarbers = [
  { id: 1, name: 'Barbeiro 1' },
  { id: 2, name: 'Barbeiro 2' },
  { id: 3, name: 'Barbeiro 3' },
];

// Serviços disponíveis simulados para testes
const mockServices = [
  { id: 1, name: 'Corte de cabelo', price: 30, duration: 30 },
  { id: 2, name: 'Barba', price: 20, duration: 20 },
  { id: 3, name: 'Coloração', price: 120, duration: 90 },
  { id: 4, name: 'Hidratação', price: 80, duration: 45 },
];

// Horários disponíveis simulados para testes
const mockTimes = [
  '09:00 - 09:30',
  '09:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  '12:00 - 12:30',
];

describe('AgendaPage - RF17 e RF18', () => {
  // Função para renderizar o componente com os dados mockados
  const renderComponent = (props = {}) => {
    return render(
      <AgendaPage
        initialAppointments={mockAppointments}
        barbers={mockBarbers}
        availableServices={mockServices}
        availableTimes={mockTimes}
        isAdmin={true}
        {...props}
      />
    );
  };

  // Teste: Deve renderizar o calendário horizontal e permitir navegar pelas datas (RF17)
  it('deve exibir o calendário horizontal e permitir navegação de datas (RF17)', () => {
    renderComponent();
    expect(screen.getByLabelText('data selecionada')).toBeInTheDocument();
  });

  // Teste: Deve listar agendamentos com nome do cliente, horário e serviços (RF17)
  it('deve listar os agendamentos com cliente, horário e serviços (RF17)', () => {
    renderComponent();

    // Verifica agendamento "Cliente Agendado"
    const cardAgendado = screen.getByText('Cliente Agendado').closest('.MuiCard-root');
    expect(cardAgendado).toBeInTheDocument();
    fireEvent.click(
      within(cardAgendado).getByRole('button', { name: /expandir serviços/i })
    );
    expect(within(cardAgendado).getByText('08:00 - 08:30')).toBeInTheDocument();
    expect(within(cardAgendado).getByText(/Corte de cabelo/)).toBeInTheDocument();
    expect(within(cardAgendado).getByText(/Coloração/)).toBeInTheDocument();

    // Verifica agendamento "Cliente Em Andamento"
    const cardEmAndamento = screen.getByText('Cliente Em Andamento').closest('.MuiCard-root');
    expect(cardEmAndamento).toBeInTheDocument();
    fireEvent.click(
      within(cardEmAndamento).getByRole('button', { name: /expandir serviços/i })
    );
    expect(within(cardEmAndamento).getByText('09:00 - 09:30')).toBeInTheDocument();
    expect(within(cardEmAndamento).getByText(/Barba/)).toBeInTheDocument();
    expect(within(cardEmAndamento).getByText(/Corte de cabelo/)).toBeInTheDocument();

    // Verifica agendamento "Cliente Finalizado"
    const cardFinalizado = screen.getByText('Cliente Finalizado').closest('.MuiCard-root');
    expect(cardFinalizado).toBeInTheDocument();
    fireEvent.click(
      within(cardFinalizado).getByRole('button', { name: /expandir serviços/i })
    );
    expect(within(cardFinalizado).getByText('10:00 - 10:30')).toBeInTheDocument();
    expect(within(cardFinalizado).getByText(/Hidratação/)).toBeInTheDocument();
    expect(within(cardFinalizado).getByText(/Corte de cabelo/)).toBeInTheDocument();
  });

  // Teste: Deve exibir o status correto de cada agendamento (RF17)
  it('deve exibir o status correto de cada agendamento (RF17)', () => {
    renderComponent();

    expect(screen.getByLabelText('status-agendamento-1')).toHaveTextContent(/agendado/i);
    expect(screen.getByLabelText('status-agendamento-2')).toHaveTextContent(/em andamento/i);
    expect(screen.getByLabelText('status-agendamento-3')).toHaveTextContent(/finalizado/i);
  });

  // Teste: Deve exibir filtro de barbeiro somente para usuário admin (RF17)
  it('deve exibir o filtro por barbeiro apenas para admin (RF17)', () => {
    renderComponent();
    expect(screen.getByLabelText(/Filtrar por barbeiro/i)).toBeInTheDocument();
  });

  // Teste: Deve abrir o modal de finalização ao marcar todos os serviços como concluídos (RF17)
  it('deve abrir o modal de finalização ao marcar todos os serviços como concluídos (RF17)', () => {
    renderComponent();

    const cardParaFinalizar = screen.getByText('Cliente Para Finalizar').closest('.MuiCard-root');
    const toggleButton = within(cardParaFinalizar).getByRole('button', { name: /expandir serviços/i });
    fireEvent.click(toggleButton);

    const corteCheckbox = within(cardParaFinalizar).getByLabelText(/Serviço Corte de cabelo do cliente Cliente Para Finalizar/i);
    const barbaCheckbox = within(cardParaFinalizar).getByLabelText(/Serviço Barba do cliente Cliente Para Finalizar/i);
    fireEvent.click(corteCheckbox);
    fireEvent.click(barbaCheckbox);

    expect(screen.getByText(/Forma de pagamento/i)).toBeInTheDocument();
  });

  // Teste: Deve exibir botão para criar novo agendamento (RF18)
  it('deve exibir o botão de ação rápida para criar novo agendamento (RF18)', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Novo agendamento/i })).toBeInTheDocument();
  });

  // Teste: Deve abrir o modal de novo agendamento ao clicar no botão (RF18)
  it('deve abrir o modal de novo agendamento ao clicar no botão (RF18)', () => {
    renderComponent();

    const fabButton = screen.getByRole('button', { name: /Novo agendamento/i });
    fireEvent.click(fabButton);
    const modal = screen.getByRole('dialog');
    const modalWithin = within(modal);

    expect(modalWithin.getByText(/^Novo Agendamento$/i)).toBeInTheDocument();
    expect(modalWithin.getByPlaceholderText(/Nome do cliente/i)).toBeInTheDocument();
    expect(modalWithin.getByLabelText(/Horário/i)).toBeInTheDocument();
    expect(modalWithin.getByLabelText(/Barbeiro/i)).toBeInTheDocument();
    expect(modalWithin.getByText(/Selecione os serviços/i)).toBeInTheDocument();
  });
});
