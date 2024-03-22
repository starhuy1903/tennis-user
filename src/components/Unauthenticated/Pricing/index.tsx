import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

const packages = [
  {
    id: 1,
    title: 'Essential Package',
    price: 9,
    description: 'Our most popular package for beginner tennis groups with basic needs.',
    features: [
      'Maximum 20 members',
      '1-3 tournaments/month',
      'Finance management',
      'Schedule and event coordination',
      'Basic tournament organization',
      'Group messaging support',
    ],
  },
  {
    id: 2,
    title: 'Advanced Package',
    price: 19,
    description: 'The preferred option for professional tennis groups with advanced features.',
    features: [
      'Unlimited members',
      'Unlimited tournaments',
      'Access to all Essential package features',
      'Advanced tournament organization',
      'Real-time match result recording',
      'Elo system, tournament livestream support',
      'Affiliate partnership management',
    ],
  },
  // TODO: will add this as a service in the future
  // {
  //   title: 'Mentor Package',
  //   price: 15,
  //   description: 'Option for tennis coaches and instructors to use for teaching purposes.',
  //   features: [
  //     'Maximum 20 students',
  //     'Organize learning schedules',
  //     'Manage learning resources and assignments',
  //     'Group messaging support',
  //   ],
  // },
];

export default function Pricing() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userId = useAppSelector((state) => state.user.profile?.id);

  const navigate = useNavigate();

  const handleBuyPackage = async (packageId: number) => {
    if (!isLoggedIn) {
      return navigate('/login');
    }

    if (!userId) {
      throw new Error('User ID not found');
    }

    dispatch(showModal(ModalKey.SELECT_PAYMENT_METHOD, { userId, packageId }));
  };

  return (
    <Box>
      <Typography
        variant="h4"
        marginY={2}
        textAlign="center"
        fontWeight="bold"
      >
        Our packages
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        marginBottom={2}
        color="text.secondary"
      >
        We offer a variety of packages to suit your needs.
      </Typography>

      <Grid
        container
        justifyContent="center"
        mt={4}
        gap={6}
      >
        {packages.map((item, index) => (
          <Grid
            item
            key={index}
            sx={{
              'transition': 'transform .2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Card
              sx={{
                width: 350,
              }}
              elevation={3}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 470,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      color={(theme) => theme.palette.primary.main}
                      textAlign="center"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      textAlign="center"
                      fontWeight="bold"
                      my={1}
                    >
                      ${item.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      color="text.secondary"
                      marginBottom={4}
                    >
                      {item.description}
                    </Typography>

                    {item.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: 1,
                          gap: 1,
                        }}
                      >
                        <CheckCircleOutlineIcon color="primary" />
                        <Typography
                          variant="body2"
                          color="text.primary"
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBuyPackage(item.id)}
                  >
                    Buy now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
