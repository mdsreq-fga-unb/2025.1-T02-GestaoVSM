import { Button } from '@mui/material';

/**
 * Componente PrimaryActionButton
 * 
 * Botão estilizado principal com:
 * - Estilo customizado (bordas arredondadas, padding, cores específicas e sombra)
 * - Texto sem transformação (normal, não uppercase)
 * - Suporte para ícone opcional passado via prop `icon`
 * - Permite passar outras props do MUI Button, incluindo estilos adicionais via `sx`
 * 
 * @param {React.ComponentType} icon - Componente de ícone (ex: Heroicons ou Material Icons)
 * @param {React.ReactNode} children - Conteúdo textual ou elementos filhos do botão
 * @param {...object} props - Outras props para o componente Button do MUI
 */
function PrimaryActionButton({ icon: Icon, children, ...props }) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        px: 5,
        py: 1.5,
        bgcolor: 'var(--color-secondary)',
        color: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: 'var(--color-primary)',
          color: 'var(--color-secondary)',
        },
        ...props.sx,              
      }}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </Button>
  );
}

export default PrimaryActionButton;
