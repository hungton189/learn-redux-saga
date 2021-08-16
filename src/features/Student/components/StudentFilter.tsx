import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];
  onChange?: (newFilter: ListParams) => void;
  onChangeSearch?: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    margin: theme.spacing(1),
  },
}));
export default function StudentFilter({
  filter,
  cityList,
  onChange,
  onChangeSearch,
}: StudentFilterProps) {
  const classes = useStyles();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChangeSearch) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onChangeSearch(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            className={classes.margin}
            variant="outlined"
            size="small"
          >
            <InputLabel htmlFor="search-by-name">Search by name</InputLabel>
            <OutlinedInput
              id="search-by-name"
              onChange={handleSearchChange}
              endAdornment={<Search />}
              labelWidth={60}
              label="Search by name"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
