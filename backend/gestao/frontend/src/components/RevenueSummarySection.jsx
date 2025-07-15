import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';

/**
 * Componente RevenueSummarySection
 * 
 * Exibe um resumo financeiro de faturamento baseado nos dados recebidos via prop `data`.
 * Mostra faturamento bruto, faturamento líquido e lucro líquido (já calculado pelo backend).
 * 
 * @param {object} data - Dados financeiros com os seguintes campos:
 *   - faturamentoTotalBruto: número (total bruto faturado)
 *   - faturamentoTotalLiquido: número (total líquido faturado)
 *   - lucroFinalBarbearia: número (lucro líquido calculado pelo backend)
 */
function RevenueSummarySection({ data }) {
  const {
    faturamentoTotalBruto = 0,
    faturamentoTotalLiquido = 0,
    lucroFinalBarbearia = 0,
  } = data || {};

  return (
    <Box mt={4}>
      <Typography
        sx={{
          mt: 4,
          fontSize: '1rem',
          fontWeight: 'bold',
          color: 'var(--color-secondary)',
          textAlign: 'left',
        }}
        gutterBottom
      >
        Resumo de faturamento
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Stack spacing={0.5}>
          <Row label="Faturamento bruto:" value={`R$ ${Number(faturamentoTotalBruto).toFixed(2)}`} />
          <Row label="Faturamento líquido:" value={`R$ ${Number(faturamentoTotalLiquido).toFixed(2)}`} />
          <Row label="Lucro líquido:" value={`R$ ${Number(lucroFinalBarbearia).toFixed(2)}`} bold accent />
        </Stack>
      </Paper>
    </Box>
  );
}

/**
 * Componente Row
 * 
 * Linha genérica para exibir um label à esquerda e um valor à direita,
 * com opções de texto em negrito e cor de destaque.
 * 
 * @param {string} label - Texto descritivo à esquerda
 * @param {string} value - Valor exibido à direita
 * @param {boolean} [bold=false] - Indica se o texto deve ser negrito
 * @param {boolean} [accent=false] - Indica se o valor deve ter cor de destaque
 */
function Row({ label, value, bold = false, accent = false }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography
        variant="body2"
        fontWeight={bold ? 'bold' : 'normal'}
        color="text.secondary"
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={bold ? 'bold' : 'normal'}
        sx={{ color: accent ? 'var(--color-secondary)' : 'inherit' }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default RevenueSummarySection;
