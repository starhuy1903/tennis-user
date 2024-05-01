import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';

import { TournamentFormat } from 'constants/tournament';

type FormType = {
  format: TournamentFormat;
  numberOfRounds: number;
  numberOfParticipants: number;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number; // in minutes
};

const tournamentFormatOptions = [
  { id: 1, value: 'knockout', displayValue: 'Knockout', level: 'basic' },
  { id: 2, value: 'round_robin', displayValue: 'Round Robin', level: 'basic' },
  { id: 3, value: 'group_playoff', displayValue: 'Group Playoff', level: 'advanced' },
];

export default function SetupFixture() {
  const { register, control, formState, getValues } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      numberOfParticipants: 0,
      numberOfRounds: 1,
      // matchesStartTime
      matchDuration: 30,
      breakDuration: 10,
    },
  });

  const { errors: formError } = formState;

  const handleGenerateFixtures = () => ({});

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        alignItems="center"
        component="form"
      >
        <Typography variant="h4">SETUP FIXTURE</Typography>
        {/* Setup configuration */}
        <Paper
          sx={{ width: '100%', p: 2, mt: 2 }}
          elevation={3}
        >
          <Stack>
            <Typography variant="h6">Fixture configuration</Typography>
            <Stack
              spacing={2}
              paddingX={8}
            >
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
                  error={!!formError.numberOfParticipants}
                >
                  <FormLabel htmlFor="numberOfParticipants">Number of participants</FormLabel>
                  <TextField
                    {...register('numberOfParticipants', {
                      required: 'The max participants is required.',
                    })}
                    required
                    type="number"
                    id="numberOfParticipants"
                    error={!!formError.numberOfParticipants}
                    aria-describedby="numberOfParticipants-helper-text"
                  />
                  <FormHelperText id="numberOfParticipants-helper-text">
                    {formError.numberOfParticipants?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack>
                <FormControl
                  fullWidth
                  error={!!formError.numberOfRounds}
                >
                  <FormLabel htmlFor="numberOfRounds">Number of rounds</FormLabel>
                  <TextField
                    {...register('numberOfRounds', {
                      required: 'The max participants is required.',
                    })}
                    required
                    type="number"
                    id="numberOfRounds"
                    error={!!formError.numberOfRounds}
                    aria-describedby="numberOfRounds-helper-text"
                  />
                  <FormHelperText id="numberOfRounds-helper-text">{formError.numberOfRounds?.message}</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack
          direction="row"
          justifyItems="start"
          justifyContent="start"
          width="100%"
          mt={4}
        >
          <Box>
            <Typography variant="h6">Date & Time Configuration</Typography>
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={2}
              >
                <Controller
                  control={control}
                  name="fixtureStartDate"
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
                      error={!!formError.fixtureStartDate}
                    >
                      <FormLabel htmlFor="fixtureStartDate">Fixture start date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(date) => {
                            onChange(date?.toISOString());
                          }}
                          disablePast
                          defaultValue={dayjs(getValues('fixtureStartDate'))}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                      <FormHelperText id="fixtureStartDate-helper-text">
                        {formError.fixtureStartDate?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="fixtureEndDate"
                  rules={{
                    required: 'The end date is required.',
                    validate: (value) => {
                      const startDate = dayjs(getValues('fixtureStartDate'));
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
                      error={!!formError.fixtureEndDate}
                    >
                      <FormLabel htmlFor="fixtureEndDate">Fixture end date</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={(date) => {
                            onChange(date?.toISOString());
                          }}
                          disablePast
                          defaultValue={dayjs(getValues('fixtureEndDate'))}
                          format="DD/MM/YYYY"
                        />
                      </LocalizationProvider>
                      <FormHelperText id="fixtureEndDate-helper-text">
                        {formError.fixtureEndDate?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <Controller
                  control={control}
                  name="matchesStartTime"
                  render={({ field: { onChange } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.matchesStartTime}
                    >
                      <FormLabel htmlFor="matchesStartTime">Matches start time</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          defaultValue={dayjs('2022-04-17T08:00')}
                          onChange={onChange}
                        />
                      </LocalizationProvider>
                      <FormHelperText id="matchesStartTime-helper-text">
                        {formError.matchesStartTime?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="matchesEndTime"
                  render={({ field: { onChange } }) => (
                    <FormControl
                      fullWidth
                      error={!!formError.matchesEndTime}
                    >
                      <FormLabel htmlFor="matchesEndTime">Matches end time</FormLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          defaultValue={dayjs('2022-04-17T20:00')}
                          onChange={(value) => {
                            console.log('value', value);

                            onChange(value);
                          }}
                        />
                      </LocalizationProvider>
                      <FormHelperText id="matchesEndTime-helper-text">
                        {formError.matchesEndTime?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={2}
              >
                <FormControl
                  fullWidth
                  error={!!formError.matchDuration}
                >
                  <FormLabel htmlFor="matchDuration">Match duration (in minutes)</FormLabel>
                  <TextField
                    {...register('matchDuration', {
                      required: 'The match duration is required.',
                    })}
                    required
                    type="number"
                    id="matchDuration"
                    error={!!formError.matchDuration}
                    aria-describedby="matchDuration-helper-text"
                  />
                  <FormHelperText id="matchDuration-helper-text">{formError.matchDuration?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  error={!!formError.breakDuration}
                >
                  <FormLabel htmlFor="breakDuration">Break time between matches</FormLabel>
                  <Select
                    defaultValue={10}
                    {...register('breakDuration', {
                      required: 'The break duration is required.',
                    })}
                    required
                    id="breakDuration"
                    error={!!formError.breakDuration}
                    aria-describedby="breakDuration-helper-text"
                  >
                    {[...Array(13).keys()].map((_, index) => {
                      const minutes = (index + 1) * 5;
                      return (
                        <MenuItem
                          key={minutes}
                          value={minutes}
                        >
                          {minutes} mins
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText id="breakDuration-helper-text">{formError.breakDuration?.message}</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Button
          variant="contained"
          onClick={handleGenerateFixtures}
          sx={{ mt: 4 }}
        >
          Generate fixtures
        </Button>
      </Stack>
      {/* Only open when dev */}
      <DevTool control={control} />
    </Paper>
  );
}
