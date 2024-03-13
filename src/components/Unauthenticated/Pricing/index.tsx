import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { configs } from 'configurations';

const packages = [
  {
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

const paymentParams = {
  vnp_Amount: '1806000',
  vnp_Command: 'pay',
  vnp_CreateDate: '20210801153333',
  vnp_CurrCode: 'VND',
  vnp_IpAddr: '127.0.0.1',
  vnp_Locale: 'vn',
  vnp_OrderInfo: 'Thanh+toan+don+hang+%3A5',
  vnp_OrderType: 'other',
  vnp_ReturnUrl: 'https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl',
  vnp_TxnRef: '5',
  vnp_Version: '2.1.0',
};

const paymentURL = `${configs.vnpUrl}?${new URLSearchParams(paymentParams).toString()}`;

export default function Pricing() {
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
                    onClick={() => window.open(paymentURL, '_blank')}
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
