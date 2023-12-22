import { JwtLoginView } from 'src/sections/auth/jwt';


import { APP_NAME_SHORT } from 'src/config-global';

// ----------------------------------------------------------------------

export const metadata = {
  title: `${APP_NAME_SHORT} | Login` ,
};

export default function LoginPage() {
  return <JwtLoginView />;
}
