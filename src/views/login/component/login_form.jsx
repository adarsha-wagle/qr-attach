import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import { loginRestaurantAsync } from 'src/redux/authSlice';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function LoginForm() {
  //   const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const isLoginLoading = useSelector((state) => state.auth.isLoginLoading);

  function handleLogin(e) {
    e.preventDefault();
    const data = {
      phoneNumber,
      password,
    };
    dispatch(loginRestaurantAsync(data)).then((res) => {
      if (loginRestaurantAsync.fulfilled.match(res)) {
        router.push('/');
      }
    });
  }

  return (
    <Box sx={{ flexGrow: '1' }}>
      <form onSubmit={handleLogin}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 'md',
            }}
          >
            <Typography variant="h4">Sign in to QR Food</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Don’t have an account?
              <Link to="/register" style={{ marginLeft: '8px' }}>
                Get started
              </Link>
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <Stack spacing={3}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              <TextField
                name="password"
                label="Password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ my: 3 }}
            >
              {isLoginLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Card>{' '}
        </Stack>
      </form>
    </Box>
  );
}
