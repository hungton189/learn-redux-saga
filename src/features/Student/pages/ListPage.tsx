import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(3),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const onEdit = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };
  const onRemove = async (student: Student) => {
    try {
      await studentApi.remove(student.id || '');
      // trigger to re-fetch student list with current filter
      dispatch(studentActions.setFilter({ ...filter }));
    } catch (error) {
      //toast error to user
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };
  const onChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const onChangeSearch = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithSaga(newFilter));
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box my={2}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onChange={onChange}
          onChangeSearch={onChangeSearch}
        />
      </Box>
      <StudentTable
        studentList={studentList}
        onEdit={onEdit}
        onRemove={onRemove}
        cityMap={cityMap}
      />
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
