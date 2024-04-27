import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  {key: 'add-food', title: 'Add Food', href: paths.dashboard.add_food, icon: 'plus-square'},
  {key: 'search-food', title: 'Search Food', href: paths.dashboard.search_food, icon: 'search'},
  {key: 'confirm-food', title: 'Confirm Food', href: paths.dashboard.confirm_food, icon: 'confirm'},
  {key: 'add-meal', title: 'Add Meal', href: paths.dashboard.add_meal, icon: 'meal'},
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
