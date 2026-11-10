import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/Redux/hooks';
import { selectIsAuthenticated } from '@/Redux/slices/authSlice';

import { DEFAULT_PRIVATE_ROUTE, ROUTES } from './paths';

type RedirectState = {
  from?: string;
};

/** Renders child routes for a signed-in admin; otherwise sends them to login. */
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const state: RedirectState = { from: location.pathname };
    return <Navigate to={ROUTES.login} state={state} replace />;
  }

  return <Outlet />;
}

/** Keeps a signed-in admin away from guest pages and returns them where they came from. */
export function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    const state = location.state as RedirectState | null;
    return <Navigate to={state?.from ?? DEFAULT_PRIVATE_ROUTE} replace />;
  }

  return <Outlet />;
}
