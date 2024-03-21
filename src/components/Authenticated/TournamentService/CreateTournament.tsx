import { Box, Container, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';

type FormType = {
  tournamentName: string;
  description: string;
  contactPersonName: string;
  contactNumber: string;
  contactEmail: string;
  startDate: string;
  endDate: string;
  registrationDueDate: string;
  dueTime: string;
};

export default function CreateTournament() {
  const { handleSubmit, register, control, formState, watch } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      tournamentName: '',
      description: '',
      contactPersonName: '',
      contactNumber: '',
      contactEmail: '',
      startDate: '',
      endDate: '',
      registrationDueDate: '',
      dueTime: '',
    },
  });

  const { errors: formError } = formState;
  const formValues = watch();

  return (
    <Container
      maxWidth="xl"
      sx={{ marginY: 8 }}
    >
      <Typography
        variant="h4"
        noWrap
        component="h4"
        sx={{
          display: 'flex',
          fontWeight: 700,
        }}
      >
        TOURNAMENT CREATION FORM
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          {/* Information */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Information</Typography>
            <Stack
              spacing={2}
              sx={{ mt: 1 }}
            >
              <FormControl
                fullWidth
                error={!!formError.tournamentName}
              >
                <FormLabel htmlFor="tournamentName">Tournament name</FormLabel>
                <TextField
                  {...register('tournamentName', {
                    required: 'The company name is required.',
                  })}
                  required
                  id="tournamentName"
                  error={!!formError.tournamentName}
                  aria-describedby="tournamentName-helper-text"
                  placeholder="Tournament name"
                />
                <FormHelperText id="tournamentName-helper-text">{formError.tournamentName?.message}</FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                error={!!formError.description}
              >
                <FormLabel>About your tournament</FormLabel>
                <TextField
                  {...register('description', {
                    required: 'The description is required.',
                  })}
                  id="description"
                  error={!!formError.description}
                  aria-describedby="description-helper-text"
                  multiline
                  rows={3}
                  placeholder="Say something about your tournament"
                />
                <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
              </FormControl>
            </Stack>
          </Box>

          {/* Contact information */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Contact Information</Typography>
            <Stack
              sx={{ mt: 1 }}
              spacing={2}
            >
              <FormControl
                fullWidth
                error={!!formError.contactPersonName}
              >
                <FormLabel htmlFor="contactPersonName">Contact name</FormLabel>
                <TextField
                  {...register('contactPersonName', {
                    required: 'The contact person name is required.',
                  })}
                  required
                  id="contactPersonName"
                  error={!!formError.contactPersonName}
                  aria-describedby="contactPersonName-helper-text"
                />
                <FormHelperText id="contactPersonName-helper-text">
                  {formError.contactPersonName?.message}
                </FormHelperText>
              </FormControl>

              <Stack
                direction="row"
                spacing={2}
              >
                <FormControl
                  fullWidth
                  error={!!formError.contactNumber}
                >
                  <FormLabel htmlFor="contactNumber">Contact number</FormLabel>
                  <TextField
                    {...register('contactNumber', {
                      required: 'The contact number is required.',
                    })}
                    required
                    id="contactNumber"
                    error={!!formError.contactNumber}
                    aria-describedby="contactNumber-helper-text"
                  />
                  <FormHelperText id="contactNumber-helper-text">{formError.contactNumber?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  error={!!formError.contactEmail}
                >
                  <FormLabel htmlFor="contactEmail">Contact email</FormLabel>
                  <TextField
                    {...register('contactEmail', {
                      required: 'The contact email is required.',
                    })}
                    required
                    id="contactEmail"
                    error={!!formError.contactEmail}
                    aria-describedby="contactEmail-helper-text"
                  />
                  <FormHelperText id="contactEmail-helper-text">{formError.contactEmail?.message}</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
          marginTop={2}
        >
          {/* Timeline */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Timeline</Typography>
            <Stack spacing={2}>
              <Stack
                spacing={2}
                direction="row"
              >
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.startDate}
                    >
                      <FormLabel htmlFor="startDate">Start date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={value}
                          onChange={onChange}
                        />
                      </LocalizationProvider>
                      <FormHelperText id="startDate-helper-text">{formError.contactPersonName?.message}</FormHelperText>
                    </FormControl>
                  )}
                />

                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.endDate}
                    >
                      <FormLabel htmlFor="endDate">End date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={value}
                          onChange={onChange}
                        />
                      </LocalizationProvider>
                      <FormHelperText id="endDate-helper-text">{formError.endDate?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack
                spacing={2}
                direction="row"
              ></Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
