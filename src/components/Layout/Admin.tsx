import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Sidebar } from 'components/Common';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from 'features/Dashboard';
import Student from 'features/Student';

interface AdminLayoutProps {}
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export default function AdminLayout(props: AdminLayoutProps): ReactElement {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/students">
            <Student />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
