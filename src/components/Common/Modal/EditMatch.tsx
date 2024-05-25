import { FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { EditMatchPayload } from 'types/match';

import BaseModal from './BaseModal';
import { EditMatchProps } from './types';

type FormType = Omit<EditMatchPayload, 'id'>;

export default function EditMatch({ match, referees, teamData, onUpdate, onModalClose }: EditMatchProps) {
  const { handleSubmit, control, formState, register, getValues, watch } = useForm<FormType>({
    defaultValues: {
      name: match.title,
      dateTime: match.matchStartDate || '',
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

  const renderBody = () => {
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
                    {teamData
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
                    {teamData
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
          {/* Date time */}
          <Controller
            control={control}
            name="dateTime"
            rules={{
              required: 'The date time is required.',
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.dateTime}
              >
                <FormLabel htmlFor="dateTime">Date time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    disablePast
                    defaultValue={dayjs(getValues('dateTime'))}
                    format="DD/MM/YYYY HH:mm"
                  />
                </LocalizationProvider>
                <FormHelperText id="dateTime-helper-text">{formError.dateTime?.message}</FormHelperText>
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
                  {referees.map((option) => (
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
          {/* Start time */}
          {/* <Controller
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
          /> */}
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
    />
  );
}
