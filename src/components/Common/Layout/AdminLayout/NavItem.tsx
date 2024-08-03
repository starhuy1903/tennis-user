import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  title: string;
  href: string;
  icon?: ReactNode;
};

function NavItem({ title, href, icon }: NavItemProps) {
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      className="px-0 py-1"
    >
      <NavLink
        to={href}
        className="w-full"
        style={({ isActive }) =>
          ({
            '--nav-item__background': isActive ? theme.palette.primary.light : 'transparent',
            '--nav-item__text': isActive ? theme.palette.primary.main : theme.palette.text.primary,
          }) as React.CSSProperties
        }
      >
        <ListItemButton
          sx={{
            'borderRadius': '12px',
            'backgroundColor': 'var(--nav-item__background) !important',
            'transition': 'all 0.5s ease',

            '&:hover': {
              '--nav-item__background': theme.palette.primary.light,
              '--nav-item__text': theme.palette.primary.main,
            },
          }}
        >
          {icon && (
            <ListItemIcon
              sx={{
                color: 'var(--nav-item__text)',
                transition: 'all 0.5s ease',
              }}
            >
              {icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: 'var(--nav-item__text)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  transition: 'all 0.5s ease',
                }}
              >
                {title}
              </Typography>
            }
          />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
}

export default NavItem;
