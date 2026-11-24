export const ADMIN_DASHBOARD_PATH =
  (import.meta.env.VITE_ADMIN_PATH || '/admin-dashboard').replace(/\/+$/, '') ||
  '/admin-dashboard';
