import { Box, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';
import React from 'react';
import { capitalizedString, getMarkColor } from 'utils';

export interface StudentTableProps {
  studentList: Student[];
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
}

const useStyles = makeStyles((theme) => ({
  table: {
    // minWidth: 650,
  },
  editButton: {
    marginRight: theme.spacing(1),
  },
}));

export default function StudentTable({
  studentList,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" align="center">
                {idx + 1}
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizedString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)}>{student.mark}</Box>
              </TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(student)}
                  className={classes.editButton}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => onRemove(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
