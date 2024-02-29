import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAffiliateSponsorMutation } from 'store/api/userApiSlice';
import { showSuccess } from 'utils/toast';

type FormType = {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  website: string;
  taxNumber: string;
  description: string;
};

export default function AffiliateSponsor() {
  const [requestAffiliateSponsor, { isLoading }] = useAffiliateSponsorMutation();
  const { handleSubmit, register, control, formState } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      companyName: '',
      contactPersonName: '',
      email: '',
      phone: '',
      website: '',
      taxNumber: '',
      description: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      await requestAffiliateSponsor(data);
      showSuccess('Affiliate sponsor request submitted successfully.');
    } catch (error) {
      // handled error
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ marginY: 8 }}
    >
      <Typography
        variant="h3"
        noWrap
        component="h3"
        sx={{
          display: 'flex',
          fontWeight: 700,
        }}
      >
        Affiliate Sponsor
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.companyName}
          >
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <TextField
              {...register('companyName', {
                required: 'The company name is required.',
              })}
              required
              id="companyName"
              error={!!formError.companyName}
              aria-describedby="companyName-helper-text"
            />
            <FormHelperText id="companyName-helper-text">{formError.companyName?.message}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={!!formError.taxNumber}
          >
            <FormLabel htmlFor="taxNumber">Tax Number</FormLabel>
            <TextField
              {...register('taxNumber', {
                required: 'The tax number is required.',
              })}
              required
              id="taxNumber"
              error={!!formError.taxNumber}
              aria-describedby="taxNumber-helper-text"
            />
            <FormHelperText id="taxNumber-helper-text">{formError.taxNumber?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.email}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              {...register('email', {
                required: 'The email is required.',
              })}
              id="email"
              error={!!formError.email}
              aria-describedby="email-helper-text"
            />
            <FormHelperText id="email-helper-text">{formError.email?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            error={!!formError.website}
          >
            <FormLabel htmlFor="website">Website</FormLabel>
            <TextField
              {...register('website', {
                required: 'The website is required.',
              })}
              id="website"
              error={!!formError.website}
              aria-describedby="website-helper-text"
            />
            <FormHelperText id="website-helper-text">{formError.website?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.contactPersonName}
          >
            <FormLabel htmlFor="contactPersonName">Contact Person Name</FormLabel>
            <TextField
              {...register('contactPersonName', {
                required: 'The contact person name is required.',
              })}
              id="contactPersonName"
              error={!!formError.contactPersonName}
              aria-describedby="contactPersonName-helper-text"
            />
            <FormHelperText id="contactPersonName-helper-text">{formError.contactPersonName?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            error={!!formError.phone}
          >
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <TextField
              {...register('phone', {
                required: 'The phone number is required.',
              })}
              id="phone"
              error={!!formError.phone}
              aria-describedby="phone-helper-text"
            />
            <FormHelperText id="phone-helper-text">{formError.phone?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <FormControl
          fullWidth
          error={!!formError.description}
        >
          <FormLabel>Description</FormLabel>
          <TextField
            {...register('description', {
              required: 'The description is required.',
            })}
            id="description"
            error={!!formError.description}
            aria-describedby="description-helper-text"
            multiline
            rows={3}
          />
          <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          sx={{ mt: 4 }}
        >
          Submit
        </Button>
        <DevTool control={control} /> {/* set up the dev tool */}
      </Box>
    </Container>
  );
}
