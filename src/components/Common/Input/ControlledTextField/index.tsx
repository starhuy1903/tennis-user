import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

interface ControlledTextFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
  type?: 'text' | 'number';
  placeholder?: string;
}

const ControlledTextField = ({
  control,
  name,
  label = name,
  placeholder = label,
  type = 'text',
}: ControlledTextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <FormControl fullWidth>
          <FormLabel>{label}</FormLabel>
          <TextField
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
            helperText={error?.message || ' '}
            type={type}
          />
        </FormControl>
      )}
    />
  );
};

export default ControlledTextField;
