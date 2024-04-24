import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DescriptionIcon from '@mui/icons-material/Description';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <EqualizerIcon />,
  },
  {
    title: 'Document',
    path: '/document',
    icon: <DescriptionIcon />,
  },
  {
    title: 'login',
    path: '/login',
    icon: <LoginIcon />,
  },
  {
    title: 'register',
    path: '/register',
    icon: <AppRegistrationIcon />,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: <ReportProblemIcon />,
  },
];

export default navConfig;
