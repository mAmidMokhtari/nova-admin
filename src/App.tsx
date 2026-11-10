import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/Redux/store';
import { AppRouter } from '@/Routes/AppRouter';
import { AppThemeProvider } from '@/Shared/Theme/AppThemeProvider';
import { ToastContainer } from '@/Shared/ToastContainer';

/** Root of the panel: store, theme, router and global toasts. */
export function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        <ToastContainer />
      </AppThemeProvider>
    </Provider>
  );
}
