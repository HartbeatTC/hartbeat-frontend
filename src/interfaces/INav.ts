interface NavLinks {
  name: string;
  path: string;
  active?: boolean;
  subLinks?: NavLinks[];
}

interface NavProps {
  user: User | null;
  handleLogout: () => void;
  handleAuthClick: () => void;
  profile: boolean;
  handleIconClick: () => void;
  navLinks: NavLinks[];
}
