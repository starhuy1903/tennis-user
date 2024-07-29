// import { DevTool } from '@hookform/devtools';
import { Autocomplete, Chip, FormControl, FormHelperText, FormLabel, Stack, TextField } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { Controller, useForm } from 'react-hook-form';

import { useCreateExpenseMutation } from 'store/api/group/financeApiSlice';
import { showSuccess } from 'utils/toast';

import BaseModal from './BaseModal';
import { AddExpenseProps } from './types';

const expenseOptions = [
  {
    label: 'Court Maintenance',
    value: 'court_maintenance',
  },
  {
    label: 'Venue Rental',
    value: 'venue_rental',
  },
  {
    label: 'Equipment Rental',
    value: 'equipment_rental',
  },
];

type FormType = {
  categories: string[];
  type: 'expense';
  amount: number;
  description: string;
};

export default function AddExpense({ groupId, onModalClose }: AddExpenseProps) {
  const confirm = useConfirm();
  const [createExpenseRequest, { isLoading: creatingExpense }] = useCreateExpenseMutation();
  const {
    handleSubmit,
    register,
    formState: { errors: formError },
    control,
  } = useForm<FormType>({
    mode: 'onTouched',
    defaultValues: {
      categories: [],
      amount: 0,
      description: '',
    },
  });

  const handleAddExpense = handleSubmit((data) => {
    confirm({ title: 'Are you sure you want to add this expense?' }).then(async () => {
      try {
        await createExpenseRequest({ groupId, ...data }).unwrap();
        showSuccess('Added expense successfully.');
        onModalClose();
      } catch (error) {
        // handle error
      }
    });
  });

  const renderBody = () => {
    return (
      <Stack
        component="form"
        autoComplete="off"
        sx={{
          gap: '10px',
          maxHeight: '400px',
        }}
      >
        <Stack gap={2}>
          <Controller
            name="categories"
            control={control}
            rules={{
              validate: (value) => {
                if (value.length === 0) {
                  return 'The categories are required.';
                }
              },
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                fullWidth
                error={!!formError.categories}
              >
                <Autocomplete
                  disabled={creatingExpense}
                  multiple
                  id="expense-categories"
                  options={expenseOptions.map((option) => option.label)}
                  onChange={(_, value) => {
                    onChange(value);
                  }}
                  freeSolo
                  renderTags={(tagList: readonly string[], getTagProps) =>
                    tagList.map((option: string, index: number) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Categories"
                        placeholder="Categories"
                      />
                    );
                  }}
                />

                <FormHelperText id="expense-categories-helper-text">{formError.categories?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <FormControl
            fullWidth
            error={!!formError.amount}
          >
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <TextField
              {...register('amount', {
                required: 'The amount is required.',
                validate: (value) => {
                  if (Number(value) <= 0) {
                    return 'The amount must be greater than 0.';
                  }
                  return true;
                },
              })}
              required
              id="amount"
              error={!!formError.amount}
              aria-describedby="amount-helper-text"
              disabled={creatingExpense}
            />
            <FormHelperText id="amount-helper-text">{formError.amount?.message}</FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            error={!!formError.description}
          >
            <FormLabel>Payment description</FormLabel>
            <TextField
              {...register('description', {
                required: 'The description is required.',
              })}
              id="description"
              error={!!formError.description}
              aria-describedby="description-helper-text"
              multiline
              rows={3}
              placeholder="Describe the expense here."
              disabled={creatingExpense}
            />
            <FormHelperText id="description-helper-text">{formError.description?.message}</FormHelperText>
          </FormControl>
        </Stack>
        {/* <DevTool control={control} /> */}
      </Stack>
    );
  };

  return (
    <BaseModal
      headerText="Add expense"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Add"
      onClickPrimaryButton={handleAddExpense}
      disabledPrimaryButton={creatingExpense}
    />
  );
}
