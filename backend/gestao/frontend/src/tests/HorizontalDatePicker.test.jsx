import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HorizontalDatePicker from '../components/HorizontalDatePicker';
import '@testing-library/jest-dom';

describe('HorizontalDatePicker', () => {
  const sampleDate = new Date(2025, 5, 15); // Data simulada: 15 de Junho de 2025

  // Teste: Renderizar todos os dias do mês corretamente
  it('deve renderizar todos os dias do mês', () => {
    render(<HorizontalDatePicker date={sampleDate} onDateChange={() => {}} />);

    const daysInMonth = new Date(2025, 6, 0).getDate(); // Total de dias em Junho/2025

    for (let day = 1; day <= daysInMonth; day++) {
      expect(screen.getByText(day.toString())).toBeInTheDocument();
    }
  });

  // Teste: O dia selecionado deve estar com destaque (background color)
  it('deve destacar o dia selecionado', () => {
    render(<HorizontalDatePicker date={sampleDate} onDateChange={() => {}} />);

    const selectedDay = screen.getByText('15');
    expect(selectedDay.parentElement).toHaveStyle('background-color: var(--color-secondary)');
  });

  // Teste: Disparar o callback onDateChange ao clicar em outro dia
  it('deve chamar onDateChange ao clicar em outro dia', () => {
    const mockOnChange = vi.fn();
    render(<HorizontalDatePicker date={sampleDate} onDateChange={mockOnChange} />);

    const dayToClick = screen.getByText('10');
    fireEvent.click(dayToClick);

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0]).toBeInstanceOf(Date);
    expect(mockOnChange.mock.calls[0][0].getDate()).toBe(10);
  });

  // Teste: Renderizar nomes dos dias da semana (Exemplo: seg, ter, qua...)
  it('deve renderizar os nomes dos dias da semana (ex.: "seg", "ter")', () => {
    render(<HorizontalDatePicker date={sampleDate} onDateChange={() => {}} />);

    const diasDaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const weekDayLabels = screen.getAllByText((content) =>
      diasDaSemana.some((d) => content.toLowerCase().startsWith(d))
    );

    expect(weekDayLabels.length).toBeGreaterThan(0);
  });
});