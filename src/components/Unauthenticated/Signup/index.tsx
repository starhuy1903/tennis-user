import { Box, Button, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { isApiErrorResponse } from 'store/api/helper';
import { useSignupMutation } from 'store/api/userApiSlice';
import { SignupPayload } from 'types/user';
import { showError, showSuccess } from 'utils/toast';

export default function Signup() {
  const navigate = useNavigate();

  const [requestSignup, { isLoading: isSubmitting }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors: formError },
    watch,
  } = useForm<SignupPayload>();
  const formValue = watch();

  const onSubmit: SubmitHandler<SignupPayload> = async (data) => {
    try {
      await requestSignup(data).unwrap();

      showSuccess('Sign up successfully! Please log in to continue.');

      setTimeout(async () => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      if (isApiErrorResponse(err)) {
        showError(err.data.message);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        fontFamily: 'Roboto, sans-serif',
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
            Create an account
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            Start your 30-day free trial.
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
              error={!!formError.name}
            >
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                {...register('name', {
                  required: 'Full name is required!',
                  minLength: {
                    value: 3,
                    message: 'Full name must be at least 3 characters!',
                  },
                })}
                id="name"
                placeholder="Enter your name"
                error={!!formError.name}
                aria-describedby="name-helper-text"
                size="small"
                sx={{
                  backgroundColor: 'white',
                }}
                disabled={isSubmitting}
              />
              <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
            </FormControl>

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

            <FormControl
              fullWidth
              error={!!formError.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                {...register('confirmPassword', {
                  required: 'Confirm password is required!',
                  validate: (value) => value === formValue.password || 'The confirm password do not match',
                })}
                id="confirmPassword"
                type="password"
                placeholder="Enter your confirm password"
                error={!!formError.confirmPassword}
                aria-describedby="confirmPassword-helper-text"
                size="small"
                sx={{
                  backgroundColor: 'white',
                }}
                disabled={isSubmitting}
              />
              <FormHelperText id="confirmPassword-helper-text">{formError.confirmPassword?.message}</FormHelperText>
            </FormControl>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 6, color: 'white', width: '100%' }}
          >
            {isSubmitting ? 'Loading ...' : 'Get started'}
          </Button>

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
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
