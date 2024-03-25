import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

interface ControlledTextFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type?: 'text' | 'number';
  placeholder?: string;
  textfieldProps?: TextFieldProps;
}

const ControlledTextField = ({
  control,
  name,
  label = name,
  placeholder = label,
  type = 'text',
  textfieldProps,
}: ControlledTextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl
          fullWidth
          error={!!error}
        >
          <FormLabel>{label}</FormLabel>
          <TextField
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            helperText={error?.message || ' '}
            FormHelperTextProps={{ sx: { color: (theme) => (error ? theme.palette.error.main : 'transparent') } }}
            type={type}
            {...textfieldProps}
          />
        </FormControl>
      )}
    />
  );
};

export default ControlledTextField;
