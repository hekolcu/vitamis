import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  {
    key: 'overview',
    title: 'Gösterge Paneli',
    href: paths.dashboard.overview,
    icon: 'chart-pie',
    roles: ['Advisee'],
  },
  {
    key: 'settings',
    title: 'Ayarlarım',
    href: paths.dashboard.settings,
    icon: 'gear-six',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  { key: 'account',
    title: 'Profilim',
    href: paths.dashboard.account,
    icon: 'user',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'add-food',
    title: 'Yiyecek Ekle',
    href: paths.dashboard.add_food,
    icon: 'plus-square',
    roles: ['Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'search-food',
    title: 'Yiyecek Ara',
    href: paths.dashboard.search_food,
    icon: 'search',
    roles: ['Advisee', 'Dietitian', 'AcademicianDietitian', 'Admin'],
  },
  {
    key: 'confirm-food',
    title: 'Yeni Yiyecek Onayı',
    href: paths.dashboard.confirm_food,
    icon: 'confirm',
    roles: ['AcademicianDietitian', 'Admin'],
  },
  {
    key: 'add-meal',
    title: 'Öğün Ekle',
    href: paths.dashboard.add_meal,
    icon: 'meal',
    roles: ['Advisee'],
  },
  {
    key: 'my-reports',
    title: 'Raporlarım',
    href: paths.dashboard.my_reports,
    icon: 'report',
    roles: ['Advisee'],
  },
  {
    key: 'admin-dietitian-confirm',
    title: 'Diyetisyen Hesap Onayı',
    href: paths.dashboard.confirm_dietitian,
    icon: 'admin-confirm',
    roles: ['Admin'],
  },
  /*
  {
    key: 'advisee-management',
    title: 'Danışan Yönetimi',
    href: paths.dashboard.advisee_management,
    icon: 'advisee-management',
    roles: ['Dietitian', 'AcademicianDietitian'],
  },
*/

  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
