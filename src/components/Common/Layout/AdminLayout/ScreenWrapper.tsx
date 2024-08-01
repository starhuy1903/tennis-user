import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export function ListWrapper({
  label = '',
  btnLabel = '',
  btnLink = '',
  children,
}: {
  label: string;
  btnLabel?: string;
  btnLink?: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 2 }}
        >
          {label}
        </Typography>
        {btnLabel && btnLink && (
          <Button
            component={Link}
            to={btnLink}
            variant="contained"
            sx={{
              color: 'white',
            }}
          >
            {btnLabel}
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      startIcon={<ChevronLeftIcon />}
      sx={{
        borderRadius: '20px',
      }}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export function DetailWrapper({ label = '', children }: { label?: string; children: React.ReactNode }) {
  return (
    <Box>
      <BackButton />
      <Typography
        variant="h5"
        color="green"
        fontWeight={500}
        sx={{ my: 2 }}
        noWrap
      >
        {label}
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          bgcolor: 'white',
          p: 4,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
