import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { configs } from 'configurations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useLoginGoogleMutation, useLoginMutation } from 'store/api/userApiSlice';
import { CredentialPayload } from 'types/user';

export default function Login() {
  const [requestLogin, { isLoading: isSubmitting }] = useLoginMutation();
  const [requestLoginGoogle, { isLoading }] = useLoginGoogleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<CredentialPayload>();

  const onSubmit: SubmitHandler<CredentialPayload> = async (data) => {
    requestLogin(data).unwrap();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        component="form"
        autoComplete="off"
        sx={{
          px: 8,
          py: 4,
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Log in to your account
        </Typography>

        <Box
          sx={{
            mt: 4,
          }}
        >
          <Stack
            direction="column"
            spacing={2}
          >
            <FormControl
              fullWidth
              error={!!formError.email}
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                {...register('email', {
                  required: 'Email is required!',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address!',
                  },
                })}
                id="email"
                placeholder="Enter your email"
                error={!!formError.email}
                aria-describedby="email-helper-text"
                size="small"
                sx={{
                  backgroundColor: 'white',
                }}
                disabled={isSubmitting}
              />
              <FormHelperText id="email-helper-text">{formError.email?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              error={!!formError.password}
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                {...register('password', {
                  required: 'Password is required!',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters!',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be at most 20 characters!',
                  },
                  validate: {
                    hasNumber: (value) => /\d/.test(value) || 'Password must contain a number!',
                    hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain an uppercase letter!',
                    hasLowercase: (value) => /[a-z]/.test(value) || 'Password must contain a lowercase letter!',
                  },
                })}
                id="password"
                type="password"
                placeholder="Enter your password"
                error={!!formError.password}
                aria-describedby="password-helper-text"
                size="small"
                sx={{
                  backgroundColor: 'white',
                }}
                disabled={isSubmitting}
              />
              <FormHelperText id="password-helper-text">{formError.password?.message}</FormHelperText>
            </FormControl>
          </Stack>

          <Box
            sx={{
              'mt': 2,
              'color': (theme) => theme.palette.primary.main,
              '& a': {
                'textDecoration': 'none',
                'color': (theme) => theme.palette.primary.main,
                'fontWeight': 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || isLoading}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 4, color: 'white', width: '100%' }}
          >
            {isSubmitting || isLoading ? 'Loading ...' : 'Login'}
          </Button>

          <Divider
            sx={{
              my: 2,
            }}
          >
            or
          </Divider>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <GoogleOAuthProvider clientId={configs.oauthClientID}>
              <GoogleLogin
                useOneTap={true}
                onSuccess={async (credentialResponse) => {
                  requestLoginGoogle({ token: credentialResponse.credential || '' }).unwrap();
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </Box>

          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              'mt': 2,
              'textAlign': 'center',
              '& a': {
                'textDecoration': 'none',
                'color': (theme) => theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            Don’t have an account yet? <Link to="/signup">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
