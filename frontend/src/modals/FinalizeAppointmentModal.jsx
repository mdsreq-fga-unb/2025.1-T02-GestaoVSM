import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import DropdownSelect from '../components/DropdownSelect.jsx';

export default function FinalizeAppointmentModal({
  open,
  appointment,
  onCancel,
  onConfirm,
  onPaymentChange,
}) {
  if (!appointment) return null;

  const doneServices = appointment.services.filter((service) => service.done);
  const subtotal = doneServices.reduce((acc, s) => acc + s.price, 0);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Finalizar Atendimento
      </DialogTitle>

      <DialogContent sx={{ pt: 1, pb: 0 }}>
        {/* Serviços Concluídos */}
        {doneServices.map((service) => (
          <div
            key={service.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <Typography>{service.name}</Typography>
            <Typography>R$ {service.price.toFixed(2)}</Typography>
          </div>
        ))}

        {/* Subtotal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            borderTop: '1px solid #e0e0e0',
            paddingTop: 8,
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>R$ {subtotal.toFixed(2)}</Typography>
        </div>

        {/* Forma de Pagamento */}
        <DropdownSelect
          label="Forma de Pagamento"
          options={[
            { value: 'Dinheiro', label: 'Dinheiro' },
            { value: 'Débito', label: 'Débito' },
            { value: 'Crédito', label: 'Crédito' },
            { value: 'PIX', label: 'PIX' },
          ]}
          value={appointment.paymentMethod || ''}
          onChange={(e) => onPaymentChange(e.target.value)}
          placeholder="Forma de pagamento"
          size="medium"
          fullWidth
        />
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
          onClick={onCancel}
          sx={{
            textTransform: 'none',
            color: 'var(--color-secondary)',
          }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={!appointment.paymentMethod}
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
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}