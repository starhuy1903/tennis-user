// import { DevTool } from '@hookform/devtools';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import PolylineIcon from '@mui/icons-material/Polyline';
import {
  Box,
  Button,
  Chip,
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
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import { TournamentFormat, TournamentFormatOptions } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useGenerateFixtureMutation } from 'store/api/tournament/creator/fixture';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { CreateFixtureRequest, FixtureResponse, GeneratedGroup } from 'types/tournament-fixtures';

import GenerateGroup from './GenerateGroup';
import GroupDataTable from './GroupDataTable';

type FormType = CreateFixtureRequest;

// const tournamentFormatOptions = [
//   { id: 1, value: 'knockout', displayValue: 'Knockout', level: 'basic' },
//   { id: 2, value: 'round_robin', displayValue: 'Round Robin', level: 'basic' },
//   { id: 3, value: 'group_playoff', displayValue: 'Group Playoff', level: 'advanced' },
// ];

// const getDisplayFormatText = (format: TournamentFormat) => {
//   return tournamentFormatOptions.find((option) => option.value === format)?.displayValue;
// };

type SetupFixtureProps = {
  fixtureConfig: CreateFixtureRequest | null;
  setFixtureData: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
  setFixtureConfig: React.Dispatch<React.SetStateAction<CreateFixtureRequest | null>>;
};

export default function SetupFixture({ fixtureConfig, setFixtureData, setFixtureConfig }: SetupFixtureProps) {
  const tournamentData = useAppSelector(selectTournamentData);
  const [generateFixtureRequest, { isLoading: generatingFixture }] = useGenerateFixtureMutation();

  const [groupPlayoff, setGroupPlayoff] = useState<GeneratedGroup[] | null>(null);

  const { register, control, formState, getValues, handleSubmit } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      fixtureStartDate: fixtureConfig?.fixtureStartDate || dayjs().toISOString(),
      fixtureEndDate: fixtureConfig?.fixtureEndDate || dayjs().add(1, 'day').toISOString(),
      matchesStartTime: fixtureConfig?.matchesStartTime || dayjs('2022-04-17T08:00').toISOString(),
      matchesEndTime: fixtureConfig?.matchesEndTime || dayjs('2022-04-17T20:00').toISOString(),
      matchDuration: fixtureConfig?.matchDuration || 30,
      breakDuration: fixtureConfig?.breakDuration || 10,
    },
  });

  const { errors: formError } = formState;

  const handleGenerateGroup = useCallback(
    (data: GeneratedGroup[] | null) => {
      setGroupPlayoff(data);
      setFixtureData({ status: FixtureStatus.NEW });
    },
    [setFixtureData]
  );

  const handleGenerateFixtures = handleSubmit(async (data) => {
    const groups =
      tournamentData.format === TournamentFormat.GROUP_PLAYOFF
        ? groupPlayoff?.map((group) => ({
            ...group,
            teams: group.teams.map((team) => team.id),
          }))
        : undefined;

    try {
      const submittedData = {
        ...data,
        matchDuration: Number(data.matchDuration),
        format: tournamentData.format,
        venue: tournamentData.address,
        groups,
      };
      const res = await generateFixtureRequest({
        tournamentId: tournamentData.id,
        body: submittedData,
      }).unwrap();
      setFixtureConfig(submittedData);
      setFixtureData(res);
    } catch (error) {
      // handled error
    }
  });

  const shouldRenderDateTimeConfig = tournamentData.format !== TournamentFormat.GROUP_PLAYOFF || groupPlayoff;

  return (
    <Paper
      sx={{
        padding: 4,
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: 4,
        marginBottom: 8,
      }}
      elevation={1}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        Setup fixture
      </Typography>

      <Stack
        gap={2}
        direction="row"
      >
        <Chip
          icon={<EmojiEventsIcon />}
          label={TournamentFormatOptions[tournamentData.format]}
          color="warning"
          variant="outlined"
        />
        <Chip
          icon={<PeopleIcon />}
          label={`${tournamentData.participants}/${tournamentData.maxParticipants} participants`}
          color="warning"
          variant="outlined"
        />
      </Stack>

      <Stack
        alignItems="center"
        component="form"
      >
        {tournamentData.format === TournamentFormat.GROUP_PLAYOFF && (
          <Box
            mt={2}
            alignSelf="start"
            width="100%"
          >
            <GenerateGroup
              tournamentId={tournamentData.id}
              setGroupData={handleGenerateGroup}
            />
            {groupPlayoff && <GroupDataTable groups={groupPlayoff} />}
          </Box>
        )}
        {shouldRenderDateTimeConfig && (
          <>
            <Stack
              direction="row"
              justifyItems="start"
              justifyContent="space-between"
              width="100%"
              mt={4}
              gap={4}
            >
              <Box width="100%">
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
                              disabled={generatingFixture}
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
                              disabled={generatingFixture}
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
                              disabled={generatingFixture}
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
                                onChange(value);
                              }}
                              disabled={generatingFixture}
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
                        disabled={generatingFixture}
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
                        disabled={generatingFixture}
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
            <Box
              display="flex"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                variant="contained"
                onClick={handleGenerateFixtures}
                sx={{ mt: 4 }}
                disabled={generatingFixture}
                startIcon={<PolylineIcon />}
              >
                Generate fixture
              </Button>
            </Box>
          </>
        )}
      </Stack>
      {/* Only open when dev */}
      {/* <DevTool control={control} /> */}
    </Paper>
  );
}
