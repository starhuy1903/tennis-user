import DownloadIcon from '@mui/icons-material/Download';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinkMUI from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import logo from 'assets/images/app-logo.png';

const LinkTitle = ({ title, link }: { title: string; link: string }) => {
  return (
    <Typography
      component={Link}
      to={link}
      variant="body2"
      sx={{
        'color': 'text.secondary',
        'textDecoration': 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {title}
    </Typography>
  );
};

const LinkIcon = ({ icon, link }: { icon: React.ReactNode; link: string }) => {
  return (
    <LinkMUI
      href={link}
      target="_blank"
      sx={{
        'color': 'text.secondary',
        '&:hover': {
          color: 'primary.main',
        },
      }}
    >
      {icon}
    </LinkMUI>
  );
};

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderTop: `1px solid ${theme.palette.divider}`,
        pt: 4,
        pb: 2,
        minWidth: 350,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3.5}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ height: 40 }}
              />
              {/* <Typography
                variant="h6"
                color="textPrimary"
              >
                Tenity
              </Typography> */}
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              mt={1}
            >
              The best integrated platform for recreational tennis players.
              <br />
              Email:{' '}
              <LinkMUI
                href="mailto: support@tenity.com"
                sx={{
                  'color': 'primary.main',
                  'textDecoration': 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                support@tenity.com
              </LinkMUI>
              <br />
              Hotline:{' '}
              <LinkMUI
                href="tel:1900 1234"
                sx={{
                  'color': 'primary.main',
                  'textDecoration': 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                1900 1234
              </LinkMUI>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={0.5}
          />
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
            >
              Company
            </Typography>
            <LinkTitle
              title="About Us"
              link="/about"
            />
            <br />
            <LinkTitle
              title="Our services"
              link="/pricing"
            />
            <br />
            <LinkTitle
              title="Contact Us"
              link="/contact"
            />
            <br />
            <LinkTitle
              title="News"
              link="/news"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
            >
              Support
            </Typography>
            <LinkTitle
              title="FAQ"
              link="/faq"
            />

            <br />
            <LinkTitle
              title="Terms of Use"
              link="/terms"
            />
            <br />
            <LinkTitle
              title="Privacy Policy"
              link="/privacy"
            />
            <br />
            <LinkTitle
              title="Cookie Policy"
              link="/cookie-policy"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={1.5}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <LinkIcon
                link="https://facebook.com"
                icon={<FacebookIcon />}
              />
              <LinkIcon
                link="https://twitter.com"
                icon={<TwitterIcon />}
              />
              <LinkIcon
                link="https://instagram.com"
                icon={<InstagramIcon />}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={2.5}
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
            >
              Mobile Application
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              mb={2}
            >
              Our mobile app is optimized for your phone. Download it for free!
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              fullWidth
              href="https://firebasestorage.googleapis.com/v0/b/tennis-7aa7c.appspot.com/o/app-release.apk?alt=media&token=12ce7e00-2bc9-4afb-bf76-c50586e15011"
            >
              Download
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
          >
            © {new Date().getFullYear()} Tenity. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
