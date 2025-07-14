import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';

import DropdownSelect from '../components/DropdownSelect.jsx';
import PrimaryActionButton from '../components/PrimaryActionButton.jsx';

/**
 * Componente AppointmentModal
 * 
 * Modal para criação de um novo agendamento.
 * Permite preencher nome do cliente, horário, barbeiro e selecionar serviços.
 * Calcula o tempo estimado e subtotal conforme os serviços selecionados.
 * 
 * Props:
 * - open (bool): controla a visibilidade do modal
 * - onClose (func): callback para fechar o modal
 * - onSave (func): callback para salvar o agendamento
 * - clientName (string): nome do cliente preenchido
 * - onClientNameChange (func): callback ao alterar o nome do cliente
 * - time (string): horário selecionado
 * - onTimeChange (func): callback ao alterar o horário
 * - barberId (number|string): id do barbeiro selecionado
 * - onBarberChange (func): callback ao alterar barbeiro
 * - barbers (array): lista de barbeiros disponíveis { id, name }
 * - services (array): lista de serviços disponíveis { id, name, price, duration }
 * - selectedServices (array): ids dos serviços selecionados
 * - onServicesChange (func): callback ao alterar seleção de serviços
 * - availableTimes (array): horários disponíveis para agendamento (strings)
 */
function AppointmentModal({
  open,
  onClose,
  onSave,
  clientName,
  onClientNameChange,
  time,
  onTimeChange,
  barberId,
  onBarberChange,
  barbers,
  services,
  selectedServices,
  onServicesChange,
  availableTimes,
}) {
  // Obtém objetos completos dos serviços selecionados para cálculos
  const selectedServiceObjects = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  // Soma total da duração dos serviços selecionados
  const totalDuration = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.duration || 0),
    0
  );

  // Soma total do preço dos serviços selecionados (subtotal)
  const subtotal = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.price || 0),
    0
  );

  // Funções internas para lidar com mudanças nos inputs, convertendo os valores quando necessário
  const handleBarberChange = (e) => onBarberChange(Number(e.target.value));
  const handleTimeChange = (e) => onTimeChange(e.target.value);
  const handleServicesChange = (e) => {
    // No select múltiplo, os valores vêm como array de strings, convertemos para números
    const values = Array.isArray(e.target.value)
      ? e.target.value.map(Number)
      : [];
    onServicesChange(values);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            position: 'fixed',
            margin: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100vw',
            maxWidth: '100vw',
            height: '70vh',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      {/* Botão para fechar o modal no canto superior direito */}
      <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label="Fechar modal"
          sx={{ color: 'var(--color-secondary)' }}
        >
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </Box>

      {/* Título do modal */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          pt: 4,
          pb: 3,
        }}
      >
        Novo Agendamento
      </DialogTitle>

      {/* Conteúdo do modal: inputs para dados do agendamento */}
      <DialogContent sx={{ pt: 1, pb: 0, flexGrow: 1, overflowY: 'auto' }}>
        {/* Input para nome do cliente */}
        <TextField
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          fullWidth
          size="medium"
          variant="outlined"
          slotProps={{ htmlInput: { maxLength: 20 } }}
          sx={{
            mb: 2,
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            borderRadius: 2,
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
          }}
        />

        {/* Dropdown para seleção do horário */}
        <DropdownSelect
          label="Horário"
          options={availableTimes.map((t) => ({ value: t, label: t }))}
          value={time}
          onChange={handleTimeChange}
          placeholder="Selecione o horário"
          size="medium"
          fullWidth
        />

        {/* Dropdown para seleção do barbeiro */}
        <Box mt={1}>
          <DropdownSelect
            label="Barbeiro"
            options={barbers.map((b) => ({ value: b.id, label: b.name }))}
            value={barberId}
            onChange={handleBarberChange}
            placeholder="Selecione o barbeiro"
            size="medium"
            fullWidth
          />
        </Box>

        {/* Select múltiplo para seleção dos serviços */}
        <Box sx={{ mb: 2, mt: 2 }}>
          <Select
            multiple
            value={selectedServices}
            onChange={handleServicesChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em style={{ color: '#9e9e9e' }}>Selecione os serviços</em>;
              }
              return services
                .filter((s) => selected.includes(s.id))
                .map((s) => s.name)
                .join(', ');
            }}
            fullWidth
            size="small"
            displayEmpty
            sx={{
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              borderRadius: 2,
              backgroundColor: 'white',
              px: 1,
              py: 0.5,
              border: 'none',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            }}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                <Checkbox checked={selectedServices.includes(service.id)} />
                <ListItemText primary={service.name} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Exibição do tempo estimado da soma dos serviços selecionados */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 5 }}>
          <Typography>Tempo estimado:</Typography>
          <Typography>{totalDuration} min</Typography>
        </Box>

        {/* Exibição do subtotal dos serviços selecionados */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>R$ {subtotal.toFixed(2)}</Typography>
        </Box>
      </DialogContent>

      {/* Ações do modal: Cancelar e Salvar */}
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: 'none', color: 'var(--color-secondary)' }}
        >
          Cancelar
        </Button>

        <PrimaryActionButton
          onClick={onSave}
          // Habilita botão Salvar apenas se todos os campos obrigatórios estiverem preenchidos
          disabled={!clientName || !time || !barberId || selectedServices.length === 0}
        >
          Salvar
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentModal;