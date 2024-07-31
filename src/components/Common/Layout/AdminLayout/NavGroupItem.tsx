import { List, Typography } from '@mui/material';
import { ReactNode } from 'react';

type NavGroupWrapperProps = {
  title?: string;
  children: ReactNode;
};

function NavGroupWrapper({ title, children }: NavGroupWrapperProps) {
  return (
    <List
      sx={{ paddingBottom: '10px' }}
      subheader={
        title && (
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              padding: ' 10px 0',
              userSelect: 'none',
            }}
          >
            {title}
          </Typography>
        )
      }
    >
      {children}
    </List>
  );
}

export default NavGroupWrapper;
