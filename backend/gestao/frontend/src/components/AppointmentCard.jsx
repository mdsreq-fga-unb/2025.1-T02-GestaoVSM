import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Checkbox,
  Collapse,
  Stack,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Componente que exibe um card com informações de um agendamento (appointment),
 * incluindo horário, nome do cliente, status, método de pagamento (se finalizado)
 * e lista de serviços com checkbox para marcar como concluídos.
 *
 * Props:
 * - appointment: objeto com dados do agendamento
 * - onToggleServiceDone: função chamada ao marcar/desmarcar serviço como feito
 */
function AppointmentCard({ appointment, onToggleServiceDone }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const statusColor = {
    agendado: { backgroundColor: '#FEF3C7', color: '#92400E' },
    'em andamento': { backgroundColor: '#DBEAFE', color: '#1E40AF' },
    finalizado: { backgroundColor: '#D1FAE5', color: '#065F46' },
  }[appointment.status] || { backgroundColor: '#E5E7EB', color: '#374151' };

  return (
    <Card
      className="mb-4 shadow-md"
      sx={{ borderRadius: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}
    >
      <CardContent
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle();
        }}
        role="button"
        tabIndex={0}
        className="pt-2 px-4 pb-1 cursor-pointer transition hover:bg-accent-hover focus:outline-none"
        sx={{ padding: 2, paddingBottom: 1 }}
      >
        <div className="flex justify-between items-center">
          <Stack spacing={0.25}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.2 }}>
              {appointment.dataAgendamento
                ? new Date(appointment.dataAgendamento).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Sem horário'}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              {appointment.nomeCliente}
            </Typography>
          </Stack>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={appointment.status}
              aria-label={`status-agendamento-${appointment.id}`}
              size="small"
              sx={{
                height: '24px',
                fontSize: '0.75rem',
                ...statusColor,
              }}
            />
            {appointment.status === 'finalizado' && appointment.paymentMethod && (
              <Chip
                label={appointment.paymentMethod}
                variant="outlined"
                size="small"
                sx={{
                  fontWeight: 'medium',
                  fontSize: '0.65rem',
                  height: 20,
                  padding: '0 6px',
                  borderColor: '#808080',
                  color: '#686868',
                }}
              />
            )}
          </Stack>
        </div>
      </CardContent>

      <Collapse in={expanded} unmountOnExit>
        <div className="p-4 pb-1 bg-accent-hover">
          {(appointment.services || []).map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={service.done}
                onChange={() => onToggleServiceDone(appointment.id, service.id)}
                slotProps={{
                  input: {
                    'aria-label': `Serviço ${service.nome} do cliente ${appointment.nomeCliente}`,
                  },
                }}
              />

              <Stack spacing={0.15} sx={{ ml: 1, alignItems: 'flex-end' }}>
                <Typography>{service.nome}</Typography>
                <Typography variant="body2" color="text.secondary">
                  R$ {service.preco.toFixed(2)}
                </Typography>
              </Stack>
            </div>
          ))}
        </div>
      </Collapse>

      <div className="flex justify-center">
        <IconButton
          aria-label="expandir serviços"
          data-testid="appointment-toggle-button"
          onClick={handleToggle}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            padding: 0,
            minWidth: 40,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
            },
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <ExpandMoreIcon sx={{ padding: '2px' }} />
        </IconButton>
      </div>
    </Card>
  );
}

export default AppointmentCard;