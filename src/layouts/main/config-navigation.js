import { paths } from 'src/routes/paths';

import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Courses',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.product.root,
  },
  {
    title: 'About us',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.about,
  },
  {
    title: 'Blog',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.post.root,
  },
];
