/** Every route of the panel; components never hard-code a path. */
export const ROUTES = {
  root: '/',
  login: '/login',
  products: '/products',
  users: '/users',
} as const;

/** Where a signed-in admin lands by default. */
export const DEFAULT_PRIVATE_ROUTE = ROUTES.products;
