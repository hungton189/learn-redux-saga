import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const history = useHistory();

  useEffect(() => {
    if (!studentId) return;

    // IFFE function
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student detail', error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    }
    await studentApi.add(formValues);
    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to="/admin/students" style={{ textDecoration: 'none' }}>
        <Typography
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft />
          Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? 'Edit student' : 'Add new student'}
      </Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValue={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
