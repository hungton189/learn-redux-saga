import { Box } from '@material-ui/core';
import { InputField, RadioGroupField } from 'components/FormFields';
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
      </form>
    </Box>
  );
}
