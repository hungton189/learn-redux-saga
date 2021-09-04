import { yupResolver } from '@hookform/resolvers/yup';
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
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
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
        <input type="submit" />
      </form>
    </Box>
  );
}
