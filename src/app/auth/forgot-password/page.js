import { JwtForgotPasswordView } from 'src/sections/auth/jwt';
import { APP_NAME_SHORT } from 'src/config-global';

// ----------------------------------------------------------------------

export const metadata = {
  title: `${APP_NAME_SHORT} | Forgot Password`,
};

export default function ForgotPasswordPage() {
  return <JwtForgotPasswordView />; 
}
