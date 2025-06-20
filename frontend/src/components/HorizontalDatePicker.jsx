import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function HorizontalDatePicker({ date, onDateChange }) {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const containerRef = useRef(null);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArr = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      daysArr.push({
        date: dayDate,
        dayName: dayDate.toLocaleDateString('pt-BR', { weekday: 'short' }),
        fullDate: dayDate.toLocaleDateString('pt-BR'),
      });
    }
    setDays(daysArr);
  }, [selectedDate]);

  const handleScroll = useCallback((matchFn) => {
    if (!containerRef.current) return;
    const index = days.findIndex(matchFn);
    if (index >= 0) {
      const container = containerRef.current;
      const child = container.children[index];
      if (child) {
        const childLeft = child.offsetLeft;
        const childWidth = child.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = childLeft - (containerWidth / 2) + (childWidth / 2);
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }, [days]);

  useEffect(() => {
    if (days.length > 0) {
      handleScroll(day => day.date.toDateString() === selectedDate.toDateString());
    }
  }, [days, selectedDate, handleScroll]);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

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
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {days.map((day, index) => {
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
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {day.dayName}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.5 }}>
              {day.date.getDate()}
            </Typography>

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
