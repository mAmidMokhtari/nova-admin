import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/Redux/store';
import { AppRouter } from '@/Routes/AppRouter';
import { AppErrorFallback } from '@/Shared/AppErrorFallback';
import { AppThemeProvider } from '@/Shared/Theme/AppThemeProvider';
import { ToastContainer } from '@/Shared/ToastContainer';

/** Root of the panel: store, theme, error boundary, router and global toasts. */
export function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        {/* Inside the store and theme, so the fallback can be translated and themed. */}
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ErrorBoundary>
        <ToastContainer />
      </AppThemeProvider>
    </Provider>
  );
}
