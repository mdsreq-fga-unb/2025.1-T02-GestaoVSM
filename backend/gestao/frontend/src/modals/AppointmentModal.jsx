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
} from '@mui/material';

import DropdownSelect from '../components/DropdownSelect.jsx';

/**
 * Modal para criação ou edição de um agendamento.
 * Exibe campos para nome do cliente, horário, barbeiro e serviços selecionados.
 * Calcula duração total e subtotal dos serviços escolhidos.
 * 
 * Props:
 * - open: controla visibilidade do modal
 * - onClose: callback para fechar o modal
 * - onSave: callback para salvar o agendamento
 * - clientName: nome do cliente
 * - onClientNameChange: callback para atualizar nome do cliente
 * - time: horário selecionado
 * - onTimeChange: callback para atualizar horário
 * - barberId: id do barbeiro selecionado
 * - onBarberChange: callback para atualizar barbeiro
 * - barbers: lista de barbeiros disponíveis [{id, name}]
 * - services: lista de serviços disponíveis [{id, name, duration, price}]
 * - selectedServices: array de ids dos serviços selecionados
 * - onServicesChange: callback para atualizar serviços selecionados
 * - availableTimes: lista de horários disponíveis (strings)
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
  // Filtra objetos dos serviços selecionados para cálculo de duração e subtotal
  const selectedServiceObjects = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  // Soma da duração total dos serviços selecionados (minutos)
  const totalDuration = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.duration || 0),
    0
  );

  // Soma do preço total dos serviços selecionados
  const subtotal = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.price || 0),
    0
  );

  // Manipulador de mudança do barbeiro (converte valor para número)
  const handleBarberChange = (e) => {
    onBarberChange(Number(e.target.value));
  };

  // Manipulador de mudança do horário
  const handleTimeChange = (e) => {
    onTimeChange(e.target.value);
  };

  // Manipulador de mudança dos serviços selecionados,
  // converte valores para números e chama callback
  const handleServicesChange = (e) => {
    const values = Array.isArray(e.target.value)
      ? e.target.value.map((v) => Number(v))
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
      {/* Título do modal */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Novo Agendamento
      </DialogTitle>

      {/* Conteúdo do modal com campos de entrada */}
      <DialogContent sx={{ pt: 1, pb: 0, flexGrow: 1, overflowY: 'auto' }}>
        {/* Campo para nome do cliente */}
        <TextField
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          fullWidth
          size="medium"
          variant="outlined"
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
        <Box>
          <DropdownSelect
            label="Horário"
            options={availableTimes.map((t) => ({ value: t, label: t }))}
            value={time}
            onChange={handleTimeChange}
            placeholder="Selecione o horário"
            size="medium"
            fullWidth
          />
        </Box>

        {/* Dropdown para seleção do barbeiro */}
        <Box>
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
              cursor: 'pointer',
              border: 'none',
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
          >
            {/* Lista de serviços com checkbox para múltipla seleção */}
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                <Checkbox checked={selectedServices.indexOf(service.id) > -1} />
                <ListItemText primary={service.name} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Exibe tempo total estimado dos serviços */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
            mt: 5,
          }}
        >
          <Typography>Tempo estimado:</Typography>
          <Typography>{totalDuration} min</Typography>
        </Box>

        {/* Exibe subtotal dos serviços selecionados */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>R$ {subtotal.toFixed(2)}</Typography>
        </Box>
      </DialogContent>

      {/* Ações do modal: cancelar e salvar */}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          pb: 2,
          pt: 1,
        }}
      >
        {/* Botão cancelar */}
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: 'var(--color-secondary)',
          }}
        >
          Cancelar
        </Button>

        {/* Botão salvar, desabilitado se campos obrigatórios estiverem vazios */}
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            bgcolor: 'var(--color-secondary)',
            color: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            px: 4,
            '&:hover': {
              bgcolor: 'var(--color-primary)',
              color: 'var(--color-secondary)',
            },
          }}
          disabled={!clientName || !time || !barberId || selectedServices.length === 0}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentModal;