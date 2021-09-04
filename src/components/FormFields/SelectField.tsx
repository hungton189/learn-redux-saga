import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: number | string;
}
export interface SelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  disable?: boolean;
  options: SelectOption[];
}

export function SelectField({
  name,
  control,
  label,
  disable,
  options,
}: SelectProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      disabled={disable}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        <MenuItem value="">All</MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
