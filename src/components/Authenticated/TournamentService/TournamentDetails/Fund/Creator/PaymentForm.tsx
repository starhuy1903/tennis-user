import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { useCreatePaymentInfoMutation } from 'store/api/tournament/creator/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { PaymentInfoPayload } from 'types/tournament/fund';
import { showSuccess } from 'utils/toast';

export const units = [
  {
    label: 'VND',
    value: 'vnd',
  },
  {
    label: 'USD',
    value: 'usd',
  },
];

type FormType = {
  amount: string;
  unit: string;
  image: string;
  method: string;
  paymentDescription: string;
  reminderDate: string;
  dueDate: string;
};

export default function PaymentForm({ onAddPaymentInfo }: { onAddPaymentInfo: (data: PaymentInfoPayload) => void }) {
  const tournamentData = useAppSelector(selectTournamentData);
  const [addPaymentInfoRequest, { isLoading }] = useCreatePaymentInfoMutation();

  const { control, register, formState, getValues, handleSubmit } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      amount: '0',
      unit: units[0].value,
      image: '',
      method: '',
      paymentDescription: '',
      reminderDate: dayjs().add(1, 'day').startOf('day').toISOString(),
      dueDate: dayjs().add(4, 'day').endOf('day').toISOString(),
    },
  });

  const { errors: formError } = formState;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const submittedData: PaymentInfoPayload = {
        amount: Number(data.amount),
        unit: data.unit,
        payment: {
          method: data.method,
          information: data.paymentDescription,
          image: data.image,
        },
        reminderDate: data.reminderDate,
        dueDate: data.dueDate,
      };

      const res = await addPaymentInfoRequest({ tournamentId: tournamentData.id, submitData: submittedData }).unwrap();
      onAddPaymentInfo(res);
      showSuccess('Added payment information successfully.');
    } catch (error) {
      // handled error
    }
  });

  return (
    <Paper
      elevation={1}
      sx={{
        padding: 4,
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: 4,
        marginBottom: 8,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        Add payment information
      </Typography>

      <Alert
        severity="info"
        sx={{ mb: 1 }}
      >
        Use this payment information to prompt participants for fee payment and monitor their payment statuses. If you
        collect the fee in person, you may bypass this form.
      </Alert>

      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.amount}
          >
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <TextField
              {...register('amount', {
                required: 'The amount is required.',
              })}
              required
              id="amount"
              error={!!formError.amount}
              aria-describedby="amount-helper-text"
              size="small"
            />
            <FormHelperText id="amount-helper-text">{formError.amount?.message}</FormHelperText>
          </FormControl>
          <Controller
            control={control}
            name="unit"
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                error={!!formError.unit}
              >
                <FormLabel htmlFor="unit">Unit</FormLabel>
                <Select
                  value={value}
                  id="unit"
                  onChange={onChange}
                  aria-describedby="unit-helper-text"
                  size="small"
                >
                  {units.map((unit) => (
                    <MenuItem
                      key={unit.value}
                      value={unit.value}
                    >
                      {unit.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText id="unit-helper-text">{formError.unit?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <Controller
            control={control}
            name="reminderDate"
            rules={{
              required: 'The reminder date is required.',
              validate: (value) => {
                const reminderDate = dayjs(value);
                if (reminderDate.isBefore(dayjs(), 'day')) {
                  return 'The reminder date cannot be in the past.';
                }
                return true;
              },
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.reminderDate}
              >
                <FormLabel htmlFor="reminderDate">Reminder date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(getValues('reminderDate'))}
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    disablePast
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: 'small',
                        sx: {
                          backgroundColor: 'white',
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                <FormHelperText id="reminderDate-helper-text">{formError.reminderDate?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="dueDate"
            rules={{
              required: 'The due date is required.',
              validate: (value) => {
                const dueDate = dayjs(value);
                if (dueDate.isBefore(dayjs(), 'day')) {
                  return 'The due date cannot be in the past.';
                }
                return true;
              },
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.dueDate}
              >
                <FormLabel htmlFor="dueDate">Due date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date) => {
                      onChange(date?.toISOString());
                    }}
                    defaultValue={dayjs(getValues('dueDate'))}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: 'small',
                        sx: {
                          backgroundColor: 'white',
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
                <FormHelperText id="dueDate-helper-text">{formError.dueDate?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.unit}
          >
            <FormLabel htmlFor="method">Method</FormLabel>
            <TextField
              {...register('method', {
                required: 'The method is required.',
              })}
              required
              id="method"
              error={!!formError.method}
              aria-describedby="method-helper-text"
              placeholder="e.g. Bank"
              size="small"
            />
            <FormHelperText id="method-helper-text">{formError.method?.message}</FormHelperText>
          </FormControl>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
        >
          <FormControl
            fullWidth
            error={!!formError.paymentDescription}
          >
            <FormLabel>Payment description</FormLabel>
            <TextField
              {...register('paymentDescription', {
                required: 'The description is required.',
              })}
              id="paymentDescription"
              error={!!formError.paymentDescription}
              aria-describedby="paymentDescription-helper-text"
              multiline
              rows={7}
              placeholder="Describe the payment method here."
            />
            <FormHelperText id="description-helper-text">{formError.paymentDescription?.message}</FormHelperText>
          </FormControl>
          <Controller
            name="image"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl
                fullWidth
                error={!!formError.dueDate}
              >
                <SingleImagePicker
                  label="QR Code (optional)"
                  imageUrl={value}
                  handleUpload={onChange}
                  handleRemove={() => {
                    onChange('');
                  }}
                  imageAspect={1}
                  imageSxStyle={{ width: '200px', height: '200px' }}
                />
                <FormHelperText>{formError.image?.message}</FormHelperText>
              </FormControl>
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
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={onSubmit}
            startIcon={<AddIcon />}
          >
            Add payment
          </Button>
        </Box>
        {/* <DevTool control={control} /> */}
      </Box>
    </Paper>
  );
}
