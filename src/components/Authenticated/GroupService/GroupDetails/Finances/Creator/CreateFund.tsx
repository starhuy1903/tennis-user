// import { DevTool } from '@hookform/devtools';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from 'store';

import SingleImagePicker from 'components/Common/Input/SingleImagePicker';
import { MemberRole } from 'constants/group';
import { useCreateFundMutation } from 'store/api/group/financeApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { CreateFundPayload } from 'types/expense';
import { MemberDto } from 'types/user';
import { showSuccess } from 'utils/toast';

import MemberList from './MemberList';

type FormType = CreateFundPayload;

type CreateFundProps = {
  onGoToIncomeTable: () => void;
  memberData: MemberDto[];
};

export default function CreateFund({ memberData, onGoToIncomeTable }: CreateFundProps) {
  const groupData = useAppSelector(selectGroup);
  const [createFundRequest, { isLoading }] = useCreateFundMutation();

  const renderMemberList = useMemo(
    () => memberData.filter((member) => member.role === MemberRole.MEMBER),
    [memberData]
  );

  const {
    control,
    register,
    formState: { errors: formError },
    getValues,
    setValue,
    watch,
    handleSubmit,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
      qrImage: '',
      paymentInfo: '',
      dueDate: dayjs().add(7, 'day').endOf('day').toISOString(),
      isFullMember: false,
      memberListId: [],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const submittedData: CreateFundPayload = {
        ...data,
        amount: Number(data.amount),
        memberListId: data.isFullMember ? [] : data.memberListId,
      };

      await createFundRequest({ groupId: groupData.id, ...submittedData }).unwrap();
      showSuccess('Created fund successfully.');
      onGoToIncomeTable();
    } catch (error) {
      // handled error
    }
  });

  return (
    <Stack>
      <Box display="flex">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          onClick={onGoToIncomeTable}
        >
          Back
        </Button>
      </Box>
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
          Add fund
        </Typography>

        {/* <Alert
    severity="info"
    sx={{ mb: 1 }}
  >
    Use this payment information to prompt participants for fee payment and monitor their payment statuses. If you
    collect the fee in person, you may bypass this form.
  </Alert> */}

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
              error={!!formError.title}
            >
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                {...register('title', {
                  required: 'The title is required.',
                })}
                required
                id="title"
                error={!!formError.title}
                aria-describedby="title-helper-text"
                size="small"
              />
              <FormHelperText id="title-helper-text">{formError.title?.message}</FormHelperText>
            </FormControl>
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
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
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
                placeholder="Describe the fund here."
              />
              <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              error={!!formError.paymentInfo}
            >
              <FormLabel>Payment description</FormLabel>
              <TextField
                {...register('paymentInfo', {
                  required: 'The payment description is required.',
                })}
                id="paymentInfo"
                error={!!formError.paymentInfo}
                aria-describedby="paymentInfo-helper-text"
                multiline
                rows={3}
                placeholder="Describe the payment method here."
              />
              <FormHelperText id="description-helper-text">{formError.paymentInfo?.message}</FormHelperText>
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Stack
              gap={1}
              width="100%"
            >
              <Controller
                name="isFullMember"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Apply for all members"
                    checked={value}
                    onChange={(_, checked) => {
                      onChange(checked);
                      setValue('memberListId', []);
                    }}
                  />
                )}
              />

              <Controller
                name="memberListId"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <MemberList
                    memberData={renderMemberList}
                    selectedMembers={value}
                    onSelectedMembersChange={onChange}
                    selectedAll={watch('isFullMember')}
                  />
                )}
              />
            </Stack>
            <Controller
              name="qrImage"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  fullWidth
                  error={!!formError.dueDate}
                >
                  <SingleImagePicker
                    label="Payment QR Code (optional)"
                    imageUrl={value}
                    handleUpload={onChange}
                    handleRemove={() => {
                      onChange('');
                    }}
                    imageAspect={1}
                    imageSxStyle={{ width: '200px', height: '200px' }}
                  />
                  <FormHelperText>{formError.qrImage?.message}</FormHelperText>
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
              Create fund
            </Button>
          </Box>
          {/* <DevTool control={control} /> */}
        </Box>
      </Paper>
    </Stack>
  );
}
