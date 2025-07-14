import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';

/**
 * Componente RevenueSummarySection
 * 
 * Exibe um resumo financeiro de faturamento baseado nos dados recebidos via prop `data`.
 * Mostra totais de serviços, produtos, comissões, faturamento total e lucro líquido.
 * 
 * @param {object} data - Dados financeiros com os seguintes campos:
 *   - servicesTotal: número (total faturado em serviços)
 *   - productsTotal: número (total faturado em produtos)
 *   - commissionsTotal: número (total pago em comissões)
 */
function RevenueSummarySection({ data }) {
  const {
    servicesTotal = 0,
    productsTotal = 0,
    commissionsTotal = 0,
  } = data || {};

  // Calcula faturamento bruto (serviços + produtos)
  const revenue = servicesTotal + productsTotal;
  // Calcula lucro líquido (faturamento - comissões)
  const netProfit = revenue - commissionsTotal;

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
          <Row label="Total em serviços:" value={`R$ ${servicesTotal.toFixed(2)}`} />
          <Row label="Total em produtos:" value={`R$ ${productsTotal.toFixed(2)}`} />
          <Row label="Total em comissões:" value={`- R$ ${commissionsTotal.toFixed(2)}`} />
          <Row label="Faturamento total:" value={`R$ ${revenue.toFixed(2)}`} bold />
          <Row label="Lucro líquido:" value={`R$ ${netProfit.toFixed(2)}`} bold accent />
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