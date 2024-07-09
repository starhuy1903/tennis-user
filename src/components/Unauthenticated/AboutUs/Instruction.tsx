import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import { selectIsLoggedIn } from 'store/slice/userSlice';

import RefereeScreen from 'assets/images/referee-screen.png';

export default function Instruction() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        },
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '2rem',
        borderRadius: '20px',
      }}
    >
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={RefereeScreen}
          alt="Referee screen"
          sx={{
            width: {
              xs: '500px',
              md: '300px',
            },
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
      >
        <Typography
          variant="h4"
          fontWeight={500}
        >
          Useful integrated platform for the recreational tennis community!
        </Typography>

        <Typography
          variant="h6"
          fontWeight={400}
          my={4}
        >
          Join our platform to organize and manage tennis tournaments, track live scores, and connect with fellow
          players seamlessly on both web and mobile.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            columnGap: '20px',
            justifyContent: {
              xs: 'center',
              md: 'flex-start',
            },
          }}
        >
          <Button
            size="large"
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              'backgroundColor': '#12B76A',
              'borderRadius': '30px',
              'paddingY': '10px',
              'height': '60px',
              'width': '200px',

              '&:hover': {
                backgroundColor: '#36C280',
              },
            }}
          >
            Download now!
          </Button>

          {!isLoggedIn && (
            <Button
              component={Link}
              to="/signup"
              size="large"
              variant="contained"
              sx={{
                'backgroundColor': '#12B76A',
                'borderRadius': '30px',
                'paddingY': '10px',
                'height': '60px',
                'width': '200px',

                '&:hover': {
                  backgroundColor: '#36C280',
                },
              }}
            >
              Get started!
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
