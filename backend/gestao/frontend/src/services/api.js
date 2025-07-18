import axios from 'axios';

// A URL base da sua API. Ajuste se for diferente.
const BASE_URL = 'http://localhost:8080/api';

/**
 * Cria a configuração para as requisições, adicionando o token de autorização
 * se estiver disponível no localStorage.
 */
const createConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
};

// --- Funções da API ---

export const login = async (credentials) => {
  return axios.post(`${BASE_URL}/auth/login`, credentials);
};

export const registerUser = async (userData) => {
  return axios.post(`${BASE_URL}/usuarios`, userData, createConfig());
};

export const createAppointment = async (appointmentData) => {
  return axios.post(`${BASE_URL}/agendamentos`, appointmentData, createConfig());
};

export const confirmService = async (confirmationData) => {
  return axios.post(`${BASE_URL}/servicos-realizados/confirmar`, confirmationData, createConfig());
};

export const getAppointmentsByDate = async (date, barberId = null) => {
  const dateStr = date.toISOString().split('T')[0];
  let url = `${BASE_URL}/agendamentos?dia=${dateStr}`;
  if (barberId) url += `&barbeiroId=${barberId}`;
  return axios.get(url, createConfig());
};

export const getUsers = async () => {
  return axios.get(`${BASE_URL}/usuarios`, createConfig());
};

export const getServices = async () => {
  return axios.get(`${BASE_URL}/servicos`, createConfig());
};

export const deleteAppointment = async (appointmentId) => {
  return axios.delete(`${BASE_URL}/agendamentos/${appointmentId}`, createConfig());
};

// ==================================================================
// FUNÇÕES DE FECHAMENTO DE CAIXA (INCLUINDO A QUE FALTAVA)
// ==================================================================

export const recordBarberPayment = async (paymentData) => {
  return axios.post(`${BASE_URL}/fechamento-caixa/pagamentos`, paymentData, createConfig());
};

/**
 * CORREÇÃO: Função adicionada novamente para garantir que seja exportada.
 * Busca o relatório financeiro.
 * @param {string} tipo - O tipo de relatório a ser gerado.
 */
export const getFinancialReport = async (tipo) => {
  return axios.post(`${BASE_URL}/fechamentos-caixa/gerar-relatorio`, { tipo }, createConfig());
};
