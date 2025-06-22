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

/**
 * Modal para finalizar um atendimento/agendamento.
 * Exibe os serviços concluídos com seus preços, o subtotal,
 * e permite selecionar a forma de pagamento antes da confirmação.
 * 
 * Props:
 * - open: controla a visibilidade do modal
 * - appointment: objeto do agendamento atual (pode ser null)
 * - onCancel: callback para cancelar/fechar o modal
 * - onConfirm: callback para confirmar finalização do atendimento
 * - onPaymentChange: callback para atualizar a forma de pagamento selecionada
 */
function FinalizeAppointmentModal({
  open,
  appointment,
  onCancel,
  onConfirm,
  onPaymentChange,
}) {
  // Se não houver agendamento, não renderiza o modal
  if (!appointment) return null;

  // Filtra apenas os serviços marcados como concluídos
  const doneServices = appointment.services.filter((service) => service.done);

  // Calcula subtotal somando o preço dos serviços concluídos
  const subtotal = doneServices.reduce((acc, s) => acc + s.price, 0);

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      {/* Título do modal */}
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Finalizar Atendimento
      </DialogTitle>

      {/* Conteúdo do modal exibindo serviços e subtotal */}
      <DialogContent sx={{ pt: 1, pb: 0 }}>
        {/* Lista dos serviços finalizados com nome e preço */}
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

        {/* Exibe o subtotal dos serviços com destaque */}
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

        {/* Dropdown para selecionar a forma de pagamento */}
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

      {/* Ações do modal: cancelar ou confirmar finalização */}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          pb: 2,
          pt: 1,
        }}
      >
        {/* Botão para cancelar e fechar o modal */}
        <Button
          onClick={onCancel}
          sx={{
            textTransform: 'none',
            color: 'var(--color-secondary)',
          }}
        >
          Cancelar
        </Button>

        {/* Botão para confirmar finalização, desabilitado se forma de pagamento não selecionada */}
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

export default FinalizeAppointmentModal;