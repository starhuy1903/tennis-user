import { DevTool } from '@hookform/devtools';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { isEqual } from 'lodash-es';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { useUpdateGroupTournamentMutation } from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData, shouldRefreshGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { UpdateGroupTournamentPayload } from 'types/tournament';
import { checkGeneratedFixture, checkPublishedTournament } from 'utils/group-tournament';
import { showSuccess } from 'utils/toast';

const tournamentFormatOptions = [
  { id: 1, value: 'knockout', displayValue: 'Knockout', level: 'basic' },
  { id: 2, value: 'round_robin', displayValue: 'Round Robin', level: 'basic' },
];

export default function UpdateGroupTournament({ onCloseForm }: { onCloseForm: () => void }) {
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);

  const [requestUpdateTournament, { isLoading: updatingData }] = useUpdateGroupTournamentMutation();

  const hasPublishedTournament = checkPublishedTournament(tournamentData.phase);
  const hasGeneratedFixture = checkGeneratedFixture(tournamentData.phase);

  const { handleSubmit, register, control, formState, getValues, watch } = useForm<UpdateGroupTournamentPayload>({
    mode: 'onTouched',
    defaultValues: {
      name: tournamentData.name,
      description: tournamentData.description,
      address: tournamentData.address,
      image: tournamentData.image,
      format: tournamentData.format,
      startDate: tournamentData.startDate,
      endDate: tournamentData.endDate,
    },
  });

  const { errors: formError } = formState;
  const { id, participants, phase, status, isCreator, ...originalData } = tournamentData;

  const onSubmit: SubmitHandler<UpdateGroupTournamentPayload> = async (data) => {
    let updatedData: any = { ...data };

    if (tournamentData.phase === GroupTournamentPhase.PUBLISHED) {
      const { format, ...restData } = updatedData;
      updatedData = restData;
    }

    if (
      [
        GroupTournamentPhase.GENERATED_FIXTURES,
        GroupTournamentPhase.SCORED_MATCHES,
        GroupTournamentPhase.COMPLETED,
      ].includes(tournamentData.phase)
    ) {
      const { format, startDate, endDate, ...restData } = updatedData;
      updatedData = restData;
    }

    try {
      await requestUpdateTournament({
        groupId: groupData.id,
        tournamentId: tournamentData.id,
        payload: { ...updatedData },
      }).unwrap();

      showSuccess('Updated group tournament successfully.');
      dispatch(shouldRefreshGroupTournamentData(true));
      onCloseForm();
    } catch (error) {
      // handled error
    }
  };

  const disabledUpdateBtn = updatingData || isEqual(originalData, watch());

  return (
    <Box mt={4}>
      <Typography
        variant="h4"
        noWrap
        component="h4"
        sx={{
          display: 'flex',
          fontWeight: 700,
        }}
      >
        GROUP TOURNAMENT UPDATE FORM
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {/* Information */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6">Information</Typography>
          <Stack spacing={2}>
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
                disabled={updatingData}
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
                disabled={updatingData}
              />
              <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
            </FormControl>
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          {/* Timeline */}
          <Box sx={{ width: '50%' }}>
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
                      if (value !== originalData.startDate && startDate.isBefore(dayjs(), 'day')) {
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
                          disabled={updatingData || hasGeneratedFixture}
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
                          disabled={updatingData || hasGeneratedFixture}
                        />
                      </LocalizationProvider>
                      <FormHelperText id="endDate-helper-text">{formError.endDate?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>
          </Box>

          {/* Location address */}
          <Box sx={{ width: '25%' }}>
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
                disabled={updatingData || hasGeneratedFixture}
              />
              <FormHelperText id="address-helper-text">{formError.address?.message}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ width: '25%' }}>
            <Typography variant="h6">Tournament Settings</Typography>
            <Stack
              direction="row"
              spacing={2}
            >
              <Controller
                control={control}
                name="format"
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
                      disabled={updatingData || hasPublishedTournament}
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
            </Stack>
          </Box>
        </Stack>

        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SingleImagePicker
              label="Upload a background image for your tournament"
              imageUrl={value}
              handleUpload={onChange}
              handleRemove={() => {
                onChange('');
              }}
              disabled={updatingData}
            />
          )}
        />

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
            disabled={updatingData}
            onClick={onCloseForm}
            sx={{ mt: 4 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={disabledUpdateBtn}
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 4 }}
          >
            {updatingData ? 'Updating...' : 'Update'}
          </Button>
        </Box>
      </Box>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
}
