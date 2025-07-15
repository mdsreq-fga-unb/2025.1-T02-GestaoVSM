import { useState } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {
  CalendarIcon as CalendarOutline,
  CurrencyDollarIcon as CurrencyOutline,
  CreditCardIcon as CreditCardOutline,
  ShoppingBagIcon as ShoppingBagOutline,
  UsersIcon as UsersOutline,
  ScissorsIcon as ScissorsOutline,
  RectangleGroupIcon as RectangleGroupOutline,
} from '@heroicons/react/24/outline';

import {
  CalendarIcon as CalendarSolid,
  CurrencyDollarIcon as CurrencySolid,
  CreditCardIcon as CreditCardSolid,
  ShoppingBagIcon as ShoppingBagSolid,
  UsersIcon as UsersSolid,
  ScissorsIcon as ScissorsSolid,
  RectangleGroupIcon as RectangleGroupSolid,
} from '@heroicons/react/24/solid';

import { useNavigate } from 'react-router-dom';

/**
 * Componente Sidebar que exibe um menu lateral deslizante.
 * Contém itens navegáveis com ícones que mudam ao passar o mouse.
 * O menu pode ser aberto e fechado via botão de menu.
 */
function Sidebar() {
  const navigate = useNavigate();
  // Estado para controlar se o drawer está aberto ou fechado
  const [open, setOpen] = useState(false);

  // Estado para armazenar o label do item que está sendo "hovered" (passado o mouse)
  const [hovered, setHovered] = useState(null);

  // Função para abrir/fechar o drawer
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // Lista de itens do menu com seus ícones (outline e solid para hover)
  const menuItems = [
    { label: 'Agenda', icon: CalendarOutline, hoverIcon: CalendarSolid, path: '/agenda' },
    { label: 'Painel', icon: RectangleGroupOutline, hoverIcon: RectangleGroupSolid, path: '/painel' },
    { label: 'Registrar Gasto', icon: CurrencyOutline, hoverIcon: CurrencySolid },
    { label: 'Fechar Caixa', icon: CreditCardOutline, hoverIcon: CreditCardSolid, path: '/fechar-caixa' },
    { label: 'Produtos', icon: ShoppingBagOutline, hoverIcon: ShoppingBagSolid },
    { label: 'Serviços', icon: ScissorsOutline, hoverIcon: ScissorsSolid },
    { label: 'Funcionários', icon: UsersOutline, hoverIcon: UsersSolid },
  ];

  return (
    <>
      {/* Botão que abre o menu lateral, com animação de rotação */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: 'var(--color-secondary)',
          borderRadius: 2,
          transition: 'transform 0.4s ease',
          transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
          '&:hover': {
            transform: open ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1.1)',
          },
        }}
        aria-label="Abrir menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer do Material UI que aparece do lado esquerdo */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-secondary)',
            width: 250,
          },
        }}
      >
        <div className="p-4 mt-8 flex flex-col h-full">
          {/* Cabeçalho do menu com título e botão para fechar */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6">Gestão VSM</Typography>
            <IconButton
              onClick={toggleDrawer(false)}
              size="small"
              aria-label="Fechar menu"
              sx={{
                transition: 'transform 0.4s ease',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                '&:hover': {
                  transform: open ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)',
                },
                color: 'var(--color-secondary)',
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Lista de itens do menu, com troca do ícone quando hover */}
          <List>
            {menuItems.map(({ label, icon: Icon, hoverIcon: HoverIcon, path }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'var(--color-accent)' },
                  }}
                  onMouseEnter={() => setHovered(label)} // Marca item como hovered
                  onMouseLeave={() => setHovered(null)}  // Remove hover ao sair
                  onClick={() => {
                    navigate(path);
                    setOpen(false); // Fecha o menu ao clicar
                  }}
                >
                  <ListItemIcon sx={{ color: 'var(--color-secondary)', minWidth: '36px' }}>
                    {/* Exibe ícone sólido quando hover, outline caso contrário */}
                    {hovered === label ? (
                      <HoverIcon className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Rodapé fixo com informação da versão */}
          <div className="mt-auto text-center text-xs text-gray-500">
            Versão MVP 1.0
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;