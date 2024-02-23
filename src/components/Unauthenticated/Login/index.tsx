import { Box, Button, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useLoginMutation } from 'store/api/userApiSlice';
import { CredentialPayload } from 'types/user';

export default function Login() {
  const [requestLogin, { isLoading: isSubmitting }] = useLoginMutation();

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
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          px: 8,
          py: 8,
          borderRadius: 2,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
            }}
          >
            Log in to your account
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Welcome back! Please enter your details.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
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
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </Box>

          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 6, color: 'white', width: '100%' }}
          >
            {isSubmitting ? 'Loading ...' : 'Log in'}
          </Button>

          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              'mt': 2,
              'textAlign': 'center',
              '& a': {
                'textDecoration': 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            Don’t have an account yet? <Link to="/register">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
