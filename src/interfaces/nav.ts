interface NavLinks {
  name: string;
  path: string;
  active?: boolean;
  subLinks?: NavLinks[];
}
