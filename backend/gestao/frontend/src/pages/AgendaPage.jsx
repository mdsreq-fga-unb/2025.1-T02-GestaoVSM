import React, { useState, useEffect } from 'react';
import {
  Typography,
  Chip,
  Avatar,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HorizontalDatePicker from '../components/HorizontalDatePicker.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';
import FinalizeAppointmentModal from '../modals/FinalizeAppointmentModal.jsx';
import AppointmentModal from '../modals/AppointmentModal.jsx';
import Sidebar from '../components/Sidebar.jsx';

function AgendaPage({
  initialAppointments = [],  // Agendamentos iniciais passados por props
  barbers = [],             // Lista de barbeiros
  availableServices = [],   // Serviços disponíveis para agendamento
  availableTimes = [],      // Horários disponíveis
  isAdmin = true,           // Se o usuário é administrador (para mostrar filtro)
}) {
  // Estados para controle do filtro, agendamentos e modais
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState('');
  const [appointments, setAppointments] = useState(initialAppointments);

  // Controle do modal de finalização e dados temporários para rollback
  const [finalizingAppointment, setFinalizingAppointment] = useState(null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [servicesBackup, setServicesBackup] = useState(null);

  // Controle do modal de novo agendamento e campos do formulário
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBarberId, setNewBarberId] = useState('');
  const [newSelectedServices, setNewSelectedServices] = useState([]);

  /**
   * Alterna o estado "done" de um serviço dentro de um agendamento,
   * atualiza o agendamento, e dispara modal de finalização se todos os serviços forem concluídos.
   */
  const toggleServiceDone = (appointmentId, serviceId) => {
    setAppointments((prev) => {
      return prev.map((appointment) => {
        if (appointment.id !== appointmentId) return appointment;

        // Atualiza o serviço específico invertendo o done
        const updatedServices = appointment.services.map((service) =>
          service.id === serviceId ? { ...service, done: !service.done } : service
        );

        // Verifica se todos os serviços estão marcados como feitos
        const allDone = updatedServices.length > 0 && updatedServices.every(s => s.done);

        // Se ainda não finalizado e todos serviços feitos, abre modal de finalização
        if (!appointment.finalized && allDone) {
          setServicesBackup(appointment.services.map(s => ({ ...s }))); // guarda backup para possível rollback
          setFinalizingAppointment({
            ...appointment,
            services: updatedServices,
            paymentMethod: appointment.paymentMethod || '',
          });
          setShowFinalizeModal(true);

          return {
            ...appointment,
            services: updatedServices,
          };
        }

        // Se serviço foi desmarcado depois de finalizado, reabre o agendamento para edição
        const wasServiceDone = appointment.services.find(s => s.id === serviceId)?.done;
        const isNowUndone = wasServiceDone === true && updatedServices.find(s => s.id === serviceId).done === false;

        if (isNowUndone && appointment.finalized) {
          return {
            ...appointment,
            services: updatedServices,
            paymentMethod: '',
            finalized: false,
          };
        }

        // Atualiza serviços sem mudar status finalizado
        return {
          ...appointment,
          services: updatedServices,
        };
      });
    });
  };

  /**
   * Efeito que abre o modal de finalização automaticamente
   * caso exista algum agendamento com todos os serviços marcados como feitos e não finalizado.
   */
  useEffect(() => {
    if (showFinalizeModal) return;

    const appointmentToFinalize = appointments.find(
      (appointment) =>
        !appointment.finalized &&
        appointment.services.length > 0 &&
        appointment.services.every((s) => s.done)
    );

    if (appointmentToFinalize) {
      setServicesBackup(appointmentToFinalize.services.map((s) => ({ ...s })));
      setFinalizingAppointment({
        ...appointmentToFinalize,
        paymentMethod: appointmentToFinalize.paymentMethod || '',
      });
      setShowFinalizeModal(true);
    } else {
      setShowFinalizeModal(false);
      setFinalizingAppointment(null);
      setServicesBackup(null);
    }
  }, [appointments, showFinalizeModal]);

  /**
   * Confirma finalização do agendamento,
   * marcando-o como finalizado no estado.
   */
  const handleConfirmFinalize = () => {
    if (!finalizingAppointment) return;

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === finalizingAppointment.id
          ? {
            ...finalizingAppointment,
            finalized: true,
          }
          : appointment
      )
    );

    setShowFinalizeModal(false);
    setFinalizingAppointment(null);
    setServicesBackup(null);
  };

  /**
   * Cancela finalização e restaura os serviços ao backup anterior.
   */
  const handleCancelFinalize = () => {
    if (finalizingAppointment && servicesBackup) {
      setAppointments((prev) =>
        prev.map((appointment) => {
          if (appointment.id !== finalizingAppointment.id) return appointment;
          return {
            ...appointment,
            services: servicesBackup,
          };
        })
      );
    }
    setShowFinalizeModal(false);
    setFinalizingAppointment(null);
    setServicesBackup(null);
  };

  /**
   * Retorna o status de um agendamento com base no estado dos seus serviços e se está finalizado.
   */
  const getStatusByServices = (services, finalized) => {
    if (finalized) return 'finalizado';

    const allDone = services.every((s) => s.done);
    const someDone = services.some((s) => s.done);

    if (allDone) return 'em andamento';
    if (someDone) return 'em andamento';
    return 'agendado';
  };

  // Mapeia os agendamentos adicionando o campo status para facilitar exibição
  const appointmentsWithStatus = appointments.map((appointment) => ({
    ...appointment,
    status: getStatusByServices(appointment.services, appointment.finalized),
  }));

  // Filtra agendamentos pelo barbeiro selecionado, se houver filtro ativo
  const filteredAppointments = selectedBarber
    ? appointmentsWithStatus.filter((a) => a.barberId === Number(selectedBarber))
    : appointmentsWithStatus;

  // Abre modal de novo agendamento
  const handleAddAppointmentClick = () => {
    setShowAppointmentModal(true);
  };

  // Fecha modal de novo agendamento e limpa campos
  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
    setNewClientName('');
    setNewTime('');
    setNewBarberId('');
    setNewSelectedServices([]);
  };

  /**
   * Salva novo agendamento com os dados do formulário, adicionando no estado local.
   */
  const handleSaveAppointment = () => {
    const newAppointment = {
      id: appointments.length + 1,
      clientName: newClientName.trim(),
      time: newTime.trim(),
      barberId: Number(newBarberId),
      services: availableServices
        .filter((s) => newSelectedServices.includes(s.id))
        .map((s) => ({ ...s, done: false })),
      finalized: false,
      paymentMethod: '',
    };

    setAppointments((prev) => [...prev, newAppointment]);
    handleCloseAppointmentModal();
  };

  return (
    <div
      className="p-4 mt-8"
      style={{
        color: 'var(--color-secondary)',
        backgroundColor: 'var(--color-primary)',
      }}
    >
      {/* Cabeçalho com Sidebar e perfil */}
      <div className="flex justify-between items-center mb-4">
        <Sidebar />
        <Chip
          avatar={<Avatar sx={{ bgcolor: 'var(--color-accent)' }}>M</Avatar>}
          label="Meu Perfil"
          size="small"
          sx={{
            borderRadius: 2,
            height: 24,
            fontSize: '0.8rem',
            backgroundColor: '#FFF5E5',
            color: 'var(--color-secondary)',
          }}
        />
      </div>

      {/* Exibe data selecionada formatada */}
      <Typography
        aria-label="data selecionada"
        sx={{
          mt: 4,
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: 'var(--color-secondary)',
          textAlign: 'left',
        }}
      >
        {`${selectedDate.getDate()} de ${selectedDate
          .toLocaleDateString('pt-BR', { month: 'long' })
          .replace(/^./, (c) => c.toUpperCase())}`}
      </Typography>

      {/* Componente customizado para escolher data horizontalmente */}
      <HorizontalDatePicker
        date={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
      />

      {/* Filtro de barbeiro (apenas para admin) */}
      {isAdmin && (
        <DropdownSelect
          label="Filtrar por barbeiro"
          options={barbers.map((b) => ({ value: b.id, label: b.name }))}
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          placeholder="Filtrar por barbeiro"
        />
      )}

      {/* Lista de agendamentos filtrados, ou mensagem caso vazio */}
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onToggleServiceDone={toggleServiceDone}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Nenhum agendamento encontrado.
        </Typography>
      )}

      {/* Modal para finalizar agendamento (aparece quando necessário) */}
      {finalizingAppointment && (
        <FinalizeAppointmentModal
          open={showFinalizeModal}
          appointment={finalizingAppointment}
          onCancel={handleCancelFinalize}
          onConfirm={handleConfirmFinalize}
          onPaymentChange={(newPayment) =>
            setFinalizingAppointment((prev) => ({
              ...prev,
              paymentMethod: newPayment,
            }))
          }
        />
      )}

      {/* Modal para criar novo agendamento */}
      <AppointmentModal
        open={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
        onSave={handleSaveAppointment}
        clientName={newClientName}
        onClientNameChange={setNewClientName}
        time={newTime}
        onTimeChange={setNewTime}
        barberId={newBarberId}
        onBarberChange={setNewBarberId}
        barbers={barbers}
        services={availableServices}
        selectedServices={newSelectedServices}
        onServicesChange={setNewSelectedServices}
        availableTimes={availableTimes}
      />

      {/* Botão flutuante para abrir modal de novo agendamento */}
      <Fab
        variant="extended"
        aria-label="Novo agendamento"
        onClick={handleAddAppointmentClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          textTransform: 'none',
          borderRadius: 2,
          bgcolor: 'var(--color-secondary)',
          color: '#fff',
          '& .MuiSvgIcon-root': {
            color: 'var(--color-accent)',
            transition: 'color 0.3s',
          },
          '&:hover': {
            bgcolor: 'var(--color-primary)',
            color: 'var(--color-secondary)',
          },
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Agendar
      </Fab>
    </div>
  );
}

export default AgendaPage;
