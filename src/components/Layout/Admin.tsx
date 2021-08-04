import { Button } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React, { ReactElement } from 'react';

interface AdminLayoutProps {}

export default function AdminLayout(props: AdminLayoutProps): ReactElement {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      <Button color="primary" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
}
