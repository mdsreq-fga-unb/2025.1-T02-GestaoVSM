import React, { useState, useEffect } from 'react';
import {
  Typography,
  Chip,
  Avatar,
  Fab,
  Skeleton,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HorizontalDatePicker from '../components/HorizontalDatePicker.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';
import FinalizeAppointmentModal from '../modals/FinalizeAppointmentModal.jsx';
import AppointmentModal from '../modals/AppointmentModal.jsx';
import Sidebar from '../components/Sidebar.jsx';

function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'João Silva',
      time: '09:30 - 10:00',
      barberId: 1,
      services: [
        { id: 1, name: 'Corte de cabelo', price: 30, done: false },
        { id: 2, name: 'Barba', price: 20, done: true },
      ],
      finalized: false,
      paymentMethod: '',
    },
    {
      id: 2,
      clientName: 'Maria Oliveira',
      time: '10:30 - 11:00',
      barberId: 2,
      services: [
        { id: 1, name: 'Coloração', price: 120, done: true },
        { id: 2, name: 'Hidratação', price: 80, done: false },
      ],
      finalized: false,
      paymentMethod: '',
    },
    {
      id: 3,
      clientName: 'Carlos Pereira',
      time: '11:30 - 12:30',
      barberId: 3,
      services: [
        { id: 1, name: 'Coloração', price: 120, done: false },
        { id: 2, name: 'Hidratação', price: 80, done: false },
      ],
      finalized: false,
      paymentMethod: '',
    },
  ]);

  const barbers = [
    { id: 1, name: 'Barbeiro 1' },
    { id: 2, name: 'Barbeiro 2' },
    { id: 3, name: 'Barbeiro 3' },
  ];

  const availableServices = [
    { id: 1, name: 'Corte de cabelo', price: 30, duration: 30 },
    { id: 2, name: 'Barba', price: 20, duration: 20 },
    { id: 3, name: 'Coloração', price: 120, duration: 90 },
    { id: 4, name: 'Hidratação', price: 80, duration: 45 },
  ];

  const availableTimes = [
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
    '12:00 - 12:30',
  ];

  const [finalizingAppointment, setFinalizingAppointment] = useState(null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  // Backup para restaurar serviços caso o usuário cancele a finalização
  const [servicesBackup, setServicesBackup] = useState(null);

  // Modal novo agendamento
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBarberId, setNewBarberId] = useState('');
  const [newSelectedServices, setNewSelectedServices] = useState([]);

  const isAdmin = true;

  // Função para atualizar o done de um serviço e, se for o último para finalizar, abrir modal
  const toggleServiceDone = (appointmentId, serviceId) => {
    setAppointments((prev) => {
      return prev.map((appointment) => {
        if (appointment.id !== appointmentId) return appointment;

        const updatedServices = appointment.services.map((service) =>
          service.id === serviceId ? { ...service, done: !service.done } : service
        );

        // Detecta se agora todos os serviços estão marcados como done (ou seja, pronto para finalizar)
        const allDone = updatedServices.length > 0 && updatedServices.every(s => s.done);

        // Se antes NÃO estava finalizado, e agora todos estão done, precisamos abrir modal de finalização
        if (!appointment.finalized && allDone) {
          // Salva backup dos serviços ANTES da mudança (backup do estado anterior ao último toggle)
          setServicesBackup(appointment.services.map(s => ({ ...s })));

          // Abre modal de finalização com estado atualizado dos serviços
          setFinalizingAppointment({
            ...appointment,
            services: updatedServices,
            paymentMethod: appointment.paymentMethod || '',
          });
          setShowFinalizeModal(true);

          // Atualiza somente os serviços (checkboxes marcados)
          return {
            ...appointment,
            services: updatedServices,
          };
        }

        // Se desmarcou algum serviço e o atendimento estava finalizado, "desfinaliza" o atendimento
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

        // Caso normal, só atualiza os serviços
        return {
          ...appointment,
          services: updatedServices,
        };
      });
    });
  };

  useEffect(() => {
    // Se o modal estiver aberto, não precisa reabrir automaticamente
    if (showFinalizeModal) return;

    // Checa se há algum agendamento pronto para finalizar (todos os serviços done e não finalizado)
    const appointmentToFinalize = appointments.find(
      (appointment) =>
        !appointment.finalized &&
        appointment.services.length > 0 &&
        appointment.services.every((s) => s.done)
    );

    if (appointmentToFinalize) {
      // Salva backup para caso precise cancelar
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

  // Confirmar finalização: aplica finalized=true e fecha modal
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

  // Cancelar finalização: restaura backup dos serviços e fecha modal
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

  const getStatusByServices = (services, finalized) => {
    if (finalized) return 'finalizado';

    const allDone = services.every((s) => s.done);
    const someDone = services.some((s) => s.done);

    if (allDone) return 'em andamento'; // Tudo marcado, mas ainda não finalizado
    if (someDone) return 'em andamento';
    return 'agendado';
  };

  const appointmentsWithStatus = appointments.map((appointment) => ({
    ...appointment,
    status: getStatusByServices(appointment.services, appointment.finalized),
  }));

  const filteredAppointments = selectedBarber
    ? appointmentsWithStatus.filter((a) => a.barberId === Number(selectedBarber))
    : appointmentsWithStatus;

  const handleAddAppointmentClick = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
    setNewClientName('');
    setNewTime('');
    setNewBarberId('');
    setNewSelectedServices([]);
  };

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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="p-4 mt-8"
      style={{
        color: 'var(--color-secondary)',
        backgroundColor: 'var(--color-primary)',
      }}
    >
      {/* Header */}
      {loading ? (
        <div className="flex justify-between items-center mb-4">
          <Skeleton variant="text" width={32} height={40} animation="wave" />
          <Skeleton variant="text" width={90} height={40} animation="wave" />
        </div>
      ) : (
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
      )}

      {/* Data */}
      {loading ? (
        <Skeleton variant="text" width={160} height={40} animation="wave" sx={{ mt: 4 }} />
      ) : (
        <Typography
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
      )}

      {/* Date Picker */}
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={60}
          width="100%"
          sx={{ borderRadius: 2, mt: 2, mb: 2 }}
          animation="wave"
        />
      ) : (
        <HorizontalDatePicker
          date={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />
      )}

      {/* Dropdown */}
      {isAdmin &&
        (loading ? (
          <Skeleton
            variant="rectangular"
            height={40}
            width="100%"
            sx={{ borderRadius: 2, mb: 2 }}
            animation="wave"
          />
        ) : (
          <DropdownSelect
            label="Filtrar por barbeiro"
            options={barbers.map((b) => ({ value: b.id, label: b.name }))}
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
            placeholder="Filtrar por barbeiro"
          />
        ))}

      {/* Lista de agendamentos */}
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={88}
            width="100%"
            sx={{ borderRadius: 2, mb: 2 }}
            animation="wave"
          />
        ))
      ) : filteredAppointments.length > 0 ? (
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

      {/* Modal Finalização */}
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

      {/* Modal Novo Agendamento */}
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

      {/* FAB */}
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={140}
          height={48}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            borderRadius: 4,
          }}
          animation="wave"
        />
      ) : (
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
      )}
    </div>
  );
}

export default AgendaPage;
