export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    // customers: '/dashboard/customers',
    // integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    add_food: '/dashboard/add-food',
    search_food: '/dashboard/search-food',
    confirm_food: '/dashboard/confirm-food',
    add_meal: '/dashboard/add-meal',
    my_reports: '/dashboard/my-reports',
    confirm_dietitian: '/dashboard/admin-dietitian-confirm',
    advisee_management: '/dashboard/advisee-management'
  },
  errors: { notFound: '/errors/not-found' },
} as const;
