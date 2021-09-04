import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import {
  InputField,
  RadioGroupField,
  SelectField,
} from 'components/FormFields';
import { cityActions, selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({
  initialValue,
  onSubmit,
}: StudentFormProps) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter name')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
        const parts = value.split(' ');
        return parts.filter((x) => !!x).length >= 2;
      }),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .required()
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .positive()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required()
      .typeError('Please enter a valid number'),
    gender: yup.string().oneOf(['male', 'female']).required(),
    city: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const cityOption = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <RadioGroupField
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        {Array.isArray(cityOption) && cityOption.length > 0 && (
          <SelectField
            label="City"
            name="city"
            control={control}
            options={cityOption}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} />}Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
