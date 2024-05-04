import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'overview',
    title: 'Overview',
    href: paths.dashboard.overview,
    icon: 'chart-pie',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'settings',
    title: 'Settings',
    href: paths.dashboard.settings,
    icon: 'gear-six',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  { key: 'account',
    title: 'Account',
    href: paths.dashboard.account,
    icon: 'user',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'add-food',
    title: 'Add Food',
    href: paths.dashboard.add_food,
    icon: 'plus-square',
    roles: ['Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'search-food',
    title: 'Search Food',
    href: paths.dashboard.search_food,
    icon: 'search',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'confirm-food',
    title: 'Confirm Food',
    href: paths.dashboard.confirm_food,
    icon: 'confirm',
    roles: ['AcademicianDietitian', 'Admin'],
  },
  {
    key: 'add-meal',
    title: 'Add Meal',
    href: paths.dashboard.add_meal,
    icon: 'meal',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'my-reports',
    title: 'My Reports',
    href: paths.dashboard.my_reports,
    icon: 'report',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'admin-dietitian-confirm',
    title: 'Confirm Dietitian User',
    href: paths.dashboard.confirm_dietitian,
    icon: 'admin-confirm',
    roles: ['Admin'],
  },
  {
    key: 'advisee-management',
    title: 'Danışan Yönetimi',
    href: paths.dashboard.advisee_management,
    icon: 'advisee-management',
    roles: ['Admin'],
  },


  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
