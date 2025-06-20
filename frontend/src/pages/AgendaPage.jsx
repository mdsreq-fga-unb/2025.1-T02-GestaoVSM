import React, { useState, useEffect } from 'react';
import {
  Typography,
  Chip,
  Avatar,
  Fab,
  Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HorizontalDatePicker from '../components/HorizontalDatePicker.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';
import FinalizeAppointmentModal from '../modals/FinalizeAppointmentModal.jsx';
import AppointmentModal from '../modals/AppointmentModal.jsx';

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

  // Modal novo agendamento
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBarberId, setNewBarberId] = useState('');
  const [newSelectedServices, setNewSelectedServices] = useState([]);

  const isAdmin = true;

  const toggleServiceDone = (appointmentId, serviceId) => {
    setAppointments((prev) =>
      prev.map((appointment) => {
        if (appointment.id !== appointmentId) return appointment;

        const updatedServices = appointment.services.map((service) =>
          service.id === serviceId ? { ...service, done: !service.done } : service
        );

        return {
          ...appointment,
          services: updatedServices,
        };
      })
    );
  };

  useEffect(() => {
    const appointmentToFinalize = appointments.find(
      (appointment) =>
        appointment.services.length > 0 &&
        appointment.services.every((s) => s.done)
    );

    if (appointmentToFinalize) {
      setFinalizingAppointment({
        ...appointmentToFinalize,
        paymentMethod: '',
      });
      setShowFinalizeModal(true);
    } else {
      setShowFinalizeModal(false);
      setFinalizingAppointment(null);
    }
  }, [appointments]);

  const handleConfirmFinalize = () => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === finalizingAppointment.id
          ? { ...finalizingAppointment }
          : appointment
      )
    );

    console.log(
      `Atendimento de ${finalizingAppointment.clientName} finalizado com pagamento: ${finalizingAppointment.paymentMethod}`
    );

    setShowFinalizeModal(false);
    setFinalizingAppointment(null);
  };

  const handleCancelFinalize = () => {
    setAppointments((prev) =>
      prev.map((appointment) => {
        if (appointment.id !== finalizingAppointment.id) return appointment;
        return {
          ...appointment,
          services: appointment.services.map((service) => ({
            ...service,
            done: false,
          })),
        };
      })
    );
    setShowFinalizeModal(false);
    setFinalizingAppointment(null);
  };

  const getStatusByServices = (services) => {
    const allDone = services.every((s) => s.done);
    const someDone = services.some((s) => s.done);

    if (allDone) return 'finalizado';
    if (someDone) return 'em andamento';
    return 'agendado';
  };

  const appointmentsWithStatus = appointments.map((appointment) => ({
    ...appointment,
    status: getStatusByServices(appointment.services),
  }));

  // Aqui ajusta filtro: selectedBarber é string (valor do select), mas barberId é number
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
      className="p-4"
      style={{
        color: 'var(--color-secondary)',
        backgroundColor: 'var(--color-primary)',
      }}
    >
      {/* Header */}
      {loading ? (
        <div className="flex justify-between items-center mb-4">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="circular" width={32} height={32} />
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" sx={{ color: 'var(--color-secondary)' }}>
            Olá, usuário!
          </Typography>
          <Chip
            avatar={<Avatar sx={{ bgcolor: 'var(--color-accent)' }}>M</Avatar>}
            label="Meu Perfil"
            size="small"
            sx={{
              borderRadius: 2,
              height: 32,
              fontSize: '0.8rem',
              backgroundColor: 'var(--color-accent-hover)',
              color: 'var(--color-secondary)',
            }}
          />
        </div>
      )}

      {/* Data */}
      {loading ? (
        <Skeleton variant="text" width={150} height={30} />
      ) : (
        <Typography
          sx={{
            mt: 4,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'var(--color-secondary)',
            textAlign: 'right',
          }}
        >
          {`${selectedDate.getDate()} de ${selectedDate
            .toLocaleDateString('pt-BR', { month: 'long' })
            .replace(/^./, (c) => c.toUpperCase())}`}
        </Typography>
      )}

      {/* Date Picker */}
      {loading ? (
        <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 2, mt: 2, mb: 2 }} />
      ) : (
        <HorizontalDatePicker
          date={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />
      )}

      {/* Dropdown */}
      {isAdmin &&
        (loading ? (
          <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 2, mb: 2 }} />
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
            height={80}
            sx={{ borderRadius: 2, mb: 2 }}
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
          width={112}
          height={48}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            borderRadius: 2,
          }}
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
