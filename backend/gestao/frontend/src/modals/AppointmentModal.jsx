import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
  FormHelperText,
} from '@mui/material';

/**
 * Modal para criar um novo agendamento.
 * 
 * Props:
 * - open: boolean para mostrar/ocultar o modal
 * - onClose: função para fechar o modal
 * - onSave: função para salvar o agendamento (botão "Salvar")
 * - clientName: nome do cliente (controlled)
 * - onClientNameChange: callback para alterar o nome do cliente
 * - time: horário selecionado (controlled)
 * - onTimeChange: callback para alterar o horário
 * - barberId: id do barbeiro selecionado (controlled)
 * - onBarberChange: callback para alterar o barbeiro
 * - barbers: lista de barbeiros [{id, name}]
 * - services: lista de serviços [{id, name, price}]
 * - selectedServices: lista de ids de serviços selecionados
 * - onServicesChange: callback para alterar os serviços selecionados
 * - availableTimes: lista de horários disponíveis para seleção
 * - isAdmin: boolean para controlar se é admin (exibe dropdown barbeiro)
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
  isAdmin = true,
}) {
  // Normalize para string (evita warnings do MUI)
  const normalizedBarberId = barberId ?? '';
  const normalizedTime = time ?? '';

  const canSave =
    clientName.trim() !== '' &&
    normalizedTime !== '' &&
    (isAdmin ? normalizedBarberId !== '' : true) &&
    selectedServices.length > 0;

  const handleServicesChange = (event) => {
    const {
      target: { value },
    } = event;
    onServicesChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Novo Agendamento</DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Nome do Cliente"
            value={clientName}
            onChange={(e) => onClientNameChange(e.target.value)}
            autoFocus
            required
            fullWidth
            inputProps={{ 'aria-label': 'Nome do Cliente' }}
          />

          <FormControl fullWidth required>
            <InputLabel id="time-select-label">Horário</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              name="time"
              value={normalizedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              label="Horário"
              inputProps={{ 'aria-label': 'Horário do agendamento' }}
            >
              {availableTimes.length > 0 ? (
                availableTimes.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum horário disponível</MenuItem>
              )}
            </Select>
          </FormControl>

          {isAdmin && (
            <FormControl fullWidth required>
              <InputLabel id="barber-select-label">Barbeiro</InputLabel>
              <Select
                labelId="barber-select-label"
                id="barber-select"
                name="barber"
                value={normalizedBarberId}
                onChange={(e) => onBarberChange(e.target.value)}
                label="Barbeiro"
                inputProps={{ 'aria-label': 'Selecionar barbeiro' }}
              >
                {barbers.map((barber) => (
                  <MenuItem key={barber.id} value={barber.id}>
                    {barber.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth required error={selectedServices.length === 0}>
            <InputLabel id="services-select-label">Serviços</InputLabel>
            <Select
              labelId="services-select-label"
              id="services-select"
              multiple
              value={selectedServices}
              onChange={handleServicesChange}
              input={<OutlinedInput label="Serviços" />}
              renderValue={(selected) =>
                services
                  .filter((s) => selected.includes(s.id))
                  .map((s) => s.name)
                  .join(', ')
              }
              inputProps={{ 'aria-label': 'Selecionar serviços' }}
              aria-describedby={selectedServices.length === 0 ? 'services-helper-text' : undefined}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  <Checkbox checked={selectedServices.includes(service.id)} />
                  <ListItemText primary={`${service.name} (R$ ${service.price.toFixed(2)})`} />
                </MenuItem>
              ))}
            </Select>
            {selectedServices.length === 0 && (
              <FormHelperText id="services-helper-text">Selecione ao menos um serviço.</FormHelperText>
            )}
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} aria-label="Cancelar agendamento">
          Cancelar
        </Button>
        <Button
          onClick={onSave}
          disabled={!canSave}
          variant="contained"
          aria-label="Salvar agendamento"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentModal;