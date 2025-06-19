import { useState } from 'react';
import { Typography } from '@mui/material';

import HorizontalDatePicker from '../components/HorizontalDatePicker.jsx';
import AppointmentCard from '../components/AppointmentCard.jsx';

function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      clientName: 'João Silva',
      time: '09:00',
      status: 'agendado',
      services: [
        { id: 1, name: 'Corte de cabelo', price: 30, done: false },
        { id: 2, name: 'Barba', price: 20, done: true },
      ],
    },
    {
      id: 2,
      clientName: 'Maria Oliveira',
      time: '10:30',
      status: 'em andamento',
      services: [
        { id: 1, name: 'Coloração', price: 120, done: true },
        { id: 2, name: 'Hidratação', price: 80, done: false },
      ],
    },
  ];

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom>Olá, usuário!</Typography>

      <Typography sx={{ mt: 4 }}>
        {selectedDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>

      <HorizontalDatePicker
        date={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
      />

      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}

    </div>
  );
}

export default AgendaPage;