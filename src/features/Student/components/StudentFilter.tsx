import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import React, { ChangeEvent } from 'react';
import { useRef } from 'react';

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
  const searchRef = useRef<HTMLInputElement>();

  const classes = useStyles();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChangeSearch) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onChangeSearch(newFilter);
  };

  const handleCityChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value !== '' ? e.target.value : undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (
    e: ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    if (!onChange) return;
    const { value } = e.target;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      name_like: undefined,
      city: undefined,
      _sort: undefined,
      _order: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
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
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            className={classes.margin}
          >
            <InputLabel id="filter-by-city">Filter by City</InputLabel>
            <Select
              labelId="filter-by-city"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by City"
            >
              <MenuItem value="">All</MenuItem>
              {cityList.map((city) => (
                <MenuItem value={city.code} key={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            className={classes.margin}
          >
            <InputLabel id="sort">Sort</InputLabel>
            <Select
              labelId="sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="">No sort</MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClearFilter}
            className={classes.margin}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
