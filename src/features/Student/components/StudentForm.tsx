import { Box } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import {
  InputField,
  RadioGroupField,
  SelectField,
} from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({
  initialValue,
  onSubmit,
}: StudentFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValue,
  });
  const cityOption = useAppSelector(selectCityOptions);
  const handleFormSubmit = (formValues: Student) => {
    console.log('submit', formValues);
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
        <SelectField
          label="City"
          name="city"
          control={control}
          options={cityOption}
        />
      </form>
    </Box>
  );
}
