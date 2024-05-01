import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';
import { Package } from 'types/package';

interface ChooseTournamentPackageProps {
  packages: Package[];
}

export default function ChooseTournamentPackage({ packages }: ChooseTournamentPackageProps) {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.user.userInfo?.id);

  const handleBuyPackage = (packageId: number) => {
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
        Our tournament packages
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
                      {item.name}
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
