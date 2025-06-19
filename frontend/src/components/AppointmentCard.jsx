import { useState } from 'react';
import { Card, CardContent, Typography, Chip, Checkbox, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AppointmentCard({ appointment }) {
  const [expanded, setExpanded] = useState(false);

  const totalPrice = appointment.services.reduce((sum, service) => sum + service.price, 0);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const statusColor = {
    agendado: 'bg-yellow-200 text-yellow-800',
    'em andamento': 'bg-blue-200 text-blue-800',
    finalizado: 'bg-green-200 text-green-800',
  }[appointment.status] || 'bg-gray-200 text-gray-800';

  return (
    <Card className="mb-4 shadow-md">
      <CardContent className="flex justify-between items-center">
        <div>
          <Typography variant="subtitle1" fontWeight="bold">{appointment.clientName}</Typography>
          <Typography variant="body2" color="text.secondary">{appointment.time}</Typography>
        </div>

        <Chip
          label={appointment.status}
          className={`${statusColor} ml-2`}
          size="small"
        />

        <div className="ml-auto text-right">
          <Typography variant="body2" fontWeight="bold">R$ {totalPrice.toFixed(2)}</Typography>
          <IconButton onClick={handleToggle} size="small">
            <ExpandMoreIcon className={`${expanded ? 'rotate-180' : ''} transition-transform duration-300`} />
          </IconButton>
        </div>
      </CardContent>

      <Collapse in={expanded}>
        <div className="p-4 border-t">
          {appointment.services.map((service) => (
            <div key={service.id} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Checkbox checked={service.done} />
                <Typography>{service.name}</Typography>
              </div>
              <Typography>R$ {service.price.toFixed(2)}</Typography>
            </div>
          ))}
        </div>
      </Collapse>
    </Card>
  );
}

export default AppointmentCard;