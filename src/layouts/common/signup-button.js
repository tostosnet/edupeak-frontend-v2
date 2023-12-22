import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function SignupButton({ sx }) {
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} variant="contained" sx={{ ...sx }}>
      Signup
    </Button>
  );
}

SignupButton.propTypes = {
  sx: PropTypes.object,
};
