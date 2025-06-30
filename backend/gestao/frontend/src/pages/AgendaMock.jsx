import React from 'react';
import AgendaPage from '../pages/AgendaPage';

const mockAppointments = [
    {
        id: 1,
        clientName: 'João Silva',
        time: '09:30 - 10:00',
        barberId: 1,
        services: [
            { id: 1, name: 'Cabelo', price: 40, done: false },
            { id: 2, name: 'Barba', price: 35, done: false },
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
            { id: 3, name: 'Selagem', price: 70, done: true },
            { id: 4, name: 'Sobrancelha (pinça)', price: 20, done: false },
        ],
        finalized: false,
        paymentMethod: '',
    },
];

const mockBarbers = [
    { id: 1, name: 'Valder Melo' },
    { id: 2, name: 'Eliene dos Santos' },
    { id: 3, name: 'Marcos Henrique' },
    { id: 4, name: 'Moisés Lima' },
    { id: 5, name: 'Ian Moreno' },

];

const mockServices = [
    { id: 1, name: 'Sobrancelha (navalha)', price: 15, duration: 60 },
    { id: 2, name: 'Sobrancelha (pinça)', price: 20, duration: 30 },
    { id: 3, name: 'Barba', price: 35, duration: 20 },
    { id: 4, name: 'Cabelo', price: 40, duration: 30 },
    { id: 5, name: 'Selagem', price: 70, duration: 90 },
    { id: 6, name: 'Platinado', price: 150, duration: 45 },
];

const mockTimes = [
    '09:00 - 09:30',
    '09:30 - 10:00',
    '10:00 - 10:30',
    '10:30 - 11:00',
    '11:00 - 11:30',
    '11:30 - 12:00',
];

export default function AgendaMock() {
    return (
        <AgendaPage
            initialAppointments={mockAppointments}
            barbers={mockBarbers}
            availableServices={mockServices}
            availableTimes={mockTimes}
            isAdmin={true}
        />
    );
}
