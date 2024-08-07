import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { blueGrey, lightGreen } from '@mui/material/colors';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { ModalKey } from 'constants/modal';
import { PackageType } from 'constants/package';
import { useGetPackagesQuery } from 'store/api/packageApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { selectIsLoggedIn } from 'store/slice/userSlice';
import { displayCurrency } from 'utils/string';

interface PackagePricingProps {
  title?: string;
  description?: string;
  type?: PackageType;
}

export default function PackagePricing({
  title = 'Our packages',
  description = 'We offer a variety of packages to suit your needs.',
  type,
}: PackagePricingProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userId = useAppSelector((state) => state.user.userInfo?.id);

  const { data: packages, isLoading } = useGetPackagesQuery(type);

  const tournamentPackages = useMemo(
    () => packages?.filter((item) => item.type === PackageType.TOURNAMENT),
    [packages]
  );
  const groupPackages = useMemo(() => packages?.filter((item) => item.type === PackageType.GROUP), [packages]);
  const affiliatePackages = useMemo(() => packages?.filter((item) => item.type === PackageType.AFFILIATE), [packages]);

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
    <Box my={4}>
      <Typography
        variant="h4"
        marginY={2}
        textAlign="center"
        fontWeight="bold"
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        marginBottom={2}
        color="text.secondary"
      >
        {description}
      </Typography>

      <Stack
        gap={4}
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          gap={6}
        >
          {tournamentPackages && tournamentPackages.length > 0 && (
            <Stack>
              <Typography
                fontSize={24}
                fontWeight={700}
                color={blueGrey[700]}
              >
                Tournament
              </Typography>
              <Grid
                container
                mt={4}
                gap={6}
              >
                {tournamentPackages.map((item, index) => (
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
                        background:
                          'linear-gradient(180deg, rgba(92,76,154,1) 0%, rgba(118,105,255,1) 0%, rgba(209,205,221,1) 100%)',

                        color: 'white',
                        borderRadius: 4,
                        border: '1px solid',
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
                              my={1}
                            >
                              / {item.duration} {item.duration === 1 ? 'month' : 'months'}
                            </Typography>
                            <Typography
                              variant="body2"
                              textAlign="center"
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
                                <CheckCircleOutlineIcon sx={{ color: lightGreen['A400'] }} />
                                <Typography variant="body2">{feature}</Typography>
                              </Box>
                            ))}
                          </Box>

                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleBuyPackage(item.id)}
                            startIcon={<ShoppingCartOutlinedIcon />}
                          >
                            Buy now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}

          {groupPackages && groupPackages.length > 0 && (
            <Stack>
              <Typography
                fontSize={24}
                fontWeight={700}
                color={blueGrey[700]}
              >
                Group
              </Typography>
              <Grid
                container
                mt={4}
                gap={6}
              >
                {groupPackages.map((item, index) => (
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
                        background:
                          'linear-gradient(180deg, rgba(92,76,154,1) 0%, rgba(118,105,255,1) 0%, rgba(209,205,221,1) 100%)',

                        color: 'white',
                        borderRadius: 4,
                        border: '1px solid',
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
                              my={1}
                            >
                              / {item.duration} {item.duration === 1 ? 'month' : 'months'}
                            </Typography>
                            <Typography
                              variant="body2"
                              textAlign="center"
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
                                <CheckCircleOutlineIcon sx={{ color: lightGreen['A400'] }} />
                                <Typography variant="body2">{feature}</Typography>
                              </Box>
                            ))}
                          </Box>

                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleBuyPackage(item.id)}
                            startIcon={<ShoppingCartOutlinedIcon />}
                          >
                            Buy now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </Box>

        {affiliatePackages && affiliatePackages.length > 0 && (
          <Stack>
            <Typography
              fontSize={24}
              fontWeight={700}
              color={blueGrey[700]}
            >
              Affiliate
            </Typography>
            <Grid
              container
              mt={4}
              gap={6}
            >
              {affiliatePackages.map((item, index) => (
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
                      background:
                        'linear-gradient(180deg, rgba(92,76,154,1) 0%, rgba(118,105,255,1) 0%, rgba(209,205,221,1) 100%)',

                      color: 'white',
                      borderRadius: 4,
                      border: '1px solid',
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
                            my={1}
                          >
                            / {item.duration} {item.duration === 1 ? 'month' : 'months'}
                          </Typography>
                          <Typography
                            variant="body2"
                            textAlign="center"
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
                              <CheckCircleOutlineIcon sx={{ color: lightGreen['A400'] }} />
                              <Typography variant="body2">{feature}</Typography>
                            </Box>
                          ))}
                        </Box>

                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleBuyPackage(item.id)}
                          startIcon={<ShoppingCartOutlinedIcon />}
                        >
                          Buy now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
