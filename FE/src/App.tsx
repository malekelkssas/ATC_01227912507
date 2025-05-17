import './i18n/i18n';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NodeEnvConstants, PagesRoutesConstants } from '@/utils/constants';
import GlobalLoginModal from '@/components/shared/GlobalLoginModal';
import ProgressLoader from './components/shared/ProgressLoader';
import { SkipResetProvider } from '@/context';
import { scan } from "react-scan";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

scan({
  enabled: import.meta.env.VITE_NODE_ENV === NodeEnvConstants.DEVELOPMENT,
});

const queryClient = new QueryClient();

const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const EventList = lazy(() => import('./pages/EventList'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Index = lazy(() => import('./pages/index'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const Success = lazy(() => import('./pages/Success'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <GlobalLoginModal />
            <BrowserRouter>
              <Suspense fallback={<ProgressLoader />}>
                <Routes>
                  <Route path={PagesRoutesConstants.SIGN_IN} element={<LoginPage />} />
                  <Route path={PagesRoutesConstants.SIGN_UP} element={<SignUp />} />
                  <Route path={PagesRoutesConstants.NOT_FOUND} element={<NotFound />} />
                  <Route path={PagesRoutesConstants.EVENTS} element={
                    <SkipResetProvider>
                      <EventList />
                    </SkipResetProvider>
                  } />
                  <Route path={PagesRoutesConstants.EVENT_DETAILS} element={<EventDetails />} />
                  <Route path={PagesRoutesConstants.HOME} element={<Index />} />
                  <Route path={PagesRoutesConstants.SUCCESS} element={<Success />} />
                  <Route path={PagesRoutesConstants.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
