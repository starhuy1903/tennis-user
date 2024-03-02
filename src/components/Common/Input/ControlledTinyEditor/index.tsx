import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Control, Controller } from 'react-hook-form';

import TinyEditor from '../TinyEditor';

interface ControlledTinyEditorProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
}

const ControlledTinyEditor = ({ control, name, label = name, placeholder = label }: ControlledTinyEditorProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl fullWidth>
          <FormLabel>{label}</FormLabel>
          <TinyEditor
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
          />
        </FormControl>
      )}
    />
  );
};

export default ControlledTinyEditor;
