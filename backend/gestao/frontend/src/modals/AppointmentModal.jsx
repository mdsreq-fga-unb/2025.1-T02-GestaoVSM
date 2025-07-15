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
  const selectedServiceObjects = services.filter((s) =>
    selectedServices.includes(s.id)
  );

  const totalDuration = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.duration || 0),
    0
  );

  const subtotal = selectedServiceObjects.reduce(
    (acc, s) => acc + (s.price || 0),
    0
  );

  const handleBarberChange = (e) => onBarberChange(Number(e.target.value));
  const handleTimeChange = (e) => onTimeChange(e.target.value);
  const handleServicesChange = (e) => {
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
      {/* Ícone X */}
      <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label="Fechar modal"
          sx={{ color: 'var(--color-secondary)' }}
        >
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </Box>

      {/* Título */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          pt: 3,
          pb: 2,
        }}
      >
        Novo Agendamento
      </DialogTitle>

      {/* Conteúdo */}
      <DialogContent sx={{ pt: 0.5, pb: 0, flexGrow: 1, overflowY: 'auto' }}>
        <TextField
          placeholder="Nome do cliente"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          fullWidth
          size="medium"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        />

        <DropdownSelect
          label="Horário"
          options={availableTimes.map((t) => ({ value: t, label: t }))}
          value={time}
          onChange={handleTimeChange}
          placeholder="Selecione o horário"
          size="medium"
          fullWidth
        />

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

        <Box sx={{ mt: 1.5, mb: 1.5 }}>
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
              backgroundColor: 'white',
              borderRadius: 2,
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Tempo estimado:</Typography>
          <Typography>{totalDuration} min</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>R$ {subtotal.toFixed(2)}</Typography>
        </Box>
      </DialogContent>

      {/* Ações */}
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: 'none', color: 'var(--color-secondary)' }}
        >
          Cancelar
        </Button>

        <PrimaryActionButton
          onClick={onSave}
          disabled={!clientName || !time || !barberId || selectedServices.length === 0}
        >
          Salvar
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
}

export default AppointmentModal;