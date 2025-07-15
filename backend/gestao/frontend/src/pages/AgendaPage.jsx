import React, { useState, useEffect } from 'react';
import {
  Typography,
  Chip,
  Avatar,
  Fab,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import HorizontalDatePicker from '../components/HorizontalDatePicker.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';
import DropdownSelect from '../components/DropdownSelect.jsx';
import FinalizeAppointmentModal from '../modals/FinalizeAppointmentModal.jsx';
import AppointmentModal from '../modals/AppointmentModal.jsx';
import Sidebar from '../components/Sidebar.jsx';

import { getAppointmentsByDate, confirmService, getBarbers, getServices } from '../services/api';

function AgendaPage({
  availableTimes = [],
  isAdmin = true,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState('');
  const [appointments, setAppointments] = useState([]);

  const [barberList, setBarberList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const [finalizingAppointment, setFinalizingAppointment] = useState(null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [servicesBackup, setServicesBackup] = useState(null);

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBarberId, setNewBarberId] = useState('');
  const [newSelectedServices, setNewSelectedServices] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
        const barberId = selectedBarber ? Number(selectedBarber) : null;
        const response = await getAppointmentsByDate(dateObj, barberId);
        // Garante que a resposta seja sempre um array para evitar erros
        setAppointments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setAppointments([]); // Em caso de erro, define como array vazio
      }
    };

    fetchAppointments();
  }, [selectedDate, selectedBarber]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [barbersResponse, servicesResponse] = await Promise.all([
          getBarbers(),
          getServices()
        ]);
        
        setBarberList(barbersResponse.data.filter(user => user.tipoUsuario === 'BARBEIRO'));
        setServiceList(servicesResponse.data);

      } catch (error) {
        console.error("Erro ao carregar dados iniciais (barbeiros/serviços):", error);
      }
    };

    loadInitialData();
  }, []);

  const toggleServiceDone = (appointmentId, serviceId) => {
    setAppointments((prev) =>
      prev.map((appointment) => {
        if (appointment.id !== appointmentId) return appointment;

        // Verificação de segurança
        if (!Array.isArray(appointment.services)) return appointment;

        const updatedServices = appointment.services.map((service) =>
          service.id === serviceId ? { ...service, done: !service.done } : service
        );

        return { ...appointment, services: updatedServices };
      })
    );
  };

  useEffect(() => {
    if (showFinalizeModal) return;

    const appointmentToFinalize = appointments.find(
      (appointment) =>
        // ================== AQUI ESTÁ A CORREÇÃO ==================
        // Adicionamos a verificação "Array.isArray(appointment.services)"
        Array.isArray(appointment.services) &&
        !appointment.finalized &&
        appointment.services.length > 0 &&
        appointment.services.every((s) => s.done)
        // =========================================================
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
  
  // ... (resto da sua lógica de handle... e getStatus... continua aqui, sem alterações)
  const handleConfirmFinalize = async () => {
    if (!finalizingAppointment) return;

    try {
      await confirmService({
        agendamentoId: finalizingAppointment.id,
        formaPagamento: finalizingAppointment.paymentMethod,
      });

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === finalizingAppointment.id
            ? {
              ...appointment,
              finalized: true,
              paymentMethod: finalizingAppointment.paymentMethod,
            }
            : appointment
        )
      );
    } catch (error) {
      console.error('Erro ao confirmar serviço:', error);
      alert('Ocorreu um erro ao finalizar o atendimento.');
    }

    setShowFinalizeModal(false);
    setFinalizingAppointment(null);
    setServicesBackup(null);
  };

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
    // Adiciona verificação de segurança
    if (!Array.isArray(services)) return 'agendado';
    if (finalized) return 'finalizado';
    const allDone = services.every((s) => s.done);
    const someDone = services.some((s) => s.done);
    if (allDone || someDone) return 'em andamento';
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
    // Lógica para salvar o novo agendamento na API
    // ...
    handleCloseAppointmentModal();
  };

  return (
    <div className="p-4 mt-8" style={{ color: 'var(--color-secondary)', backgroundColor: 'var(--color-primary)' }}>
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

      <HorizontalDatePicker date={selectedDate} onDateChange={setSelectedDate} />

      {isAdmin && (
        <DropdownSelect
          label="Filtrar por barbeiro"
          options={barberList.map((b) => ({ value: b.id, label: b.nome }))}
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          placeholder="Filtrar por barbeiro"
        />
      )}

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onToggleServiceDone={toggleServiceDone}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Nenhum agendamento encontrado.
        </Typography>
      )}

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
        barbers={barberList}
        services={serviceList}
        selectedServices={newSelectedServices}
        onServicesChange={setNewSelectedServices}
        availableTimes={availableTimes}
        isAdmin={isAdmin}
      />

      <Box sx={{ height: (theme) => theme.spacing(8) }} />

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
