import { useState } from 'react';
import {
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {
  CalendarIcon as CalendarOutline,
  CurrencyDollarIcon as CurrencyOutline,
  CreditCardIcon as CreditCardOutline,
  ShoppingBagIcon as ShoppingBagOutline,
  Cog6ToothIcon as CogOutline,
  UsersIcon as UsersOutline,
  ScissorsIcon as ScissorsOutline,
} from '@heroicons/react/24/outline';

import {
  CalendarIcon as CalendarSolid,
  CurrencyDollarIcon as CurrencySolid,
  CreditCardIcon as CreditCardSolid,
  ShoppingBagIcon as ShoppingBagSolid,
  Cog6ToothIcon as CogSolid,
  UsersIcon as UsersSolid,
  ScissorsIcon as ScissorsSolid,
} from '@heroicons/react/24/solid';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { label: 'Agenda', icon: CalendarOutline, hoverIcon: CalendarSolid },
    { label: 'Registrar Gasto', icon: CurrencyOutline, hoverIcon: CurrencySolid },
    { label: 'Fechar Caixa', icon: CreditCardOutline, hoverIcon: CreditCardSolid },
    { label: 'Produtos', icon: ShoppingBagOutline, hoverIcon: ShoppingBagSolid },
    { label: 'Serviços', icon: ScissorsOutline, hoverIcon: ScissorsSolid },
    { label: 'Funcionários', icon: UsersOutline, hoverIcon: UsersSolid },
  ];

  return (
    <>
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

          <List>
            {menuItems.map(({ label, icon: Icon, hoverIcon: HoverIcon }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'var(--color-accent)' },
                  }}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    console.log(`Navegar para: ${label}`);
                    setOpen(false);
                  }}
                >
                  <ListItemIcon sx={{ color: 'var(--color-secondary)', minWidth: '36px' }}>
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

          <div className="mt-auto text-center text-xs text-gray-500">
            Versão MVP 1.0
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;