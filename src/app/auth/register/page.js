import { JwtRegisterView } from 'src/sections/auth/jwt';
import { APP_NAME_SHORT } from 'src/config-global';
// ----------------------------------------------------------------------

export const metadata = {
  title: `${APP_NAME_SHORT} | Register`,
};

export default function RegisterPage() {
  return <JwtRegisterView />;
}
