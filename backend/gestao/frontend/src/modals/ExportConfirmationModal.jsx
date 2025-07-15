import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import PrimaryActionButton from '../components/PrimaryActionButton.jsx';

/**
 * Componente ExportConfirmationModal
 * 
 * Modal para confirmação da exportação do extrato financeiro.
 * Exibe o período selecionado para exportação e informa que o arquivo será gerado em PDF.
 * 
 * Props:
 * - open (bool): controla a visibilidade do modal
 * - onClose (func): callback para fechar o modal
 * - onConfirm (func): callback acionado ao confirmar a exportação
 * - selectedPeriod (string): texto representando o período selecionado para exportação
 */
function ExportConfirmationModal({ open, onClose, onConfirm, selectedPeriod = '' }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {/* Botão para fechar o modal no canto superior direito */}
      <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}>
        <IconButton
          aria-label="Fechar"
          onClick={onClose}
          sx={{ color: 'var(--color-secondary)' }}
        >
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </Box>

      {/* Conteúdo central do modal */}
      <DialogContent sx={{ textAlign: 'center', px: 2, pt: 4, pb: 2 }}>
        {/* Texto informativo sobre a exportação */}
        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.3 }}>
          Você está prestes a exportar o <br /> extrato financeiro para o seguinte período:
        </Typography>

        {/* Exibição do período selecionado com ícone de calendário */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ mb: 1 }}
        >
          <CalendarIcon className="h-4 w-4" />
          <Typography variant="subtitle1">
            {selectedPeriod}
          </Typography>
        </Stack>

        {/* Informação adicional sobre o formato e download do arquivo */}
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.3, fontSize: '0.8rem', mt: 2 }}>
          O arquivo será gerado em formato PDF<br /> e baixado automaticamente.
        </Typography>
      </DialogContent>

      {/* Botão de ação para confirmar a exportação */}
      <DialogActions sx={{ px: 3, pb: 2, pt: 0, justifyContent: 'center' }}>
        <PrimaryActionButton onClick={onConfirm}>
          Confirmar exportação
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
}

export default ExportConfirmationModal;