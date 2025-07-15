import axios from 'axios';

const BASE_URL = 'https://two025-1-t02-gestaovsm.onrender.com/api';

const createConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
};


export const login = async (credentials) => {
  return axios.post(`${BASE_URL}/auth/login`, credentials);
};

export const registerUser = async (userData) => {
  return axios.post(`${BASE_URL}/usuarios`, userData);
};

export const createAppointment = async (appointmentData) => {
  return axios.post(`${BASE_URL}/agendamentos`, appointmentData, createConfig());
};

export const confirmService = async (serviceId) => {
  return axios.post(`${BASE_URL}/servicos-realizados/confirmar`, { serviceId }, createConfig());
};

export const recordBarberPayment = async (paymentData) => {
  return axios.post(`${BASE_URL}/fechamento-caixa/pagamentos`, paymentData, createConfig());
};

export const getFinancialReport = async (tipo) => {
  return axios.post(`${BASE_URL}/fechamentos-caixa/gerar-relatorio`, { tipo }, createConfig());
};

export const getAppointmentsByDate = async (date, barberId = null) => {
  const dateStr = date.toISOString().slice(0, 19);
  let url = `${BASE_URL}/agendamentos?dia=${dateStr}`;
  if (barberId) url += `&barbeiroId=${barberId}`;

  return axios.get(url, createConfig());
};
