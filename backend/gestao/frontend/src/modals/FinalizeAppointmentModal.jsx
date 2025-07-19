import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';

import { XMarkIcon } from '@heroicons/react/24/outline';
import DropdownSelect from '../components/DropdownSelect.jsx';
import PrimaryActionButton from '../components/PrimaryActionButton.jsx';

/**
 * Modal para finalizar um atendimento/agendamento.
 * * Este componente exibe uma lista dos serviços concluídos (done),
 * calcula e mostra o subtotal dos serviços,
 * permite que o usuário selecione a forma de pagamento,
 * e confirma a finalização do atendimento.
 * * Props:
 * - open (bool): controla a visibilidade do modal.
 * - appointment (object|null): objeto do agendamento atual, pode ser null.
 * - onCancel (func): callback para cancelar/fechar o modal.
 * - onConfirm (func): callback para confirmar a finalização do atendimento.
 * - onPaymentChange (func): callback para atualizar a forma de pagamento selecionada.
 */
function FinalizeAppointmentModal({
  open,
  appointment,
  onCancel,
  onConfirm,
  onPaymentChange,
}) {
  // Se não houver agendamento (null), não renderiza nada para evitar erros.
  if (!appointment) return null;

  // ==================================================================
  // CORREÇÃO PRINCIPAL
  // ==================================================================
  // 1. Garante que 'servicos' seja um array, mesmo que venha como undefined da prop.
  const servicos = Array.isArray(appointment.servicos) ? appointment.servicos : [];

  // 2. Filtra os serviços concluídos a partir da variável segura 'servicos'.
  const doneServices = servicos.filter((service) => service.done);
  
  // 3. Calcula o subtotal usando a propriedade correta 'preco' e garantindo que é um número.
  const subtotal = doneServices.reduce((acc, s) => acc + (s.preco || 0), 0);
  // ==================================================================


  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      {/* Botão para fechar modal no canto superior direito */}
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={onCancel}
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
        Finalizar Atendimento
      </DialogTitle>

      {/* Conteúdo principal do modal */}
      <DialogContent sx={{ pt: 1, pb: 0 }}>
        {/* Lista dos serviços concluídos com seus preços */}
        {doneServices.map((service) => (
          <Box
            key={service.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 0.75,
            }}
          >
            {/* CORREÇÃO: Usando a propriedade 'nome' */}
            <Typography>{service.nome}</Typography>
            {/* CORREÇÃO: Usando a propriedade 'preco' e garantindo que seja um número */}
            <Typography>R$ {Number(service.preco || 0).toFixed(2)}</Typography>
          </Box>
        ))}

        {/* Exibição do subtotal com estilo de separação */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            borderTop: '1px solid #e0e0e0',
            pt: 1,
            mt: 1,
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Subtotal:</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>R$ {subtotal.toFixed(2)}</Typography>
        </Box>

        {/* Dropdown para seleção da forma de pagamento */}
        <DropdownSelect
          label="Forma de Pagamento"
          options={[
            { value: 'Dinheiro', label: 'Dinheiro' },
            { value: 'DEBITO', label: 'Débito' },
            { value: 'CREDITO', label: 'Crédito' },
            { value: 'PIX', label: 'PIX' },
          ]}
          value={appointment.paymentMethod || ''}
          onChange={(e) => onPaymentChange(e.target.value)}
          placeholder="Forma de pagamento"
          size="medium"
          fullWidth
        />
      </DialogContent>

      {/* Botões de ação Cancelar e Confirmar */}
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

        <PrimaryActionButton
          onClick={onConfirm}
          // Botão confirm só habilitado se forma de pagamento estiver selecionada
          disabled={!appointment.paymentMethod}
        >
          Confirmar
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizeAppointmentModal;
