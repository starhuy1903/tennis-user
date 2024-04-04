import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
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
import { useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import {
  Gender,
  GenderOptions,
  ParticipantType,
  ParticipantTypeOptions,
  TournamentFormat,
  TournamentLevel,
  TournamentScope,
} from 'constants/tournament';
import { useLazyGetMyGroupsQuery } from 'store/api/group/groupApiSlice';
import { useCreateTournamentMutation } from 'store/api/tournament/tournamentApiSlice';
import { UserPackage } from 'types/package';
import { GroupTournamentPayload, OpenTournamentPayload, TournamentPayload } from 'types/tournament';
import { displayTimestamp } from 'utils/datetime';
import { getUsedTournamentService } from 'utils/package';
import { showSuccess } from 'utils/toast';

const tournamentFormatOptions = [
  { id: 1, value: 'knockout', displayValue: 'Knockout', level: 'basic' },
  { id: 2, value: 'round_robin', displayValue: 'Round Robin', level: 'basic' },
  { id: 3, value: 'group_playoff', displayValue: 'Group Playoff', level: 'advanced' },
];

const getTournamentFormatOptions = (level: string) => {
  if (level === 'basic') {
    return tournamentFormatOptions.filter((option) => option.level === 'basic');
  }
  return tournamentFormatOptions;
};

type FormType = {
  name: string;
  description: string;
  contactPersonName: string;
  contactNumber: string;
  contactEmail: string;
  startDate: string;
  endDate: string;
  registrationDueDate: string;
  gender: Gender;
  format: TournamentFormat;
  maxParticipants: number;
  participantType: ParticipantType;
  playersBornAfterDate: string;
  address: string;
  groupId?: number;
};

interface FormCreateProps {
  selectedPackage: UserPackage;
  setSelectedPackage: any;
}

export default function FormCreateTournament({ selectedPackage, setSelectedPackage }: FormCreateProps) {
  const navigate = useNavigate();
  const [requestCreateTournament, { isLoading }] = useCreateTournamentMutation();
  const [getMyGroups, { isLoading: fetchingMyGroupsData }] = useLazyGetMyGroupsQuery();

  const [myGroupsData, setMyGroupsData] = useState<any>(null);
  const [initialized, setInitialized] = useState(false);

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const usedService = useMemo(() => {
    return getUsedTournamentService(selectedPackage);
  }, [selectedPackage]);

  const tournamentFormatOptionsWithLevel = useMemo(() => {
    if (usedService.config.level) {
      return getTournamentFormatOptions(usedService.config.level);
    }
    return [];
  }, [usedService.config.level]);

  const { handleSubmit, register, control, formState, getValues } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      contactPersonName: `${userInfo?.firstName} ${userInfo?.lastName}`,
      contactNumber: userInfo?.phoneNumber,
      contactEmail: userInfo?.email,
      startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T00:00:00',
      endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T23:59:59',
      registrationDueDate:
        new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T00:00:00',
      playersBornAfterDate: '1990-01-01T00:00:00',
      address: '',
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      let submitData = {} as TournamentPayload;
      if (usedService.config.level === TournamentLevel.BASIC) {
        submitData = {
          ...data,
          purchasedPackageId: selectedPackage.id,
          scope: TournamentScope.GROUP,
          groupId: 1,
        } as GroupTournamentPayload;
      } else if (usedService.config.level === TournamentLevel.ADVANCED) {
        submitData = {
          ...data,
          purchasedPackageId: selectedPackage.id,
          scope: TournamentScope.OPEN,
        } as OpenTournamentPayload;
      }

      await requestCreateTournament(submitData).unwrap();
      showSuccess('Created tournament successfully.');
      navigate('/tournaments');
    } catch (error) {
      // handled error
    }
  };

  const handleGoPreviousStep = () => {
    setSelectedPackage(null);
  };

  useEffect(() => {
    (async () => {
      if (usedService.config.level === TournamentLevel.BASIC) {
        const res = await getMyGroups().unwrap();
        console.log({ res });
        setMyGroupsData(res);
      }
      setInitialized(true);
    })();
  }, [getMyGroups, usedService.config.level]);

  if (!initialized) {
    return <CenterLoading />;
  }

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
        {usedService.config.level === TournamentLevel.BASIC && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Tournament for group</Typography>
            <Controller
              control={control}
              name="groupId"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.groupId}
                  sx={{ mt: 1 }}
                >
                  <FormLabel htmlFor="groupId">Choose group</FormLabel>
                  <Select
                    value={value}
                    id="groupId"
                    onChange={onChange}
                    aria-describedby="groupId-helper-text"
                  >
                    {myGroupsData.map((group: any) => (
                      <MenuItem
                        key={group.id}
                        value={group.id}
                      >
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText id="groupId-helper-text">{formError.groupId?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>
        )}
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
              defaultValue={tournamentFormatOptionsWithLevel[0].value as TournamentFormat}
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
                    {tournamentFormatOptionsWithLevel.map((tournamentOption) => (
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
              <FormLabel htmlFor="contactEmail">Max participants</FormLabel>
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
        </Stack>
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
    </Container>
  );
}
