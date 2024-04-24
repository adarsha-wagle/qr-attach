import React from 'react';

import { Box } from '@mui/material';

import LoginForm from './login_form';

function LoginMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <LoginForm />
    </Box>
  );
}

export default LoginMain;
