import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { useGetPackagesQuery } from 'store/api/packageApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayCurrency } from 'utils/string';

export default function Pricing() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const userId = useAppSelector((state) => state.user.userInfo?.id);

  const { data: packages, isLoading } = useGetPackagesQuery();

  const handleBuyPackage = async (packageId: number) => {
    if (!isLoggedIn) {
      return navigate('/login');
    }

    if (!userId) {
      throw new Error('User ID not found');
    }

    dispatch(showModal(ModalKey.SELECT_PAYMENT_METHOD, { userId, packageId }));
  };

  if (isLoading) {
    return <CenterLoading />;
  }

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
        {packages &&
          packages.map((item, index) => (
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
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        textAlign="center"
                        fontWeight="bold"
                        my={1}
                      >
                        {displayCurrency(item.price)}
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        my={1}
                      >
                        / {item.duration} {item.duration === 1 ? 'month' : 'months'}
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
