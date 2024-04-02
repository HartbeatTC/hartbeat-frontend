interface NavLinks {
  name: string;
  path: string;
  active?: boolean;
  subLinks?: NavLinks[];
}

export function navLinks(): NavLinks[] {
  return [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: 'Team',
      path: '/team',
      active: true,
      subLinks: [
        {
          name: 'Men',
          path: '/team/men',
        },
        {
          name: 'Women',
          path: '/team/women',
        },
        {
          name: 'Non-Binary',
          path: '/team/non-binary',
        },
        {
          name: 'Masters',
          path: '/team/masters',
        },
      ],
    },
    {
      name: 'Schedule',
      path: '/schedule',
      active: true,
    },
    {
      name: 'Results',
      path: '/results',
      active: true,
      subLinks: [
        {
          name: '2020',
          path: '/results/2020',
        },
        {
          name: '2021',
          path: '/results/2021',
        },
        {
          name: '2022',
          path: '/results/2022',
        },
        {
          name: '2023',
          path: '/results/2023',
        },
      ],
    },
    {
      name: 'Track Is Back',
      path: '/track-is-back',
      active: true,
    },
    {
      name: 'Coaching',
      path: '/coaching',
      active: true,
    },
    {
      name: 'Contact',
      path: '/contact',
      active: true,
    },
  ];
}

export function authLinks(signedIn: boolean) {
  if (signedIn) {
    return [
      {
        name: 'Dashboard',
        path: '/my-account',
      },
      {
        name: 'Logout',
        path: '/',
      },
    ];
  } else {
    return [
      {
        name: 'Login',
        path: '/login',
      },
      {
        name: 'Sign Up',
        path: '/signup',
      },
    ];
  }
}
