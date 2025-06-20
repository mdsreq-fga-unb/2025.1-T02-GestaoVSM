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

export default function AppointmentModal({
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

  const handleBarberChange = (e) => {
    onBarberChange(Number(e.target.value));
  };

  const handleTimeChange = (e) => {
    onTimeChange(e.target.value);
  };

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
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Novo Agendamento
      </DialogTitle>

      <DialogContent sx={{ pt: 1, pb: 0, flexGrow: 1, overflowY: 'auto' }}>
        {/* Nome do cliente */}
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

        {/* Horário */}
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

        {/* Barbeiro */}
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

        {/* Serviços (múltipla seleção) */}
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
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                <Checkbox checked={selectedServices.indexOf(service.id) > -1} />
                <ListItemText primary={service.name} />
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Tempo estimado e subtotal */}
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

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          pb: 2,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            color: 'var(--color-secondary)',
          }}
        >
          Cancelar
        </Button>

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
