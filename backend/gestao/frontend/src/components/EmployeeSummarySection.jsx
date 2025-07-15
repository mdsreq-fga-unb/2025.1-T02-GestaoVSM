import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';

/**
 * Componente EmployeeSummarySection
 * 
 * Exibe um resumo financeiro por funcionário, mostrando:
 * - Total de serviços realizados (bruto)
 * - Comissões recebidas (produtos)
 * - Gastos/Despesas atribuídas
 * - Total líquido a pagar (calculado no backend)
 * 
 * Recebe a prop `employees` com dados financeiros reais da API.
 * 
 * @param {Array} employees - Lista de funcionários com dados financeiros
 */
function EmployeeSummarySection({ employees = [] }) {

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
        Resumo por funcionário
      </Typography>

      <Stack spacing={2}>
        {employees.length === 0 && (
          <Typography
            sx={{ color: 'var(--color-secondary)', textAlign: 'center', mt: 2 }}
          >
            Nenhum dado disponível.
          </Typography>
        )}

        {employees.map((employee) => {
          return (
            <Paper
              key={employee.funcionarioId}
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'var(--color-primary)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            >
              <Stack spacing={0.5}>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                  {employee.funcionarioNome}
                </Typography>

                <Row
                  label="Serviços:"
                  value={`R$ ${Number(employee.totalBrutoServicos ?? 0).toFixed(2)}`}
                />
                <Row
                  label="Comissão:"
                  value={`R$ ${Number(employee.totalComissoesProdutos ?? 0).toFixed(2)}`}
                />
                {/* 
                <Row
                  label="Gastos:"
                  value={`- R$ ${Number(employee.totalGastos ?? 0).toFixed(2)}`}
                />
                 */}
                <Row
                  label="Total a pagar:"
                  value={`R$ ${Number(employee.totalAReceber ?? 0).toFixed(2)}`}
                  bold
                  accent
                />
              </Stack>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
}

/**
 * Componente Row
 * 
 * Linha simples com label à esquerda e valor à direita,
 * suporta variações visuais para negrito e destaque (accent).
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

export default EmployeeSummarySection;