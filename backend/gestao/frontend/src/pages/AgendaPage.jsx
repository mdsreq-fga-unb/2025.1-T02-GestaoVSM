import React, { useState, useEffect, useMemo } from 'react';
import {
  Typography,
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

import { 
  getAppointmentsByDate, 
  confirmService, 
  createAppointment,
  getUsers,
  getServices,
  deleteAppointment
} from '../services/api';


function AgendaPage() {
  // Estados para os dados da API
  const [barbers, setBarbers] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  
  const isAdmin = true;

  // Estados da página
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBarber, setSelectedBarber] = useState('');
  const [appointments, setAppointments] = useState([]);
  
  // CORREÇÃO: Estados de loading separados para maior controlo
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(true);
  
  const [finalizingAppointment, setFinalizingAppointment] = useState(null);
  
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newBarberId, setNewBarberId] = useState('');
  const [newSelectedServices, setNewSelectedServices] = useState([]);
  
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Efeito para buscar dados iniciais (usuários e serviços)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsInitialDataLoading(true);
      try {
        const [usersResponse, servicesResponse] = await Promise.all([
          getUsers(),
          getServices()
        ]);
        
        if (usersResponse && Array.isArray(usersResponse.data)) {
            const allUsers = usersResponse.data;
            const filteredBarbers = allUsers.filter(user => user.tipoUsuario === 'BARBEIRO');
            const formattedBarbers = filteredBarbers.map(barber => ({
              value: barber.id,
              label: barber.nome
            }));
            setBarbers(formattedBarbers);
        }

        if (servicesResponse && Array.isArray(servicesResponse.data)) {
            setAvailableServices(servicesResponse.data);
        }

      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      } finally {
        setIsInitialDataLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Efeito para buscar agendamentos
  useEffect(() => {
    // CORREÇÃO: Só busca agendamentos depois que os dados iniciais foram carregados
    if (isInitialDataLoading) return;

    const fetchAppointments = async () => {
      setIsAppointmentsLoading(true);
      try {
        const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
        const barberId = selectedBarber ? Number(selectedBarber) : null;
        const response = await getAppointmentsByDate(dateObj, barberId);
        
        if (response && Array.isArray(response.data)) {
            const initialAppointments = response.data.map(app => ({
              ...app,
              servicos: Array.isArray(app.servicos) ? app.servicos.map(s => ({ ...s, done: false })) : [],
              finalized: false,
              paymentMethod: ''
            }));
            setAppointments(initialAppointments);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setAppointments([]);
      } finally {
        setIsAppointmentsLoading(false);
      }
    };
    fetchAppointments();
  }, [selectedDate, selectedBarber, isInitialDataLoading, lastUpdate]);

  // Lógica para calcular os horários disponíveis
  const availableTimes = useMemo(() => {
    if (!newBarberId) return [];
    
    const allDaySlots = [];
    for (let hour = 9; hour < 19; hour++) {
      allDaySlots.push(`${String(hour).padStart(2, '0')}:00`);
      allDaySlots.push(`${String(hour).padStart(2, '0')}:30`);
    }

    const barberAppointments = appointments.filter(app => app.barbeiroId === Number(newBarberId));
    const occupiedSlots = new Set();
    barberAppointments.forEach(app => {
      const startDate = new Date(app.dataAgendamento);
      const duration = app.duracaoMinutos || 30;
      const endDate = new Date(startDate.getTime() + duration * 60000);
      let currentSlotTime = new Date(startDate);
      while (currentSlotTime < endDate) {
        const hours = String(currentSlotTime.getHours()).padStart(2, '0');
        const minutes = String(currentSlotTime.getMinutes()).padStart(2, '0');
        occupiedSlots.add(`${hours}:${minutes}`);
        currentSlotTime.setMinutes(currentSlotTime.getMinutes() + 30);
      }
    });
    return allDaySlots.filter(slot => !occupiedSlots.has(slot));
  }, [newBarberId, appointments]);

  const handleBarberChangeInModal = (barberId) => {
    setNewBarberId(barberId);
    setNewTime(''); 
  };

  const toggleServiceDone = (appointmentId, serviceId) => {
    setAppointments(prev => prev.map(appointment => {
      if (appointment.id !== appointmentId) return appointment;
      const updatedServices = appointment.servicos.map(service =>
        service.id === serviceId ? { ...service, done: !service.done } : service
      );
      if (appointment.finalized && appointment.servicos.find(s => s.id === serviceId)?.done) {
        return { ...appointment, servicos: updatedServices, finalized: false, paymentMethod: '' };
      }
      return { ...appointment, servicos: updatedServices };
    }));
  };

  useEffect(() => {
    if (finalizingAppointment) return;
    const appointmentToFinalize = appointments.find(
      (appointment) =>
      !appointment.finalized &&
      Array.isArray(appointment.servicos) &&
      appointment.servicos.length > 0 &&
      appointment.servicos.every((s) => s.done)
    );
    if (appointmentToFinalize) {
      setFinalizingAppointment({ ...appointmentToFinalize });
    }
  }, [appointments, finalizingAppointment]);

  const handleConfirmFinalize = async () => {
    if (!finalizingAppointment) return;
    try {
      setFinalizingAppointment(null);
      await confirmService({
        agendamentoId: finalizingAppointment.id,
        formaPagamento: finalizingAppointment.paymentMethod,
      });
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Erro ao confirmar serviço:', error);
      alert('Não foi possível finalizar o atendimento. Tente novamente.');
      setLastUpdate(Date.now());
    }
  };

  const handleCancelFinalize = () => {
    if (!finalizingAppointment) return;
    setAppointments(prev =>
      prev.map(app => {
        if (app.id === finalizingAppointment.id) {
          const revertedServices = [...app.servicos];
          if (revertedServices.length > 0) {
            revertedServices[0] = { ...revertedServices[0], done: false };
          }
          return { ...app, servicos: revertedServices };
        }
        return app;
      })
    );
    setFinalizingAppointment(null);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Tem a certeza que deseja cancelar este agendamento?')) {
      try {
        await deleteAppointment(appointmentId);
        setLastUpdate(Date.now());
      } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        alert('Não foi possível cancelar o agendamento. Tente novamente.');
      }
    }
  };

  const getStatusByServices = (services = [], finalized) => {
    if (finalized) return 'finalizado';
    if (services.length > 0 && services.every((s) => s.done)) return 'em andamento';
    if (services.some((s) => s.done)) return 'em andamento';
    return 'agendado';
  };

  const appointmentsWithStatus = appointments.map((appointment) => ({
    ...appointment,
    status: getStatusByServices(appointment.servicos, appointment.finalized),
  }));

  const handleAddAppointmentClick = () => setShowAppointmentModal(true);

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
    setNewClientName('');
    setNewTime('');
    setNewBarberId('');
    setNewSelectedServices([]);
  };

  const handleSaveAppointment = async () => {
    if (!newClientName || !newTime || !newBarberId || newSelectedServices.length === 0) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    const [hours, minutes] = newTime.split(':');
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const localISOString = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    const appointmentData = {
      nomeCliente: newClientName.trim(),
      barbeiroId: Number(newBarberId),
      servicoIds: newSelectedServices,
      dataAgendamento: localISOString,
    };

    try {
      await createAppointment(appointmentData);
      setLastUpdate(Date.now());
      handleCloseAppointmentModal();
    } catch (error)      {
      console.error('Erro ao criar agendamento:', error);
      alert('Ocorreu um erro ao criar o agendamento. Verifique o console para mais detalhes.');
    }
  };

  const isLoading = isInitialDataLoading || isAppointmentsLoading;

  return (
    <div className="p-4 mt-8" style={{ color: '#333', backgroundColor: '#f9f9f9' }}>
      <div className="flex justify-between items-center mb-4"> <Sidebar /> </div>
      <Typography aria-label="data selecionada" sx={{ mt: 4, fontSize: '1.4rem', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
        {`${selectedDate.getDate()} de ${selectedDate.toLocaleDateString('pt-BR', { month: 'long' }).replace(/^./, (c) => c.toUpperCase())}`}
      </Typography>
      <HorizontalDatePicker date={selectedDate} onDateChange={setSelectedDate} />
      {isAdmin && (
        <DropdownSelect
          label="Filtrar por barbeiro"
          options={barbers}
          value={selectedBarber}
          onChange={(e) => setSelectedBarber(e.target.value)}
          placeholder="Todos os barbeiros"
          disabled={isInitialDataLoading}
        />
      )}
      {isLoading ? (
        <Typography sx={{ textAlign: 'center', mt: 4 }}>A carregar...</Typography>
      ) : appointmentsWithStatus.length > 0 ? (
        appointmentsWithStatus.map((appointment) => (
          <AppointmentCard 
            key={appointment.id} 
            appointment={appointment} 
            onToggleServiceDone={toggleServiceDone}
            onCancelAppointment={handleCancelAppointment}
          />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Nenhum agendamento para a data e barbeiro selecionados.
        </Typography>
      )}
      {finalizingAppointment && Array.isArray(finalizingAppointment.servicos) && (
        <FinalizeAppointmentModal
          open={!!finalizingAppointment}
          appointment={finalizingAppointment}
          onCancel={handleCancelFinalize}
          onConfirm={handleConfirmFinalize}
          onPaymentChange={(newPayment) =>
            setFinalizingAppointment(prev => ({ ...prev, paymentMethod: newPayment }))
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
        onBarberChange={handleBarberChangeInModal} 
        barbers={barbers}
        services={availableServices}
        selectedServices={newSelectedServices} 
        onServicesChange={setNewSelectedServices} 
        availableTimes={availableTimes}
        isAdmin={isAdmin} 
      />
      <Box sx={{ height: (theme) => theme.spacing(8) }} />
      <Fab variant="extended" aria-label="Novo agendamento" onClick={handleAddAppointmentClick} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon sx={{ mr: 1 }} />
        Agendar
      </Fab>
    </div>
  );
}

export default AgendaPage;
