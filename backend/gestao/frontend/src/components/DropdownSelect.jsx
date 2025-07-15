import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

/**
 * Componente DropdownSelect customizado usando Material UI.
 * Permite selecionar uma opção de uma lista com suporte a placeholder,
 * renderização customizada do valor selecionado, e configurações de tamanho e largura.
 *
 * Props:
 * - label: texto descritivo para acessibilidade (aria-label)
 * - options: array de opções no formato { value, label }
 * - value: valor atualmente selecionado
 * - onChange: função callback chamada ao mudar a seleção
 * - renderValue: função opcional para renderizar o valor selecionado personalizado
 * - placeholder: texto exibido quando nenhuma opção está selecionada (default: 'Selecione uma opção')
 * - size: tamanho do componente (default: 'small')
 * - fullWidth: se o componente deve ocupar 100% da largura disponível (default: true)
 */
function DropdownSelect({
  label,
  options,
  value = '',
  onChange,
  renderValue,
  placeholder = 'Selecione uma opção',
  size = 'small',
  fullWidth = true,
}) {
  const getLabelByValue = (val) => {
    const option = options.find((o) => o.value === val);
    return option ? option.label : val;
  };

  return (
    <FormControl fullWidth={fullWidth} size={size} variant="outlined" sx={{ mt: 2, mb: 2 }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) =>
          selected === '' ? (
            <em style={{ color: '#9e9e9e' }}>{placeholder}</em>
          ) : renderValue ? (
            renderValue(selected)
          ) : (
            getLabelByValue(selected)
          )
        }
        inputProps={{ 'aria-label': label, 'aria-placeholder': placeholder }}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 'none',
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: 1,
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--color-secondary)',
            borderWidth: 2,
          },
          cursor: 'pointer',
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropdownSelect;