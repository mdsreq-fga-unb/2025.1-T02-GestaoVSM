import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';

/**
 * Componente de seletor de datas horizontal.
 * Exibe todos os dias do mês da data selecionada em uma barra horizontal
 * com rolagem automática para o dia selecionado centralizado.
 * 
 * Props:
 * - date: objeto Date com a data inicial selecionada
 * - onDateChange: função callback chamada quando a data selecionada muda
 */
function HorizontalDatePicker({ date, onDateChange }) {
  // Estado com a lista de dias do mês da data selecionada
  const [days, setDays] = useState([]);

  // Estado da data atualmente selecionada (controlado internamente)
  const [selectedDate, setSelectedDate] = useState(date);

  // Ref para o container que possui a lista horizontal de dias, para controlar scroll
  const containerRef = useRef(null);

  // Gera a lista de dias do mês toda vez que selectedDate muda
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    // Calcula número total de dias do mês
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      daysArr.push({
        date: dayDate,
        // Nome do dia da semana abreviado, ex: 'seg', 'ter'
        dayName: dayDate.toLocaleDateString('pt-BR', { weekday: 'short' }),
        // Data completa em formato local (dd/mm/aaaa)
        fullDate: dayDate.toLocaleDateString('pt-BR'),
      });
    }
    setDays(daysArr);
  }, [selectedDate]);

  /**
   * Função que centraliza a rolagem no elemento que corresponde
   * a uma condição dada por matchFn, usada para posicionar a data selecionada.
   */
  const handleScroll = useCallback((matchFn) => {
    if (!containerRef.current) return;

    // Encontra índice do dia que satisfaz a condição
    const index = days.findIndex(matchFn);
    if (index >= 0) {
      const container = containerRef.current;
      const child = container.children[index];

      if (child) {
        // Calcula posição para centralizar o item na viewport do container
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = childLeft - (containerWidth / 2) + (childWidth / 2);

        // Faz scroll suave para a posição calculada
        if (container.scrollTo) {
          container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        } else {
          container.scrollLeft = scrollPosition;
        }
      }
    }
  }, [days]);

  // Quando a lista de dias muda ou a data selecionada muda,
  // chama handleScroll para centralizar a data selecionada
  useEffect(() => {
    if (days.length > 0) {
      handleScroll(day => day.date.toDateString() === selectedDate.toDateString());
    }
  }, [days, selectedDate, handleScroll]);

  // Atualiza o estado selectedDate se a prop date mudar (sincroniza estado interno)
  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  // Handler chamado ao clicar em uma data da lista
  // Atualiza estado interno e chama callback externo onDateChange
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    if (onDateChange) onDateChange(clickedDate);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 1,
        padding: 1,
        // Esconde barras de scroll para uma aparência limpa
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {days.map((day, index) => {
        // Verifica se o dia é o selecionado para aplicar estilos
        const isSelected = day.date.toDateString() === selectedDate.toDateString();
        return (
          <Paper
            key={index}
            elevation={0}
            onClick={() => handleDateClick(day.date)}
            sx={{
              minWidth: 60,
              minHeight: 80,
              padding: 1,
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              bgcolor: isSelected ? 'var(--color-secondary)' : 'transparent',
              color: isSelected ? 'var(--color-primary)' : 'var(--color-secondary)',
              position: 'relative',
              transition: 'color 0.3s',
              '&:hover': {
                bgcolor: isSelected ? 'var(--color-secondary)' : 'var(--color-accent-hover)',
              },
            }}
          >
            {/* Nome do dia da semana abreviado (ex: seg, ter) */}
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {day.dayName}
            </Typography>

            {/* Número do dia no mês */}
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
              {day.date.getDate()}
            </Typography>

            {/* Indicador visual (bolinha) para o dia selecionado */}
            {isSelected && (
              <Box
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  bgcolor: 'var(--color-accent)',
                  borderRadius: '50%',
                }}
              />
            )}
          </Paper>
        );
      })}
    </Box>
  );
}

export default HorizontalDatePicker;