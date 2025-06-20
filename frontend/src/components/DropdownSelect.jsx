import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

export default function DropdownSelect({
  label,
  options,
  value,
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
          if (!selected) {
            return <em style={{ color: '#9e9e9e' }}>{placeholder}</em>;
          }
          return renderValue ? renderValue(selected) : getLabelByValue(selected);
        }}
        inputProps={{ 'aria-label': label }}
        sx={{
          backgroundColor: 'white',
          cursor: 'pointer',
          border: 'none',
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