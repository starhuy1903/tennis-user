import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as EmailValidator from 'email-validator';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import {
  Gender,
  GenderOptions,
  ParticipantType,
  ParticipantTypeOptions,
  TournamentFormat,
  TournamentLevel,
} from 'constants/tournament';
import { useCreateOpenTournamentMutation } from 'store/api/tournament/creator/general';
import { UserPackage } from 'types/package';
import { OpenTournamentPayload } from 'types/tournament';
import { displayTimestamp } from 'utils/datetime';
import { getUsedTournamentService } from 'utils/package';
import { showSuccess } from 'utils/toast';

// TODO: get from system config
const tournamentFormatOptions = [
  { id: 1, value: 'knockout', displayValue: 'Knockout', level: 'basic' },
  { id: 2, value: 'round_robin', displayValue: 'Round Robin', level: 'basic' },
  { id: 3, value: 'group_playoff', displayValue: 'Group Playoff', level: 'advanced' },
];

type FormType = Omit<OpenTournamentPayload, 'purchasedPackageId'>;

interface FormCreateProps {
  selectedPackage: UserPackage;
  setSelectedPackage: any;
}

export default function FormCreateTournament({ selectedPackage, setSelectedPackage }: FormCreateProps) {
  const navigate = useNavigate();
  const [requestCreateTournament, { isLoading }] = useCreateOpenTournamentMutation();

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const usedService = useMemo(() => {
    return getUsedTournamentService(selectedPackage);
  }, [selectedPackage]);

  const { handleSubmit, register, control, formState, getValues } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      contactPersonName: userInfo?.name,
      contactNumber: userInfo?.phoneNumber,
      contactEmail: userInfo?.email,
      startDate: dayjs().add(1, 'week').add(1, 'day').startOf('day').toISOString(), // 1 week + 1 day later
      endDate: dayjs().add(1, 'month').add(1, 'week').add(1, 'day').endOf('day').toISOString(), // 1 month + 1 week + 1 day later
      registrationDueDate: dayjs().add(1, 'week').endOf('day').toISOString(), // 1 week later
      playersBornAfterDate: dayjs('1990-01-01').startOf('day').toISOString(),
      address: '',
      maxParticipants: 20,
      image: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      const submitData: OpenTournamentPayload = {
        ...data,
        maxParticipants: Number(data.maxParticipants),
        purchasedPackageId: selectedPackage.id,
      };

      const res = await requestCreateTournament(submitData).unwrap();
      showSuccess('Created tournament successfully.');
      navigate(`/tournaments/${res.id}/info`);
    } catch (error) {
      // handled error
    }
  };

  const handleGoPreviousStep = () => {
    setSelectedPackage(null);
  };

  return (
    <Box>
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
      <Card sx={{ p: 2, mt: 2 }}>
        <CardHeader
          title={selectedPackage.name}
          titleTypographyProps={{ variant: 'h2', fontWeight: 'bold' }}
        />
        <CardContent>
          <Stack>
            <Box>
              <Typography
                display="inline"
                fontWeight="bold"
                marginRight="10px"
              >
                Level:
              </Typography>
              <Typography display="inline">
                {usedService.config.level === TournamentLevel.BASIC ? (
                  <Chip label="Basic" />
                ) : (
                  <Chip
                    label="Advanced"
                    color="info"
                  />
                )}
              </Typography>
            </Box>
            <Box>
              <Typography
                display="inline"
                fontWeight="bold"
                marginRight="10px"
              >
                Expired date:
              </Typography>
              <Typography display="inline">{displayTimestamp(selectedPackage.endDate)}</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            onClick={handleGoPreviousStep}
          >
            Change package
          </Button>
        </CardActions>
      </Card>
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
                error={!!formError.name}
              >
                <FormLabel htmlFor="name">Tournament name</FormLabel>
                <TextField
                  {...register('name', {
                    required: 'The company name is required.',
                    minLength: {
                      value: 3,
                      message: 'The name must be at least 3 characters.',
                    },
                  })}
                  required
                  id="name"
                  error={!!formError.name}
                  aria-describedby="name-helper-text"
                  placeholder="Tournament name"
                />
                <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                error={!!formError.description}
              >
                <FormLabel>About your tournament</FormLabel>
                <TextField
                  {...register('description', {
                    required: 'The description is required.',
                    minLength: {
                      value: 20,
                      message: 'The description must be at least 20 characters.',
                    },
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
                  placeholder="Name"
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
                      minLength: {
                        value: 8,
                        message: 'The contact number must be at least 8 characters.',
                      },
                      validate: (value) => !isNaN(Number(value)) || 'The contact number must be a number.',
                    })}
                    placeholder="0987654321"
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
                      validate: (value) => EmailValidator.validate(value) || 'The contact email is not valid.',
                    })}
                    required
                    placeholder="Contact email"
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
                  rules={{
                    required: 'The start date is required.',
                    validate: (value) => {
                      const startDate = dayjs(value);
                      if (startDate.isBefore(dayjs(), 'day')) {
                        return 'The start date cannot be in the past.';
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.startDate}
                    >
                      <FormLabel htmlFor="startDate">Start date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(date) => {
                            onChange(date?.toISOString());
                          }}
                          disablePast
                          defaultValue={dayjs(getValues('startDate'))}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                      <FormHelperText id="startDate-helper-text">{formError.startDate?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="endDate"
                  rules={{
                    required: 'The end date is required.',
                    validate: (value) => {
                      const startDate = dayjs(getValues('startDate'));
                      const endDate = dayjs(value);

                      if (!endDate.isAfter(startDate, 'day')) {
                        return 'The end date must be after the start date.';
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.endDate}
                    >
                      <FormLabel htmlFor="endDate">End date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(date) => {
                            onChange(date?.toISOString());
                          }}
                          disablePast
                          defaultValue={dayjs(getValues('endDate'))}
                          format="DD/MM/YYYY"
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
              >
                <Controller
                  control={control}
                  name="registrationDueDate"
                  rules={{
                    required: 'The registration due date is required.',
                    validate: (value) => {
                      const startDate = dayjs(getValues('startDate'));
                      const registrationDueDate = dayjs(value);

                      if (!registrationDueDate.isBefore(startDate, 'day')) {
                        return 'The registration due date must be before the start date.';
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.registrationDueDate}
                    >
                      <FormLabel htmlFor="registrationDueDate">Registration due date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          onChange={(date) => {
                            onChange(date?.toISOString());
                          }}
                          disablePast
                          defaultValue={dayjs(getValues('registrationDueDate'))}
                          format="DD/MM/YYYY HH:mm"
                        />
                      </LocalizationProvider>
                      <FormHelperText id="registrationDueDate-helper-text">
                        {formError.registrationDueDate?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>
          </Box>

          {/* Location address */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Location Address</Typography>
            <FormControl
              fullWidth
              error={!!formError.address}
            >
              <FormLabel htmlFor="address">Address detail</FormLabel>
              <TextField
                placeholder="Address detail"
                {...register('address', {
                  required: 'The address is required.',
                  minLength: {
                    value: 20,
                    message: 'The address must be at least 20 characters.',
                  },
                })}
                required
                id="address"
                error={!!formError.address}
                aria-describedby="address-helper-text"
              />
              <FormHelperText id="address-helper-text">{formError.address?.message}</FormHelperText>
            </FormControl>
            <Stack></Stack>
          </Box>
        </Stack>
        {/* Game Settings */}
        <Stack spacing={2}>
          <Typography variant="h6">Tournament Settings</Typography>
          <Stack
            direction="row"
            spacing={2}
          >
            <Controller
              control={control}
              name="format"
              defaultValue={tournamentFormatOptions[0].value as TournamentFormat}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.format}
                >
                  <FormLabel htmlFor="format">Choose format</FormLabel>
                  <Select
                    value={value}
                    id="format"
                    onChange={onChange}
                    aria-describedby="format-helper-text"
                  >
                    {tournamentFormatOptions.map((tournamentOption) => (
                      <MenuItem
                        key={tournamentOption.id}
                        value={tournamentOption.value}
                      >
                        {tournamentOption.displayValue}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="format-helper-text">{formError.format?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <FormControl
              fullWidth
              error={!!formError.maxParticipants}
            >
              <FormLabel htmlFor="maxParticipants">Max participants</FormLabel>
              <TextField
                {...register('maxParticipants', {
                  required: 'The max participants is required.',
                })}
                required
                type="number"
                id="maxParticipants"
                error={!!formError.maxParticipants}
                aria-describedby="maxParticipants-helper-text"
              />
              <FormHelperText id="maxParticipants-helper-text">{formError.maxParticipants?.message}</FormHelperText>
            </FormControl>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
          >
            <Controller
              control={control}
              name="gender"
              defaultValue={Gender.ANY}
              rules={{ required: 'Please select a gender.' }}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.gender}
                >
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    value={value}
                    id="gender"
                    onChange={onChange}
                    aria-describedby="gender-helper-text"
                  >
                    {Object.entries(GenderOptions).map(([genderKey, genderValue], index) => (
                      <MenuItem
                        key={index}
                        value={genderKey}
                      >
                        {genderValue}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="gender-helper-text">{formError.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="participantType"
              defaultValue={ParticipantType.SINGLE}
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.participantType}
                >
                  <FormLabel htmlFor="participantType">Participant type</FormLabel>
                  <Select
                    value={value}
                    id="participantType"
                    onChange={onChange}
                    aria-describedby="participantType-helper-text"
                  >
                    {Object.entries(ParticipantTypeOptions).map(([participantTypeKey, participantTypeValue], index) => (
                      <MenuItem
                        key={index}
                        value={participantTypeKey}
                      >
                        {participantTypeValue}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="participantType-helper-text">{formError.participantType?.message}</FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="playersBornAfterDate"
              render={({ field: { onChange } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.playersBornAfterDate}
                >
                  <FormLabel htmlFor="playersBornAfterDate">Player born after</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => {
                        onChange(date?.toISOString());
                      }}
                      defaultValue={dayjs(getValues('playersBornAfterDate'))}
                      format="DD/MM/YYYY"
                      disableFuture
                    />
                  </LocalizationProvider>
                  <FormHelperText id="playersBornAfterDate-helper-text">
                    {formError.playersBornAfterDate?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Stack>

          <Controller
            name="image"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <SingleImagePicker
                label="Upload a background image for your tournament"
                imageUrl={value}
                handleUpload={onChange}
                handleRemove={() => {
                  onChange('');
                }}
              />
            )}
          />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            onClick={handleGoPreviousStep}
            sx={{ mt: 4 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 4 }}
          >
            Create tournament
          </Button>
        </Box>
      </Box>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
}
