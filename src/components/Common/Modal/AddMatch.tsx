import { FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useGetTeamQuery } from 'store/api/tournament/creator/fixture';
import { useGetRefereesQuery } from 'store/api/tournament/creator/participant';

import CenterLoading from '../CenterLoading';
import BaseModal from './BaseModal';
import { AddMatchProps } from './types';

interface FormType {
  name: string;
  time: string;
  date: string;
  duration: number;
  team1Id: string;
  team2Id: string;
  refereeId: string;
}

export default function AddMatch({ tournamentId, match, onUpdate, onModalClose }: AddMatchProps) {
  const { data: teamData, isLoading: fetchingTeamData } = useGetTeamQuery(tournamentId, {
    refetchOnMountOrArgChange: true,
  });

  const { data: referees, isLoading: fetchingRefereeData } = useGetRefereesQuery(tournamentId);

  const { handleSubmit, control, formState, register, getValues, watch } = useForm<FormType>({
    defaultValues: {
      name: match.title,
      time: match.time,
      date: match.matchStartDate || '',
      duration: match.duration,
      refereeId: match.refereeId || '',
      team1Id: match.teams.team1?.id,
      team2Id: match.teams.team2?.id,
    },
  });

  const { errors: formError } = formState;

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const updatedData = { ...data, id: match.id, duration: Number(data.duration) };
    onUpdate(updatedData);
    onModalClose();
  };

  const isLoading = fetchingRefereeData || fetchingTeamData;

  const renderBody = () => {
    if (isLoading) {
      return <CenterLoading />;
    }

    return (
      <Stack
        component="form"
        spacing={2}
      >
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Team 1 */}
          <Stack sx={{ width: '100%' }}>
            <Controller
              control={control}
              name="team1Id"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.team1Id}
                >
                  <Select
                    value={value}
                    id="team1Id"
                    onChange={onChange}
                    aria-describedby="team1Id-helper-text"
                  >
                    {teamData?.data
                      .filter((option) => option.id !== watch('team2Id'))
                      .map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                        >
                          {option.user1.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText id="team1Id-helper-text">{formError.team1Id?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
          {/* Team 2 */}
          <Stack sx={{ width: '100%' }}>
            <Controller
              control={control}
              name="team2Id"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.team2Id}
                >
                  <Select
                    value={value}
                    id="team2Id"
                    onChange={onChange}
                    aria-describedby="team2Id-helper-text"
                  >
                    {teamData?.data
                      .filter((option) => option.id !== watch('team1Id'))
                      .map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                        >
                          {option.user1.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText id="team2Id-helper-text">{formError.team2Id?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Name */}
          <FormControl
            fullWidth
            error={!!formError.name}
          >
            <FormLabel htmlFor="name">Match Name</FormLabel>
            <TextField
              {...register('name', {
                required: 'The match name is required.',
                minLength: {
                  value: 3,
                  message: 'The name must be at least 3 characters.',
                },
              })}
              required
              id="name"
              error={!!formError.name}
              aria-describedby="name-helper-text"
              placeholder="Match name"
            />
            <FormHelperText id="name-helper-text">{formError.name?.message}</FormHelperText>
          </FormControl>
          {/* Date */}
          <Controller
            control={control}
            name="date"
            rules={{
              required: 'The date is required.',
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.date}
              >
                <FormLabel htmlFor="date">Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    disablePast
                    defaultValue={dayjs(getValues('date'))}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                <FormHelperText id="date-helper-text">{formError.date?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
        >
          {/* Duration */}
          <FormControl
            fullWidth
            error={!!formError.duration}
          >
            <FormLabel htmlFor="duration">Match duration (in minutes)</FormLabel>
            <TextField
              {...register('duration', {
                required: 'The match duration is required.',
              })}
              required
              type="number"
              id="duration"
              error={!!formError.duration}
              aria-describedby="duration-helper-text"
            />
            <FormHelperText id="duration-helper-text">{formError.duration?.message}</FormHelperText>
          </FormControl>
          {/* Start time */}
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.time}
              >
                <FormLabel htmlFor="time">Time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    onChange={onChange}
                    defaultValue={dayjs(getValues('time'))}
                  />
                </LocalizationProvider>
                <FormHelperText id="time-helper-text">{formError.time?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
        <Stack direction="row">
          <Controller
            control={control}
            name="refereeId"
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                error={!!formError.refereeId}
              >
                <FormLabel htmlFor="refereeId">Select referee</FormLabel>
                <Select
                  id="refereeId"
                  value={value}
                  onChange={onChange}
                  aria-describedby="refereeId-helper-text"
                >
                  {referees?.data.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id="refereeId-helper-text">{formError.refereeId?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <BaseModal
      size="md"
      headerText="Edit match"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Update"
      onClickPrimaryButton={handleSubmit(onSubmit)}
      disabledPrimaryButton={isLoading}
      disabledSecondaryButton={isLoading}
    />
  );
}
