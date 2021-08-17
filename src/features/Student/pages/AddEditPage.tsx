import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

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

  if (studentId) console.log(student);

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
    </Box>
  );
}
