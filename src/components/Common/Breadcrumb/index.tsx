import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs as BreadcrumbsComp, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

export const Breadcrumbs = ({ customRoutes }: { customRoutes?: any[] }) => {
  const breadcrumbs = useReactRouterBreadcrumbs(customRoutes);

  return (
    <>
      <BreadcrumbsComp
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          my: 2,
        }}
      >
        {breadcrumbs.map(({ match, breadcrumb }, index) => {
          if (index !== breadcrumbs.length - 1) {
            return (
              <Box
                component={Link}
                to={match.pathname}
                key={index}
                sx={{
                  'color': 'text.secondary',
                  'fontWeight': 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {breadcrumb}
              </Box>
            );
          } else {
            return (
              <Typography
                key={index}
                color="primary.main"
                fontWeight={500}
              >
                {breadcrumb}
              </Typography>
            );
          }
        })}
      </BreadcrumbsComp>
    </>
  );
};
