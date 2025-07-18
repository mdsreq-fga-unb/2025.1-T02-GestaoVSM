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
  Button, // Importado
  Box,      // Importado
  Divider // Importado
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TrashIcon } from '@heroicons/react/24/outline'; // Ícone para o botão

/**
 * Props:
 * - appointment: objeto com dados do agendamento
 * - onToggleServiceDone: função para marcar/desmarcar serviço
 * - onCancelAppointment: nova função para cancelar o agendamento
 */
function AppointmentCard({ appointment, onToggleServiceDone, onCancelAppointment }) {
  const [expanded, setExpanded] = useState(false);

  if (!appointment) {
    return null;
  }

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
        role="button"
        tabIndex={0}
        className="pt-2 px-4 pb-1 cursor-pointer transition hover:bg-gray-50 focus:outline-none"
        sx={{ padding: 2, paddingBottom: 1 }}
      >
        <div className="flex justify-between items-start">
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

          {/* ATUALIZAÇÃO: Nome do barbeiro no meio */}
          <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
            {appointment.nomeBarbeiro}
          </Typography>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={appointment.status || 'Indefinido'}
              size="small"
              sx={{ height: '24px', fontSize: '0.75rem', ...statusColor }}
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
        <div className="p-4 pt-2 pb-1 bg-gray-50">
          {(appointment.servicos || []).map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-center mb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center">
                <Checkbox
                  checked={!!service.done}
                  onChange={() => onToggleServiceDone(appointment.id, service.id)}
                  slotProps={{
                    input: { 'aria-label': `Serviço ${service.nome}` },
                  }}
                />
                <Typography>{service.nome}</Typography>
              </div>

              <Stack spacing={0.15} sx={{ alignItems: 'flex-end' }}>
                <Typography variant="body2" color="text.secondary">
                  R$ {typeof service.preco === 'number' ? service.preco.toFixed(2) : '0.00'}
                </Typography>
              </Stack>
            </div>
          ))}

          {/* ATUALIZAÇÃO: Botão para cancelar agendamento */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Divider />
            <Button
              fullWidth
              variant="text"
              color="error"
              startIcon={<TrashIcon style={{width: '16px', height: '16px'}} />}
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique feche o card
                onCancelAppointment(appointment.id);
              }}
              sx={{
                textTransform: 'none',
                justifyContent: 'center',
                py: 1,
                color: '#d32f2f', // Cor vermelha para indicar perigo
              }}
            >
              Cancelar Agendamento
            </Button>
          </Box>
        </div>
      </Collapse>

      <div className="flex justify-center bg-gray-50 rounded-b-lg">
        <IconButton
          aria-label="expandir serviços"
          onClick={handleToggle}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            padding: 0,
            minWidth: 40,
            borderRadius: 2,
          }}
        >
          <ExpandMoreIcon sx={{ padding: '2px' }} />
        </IconButton>
      </div>
    </Card>
  );
}

export default AppointmentCard;
