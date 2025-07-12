import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';

// Lista fixa dos funcionários esperados no sistema.
// OBS: Atualmente está hardcoded, mas será substituído por uma chamada GET ao backend no futuro.
const baseEmployees = [
  { id: 1, name: 'Lucas Silva' },
  { id: 2, name: 'Rafaela Souza' },
  { id: 3, name: 'Carlos Mendes' }, 
];

/**
 * Componente EmployeeSummarySection
 * 
 * Exibe um resumo financeiro por funcionário, mostrando:
 * - Total de serviços realizados
 * - Comissões recebidas
 * - Gastos/Despesas atribuídas
 * - Total líquido a pagar (serviços + comissões - despesas)
 * 
 * Recebe a prop `employees` com dados financeiros reais para mesclar com a lista base.
 * Se algum funcionário base não estiver na lista recebida, assume zeros nos valores.
 * 
 * Utiliza componentes do Material UI para layout e estilização visual.
 * 
 * @param {Array} employees - Lista de funcionários com dados financeiros (servicesTotal, commissions, expenses).
 */
function EmployeeSummarySection({ employees = [] }) {
  // Mescla os dados base com os valores reais fornecidos na prop
  const mergedEmployees = baseEmployees.map((base) => {
    const match = employees.find((e) => e.id === base.id);
    return {
      ...base,
      servicesTotal: match?.servicesTotal ?? 0,
      commissions: match?.commissions ?? 0,
      expenses: match?.expenses ?? 0,
    };
  });

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
        {mergedEmployees.map((employee) => {
          // Calcula total líquido a pagar para o funcionário
          const totalToPay =
            employee.servicesTotal + employee.commissions - employee.expenses;

          return (
            <Paper
              key={employee.id}
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
                  {employee.name}
                </Typography>

                <Row label="Serviços:" value={`R$ ${employee.servicesTotal.toFixed(2)}`} />
                <Row label="Comissão:" value={`R$ ${employee.commissions.toFixed(2)}`} />
                <Row label="Gastos:" value={`- R$ ${employee.expenses.toFixed(2)}`} />
                <Row
                  label="Total a pagar:"
                  value={`R$ ${totalToPay.toFixed(2)}`}
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
 * 
 * @param {string} label - Texto do lado esquerdo
 * @param {string} value - Texto do lado direito
 * @param {boolean} bold - Se o texto deve ser exibido em negrito (default: false)
 * @param {boolean} accent - Se o valor deve usar cor de destaque (default: false)
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