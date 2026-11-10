import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from '@/Components/Layout/DashboardLayout';
import { LoginPage } from '@/Pages/Login';
import { NotFoundPage } from '@/Pages/NotFound';
import { ProductsPage } from '@/Pages/Products';
import { UsersPage } from '@/Pages/Users';

import { GuestRoute, ProtectedRoute } from './guards';
import { DEFAULT_PRIVATE_ROUTE, ROUTES } from './paths';

/** Route table of the panel: guest pages, then everything behind the auth guard. */
export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.root} element={<Navigate to={DEFAULT_PRIVATE_ROUTE} replace />} />
          <Route path={ROUTES.products} element={<ProductsPage />} />
          <Route path={ROUTES.users} element={<UsersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
