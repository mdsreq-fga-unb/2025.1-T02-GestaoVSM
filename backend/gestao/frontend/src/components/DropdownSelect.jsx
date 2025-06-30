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
  value,
  onChange,
  renderValue,
  placeholder = 'Selecione uma opção',
  size = 'small',
  fullWidth = true,
}) {
  /**
   * Retorna o label da opção baseado no valor selecionado.
   * Caso não encontre a opção correspondente, retorna o próprio valor.
   */
  const getLabelByValue = (val) => {
    const option = options.find((o) => o.value === val);
    return option ? option.label : val;
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      sx={{
        mt: 2,
        mb: 2,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        borderRadius: 2,
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'transparent' },
          '&:hover fieldset': { borderColor: 'transparent' },
          '&.Mui-focused fieldset': { borderColor: 'transparent' },
          backgroundColor: 'white',
        },
      }}
    >
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) => {
          // Exibe o placeholder estilizado quando nada está selecionado
          if (!selected) {
            return <em style={{ color: '#9e9e9e' }}>{placeholder}</em>;
          }
          // Se a função renderValue foi passada, usa ela para renderizar
          // Senão, usa o label da opção pelo valor selecionado
          return renderValue ? renderValue(selected) : getLabelByValue(selected);
        }}
        inputProps={{ 'aria-label': label }}
        sx={{
          backgroundColor: 'white',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        {/* Item padrão que representa a ausência de seleção */}
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>

        {/* Lista de opções mapeadas para MenuItems */}
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