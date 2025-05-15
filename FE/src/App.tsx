import './i18n/i18n';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PagesRoutesConstants } from '@/utils/constants';
import GlobalLoginModal from '@/components/shared/GlobalLoginModal';
import LoadingSpinner from './components/shared/LoadingSpinner';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const EventList = lazy(() => import('./pages/EventList'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Index = lazy(() => import('./pages/index'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const Success = lazy(() => import('./pages/Success'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GlobalLoginModal />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path={PagesRoutesConstants.SIGN_IN} element={<LoginPage />} />
                <Route path={PagesRoutesConstants.SIGN_UP} element={<SignUp />} />
                <Route path={PagesRoutesConstants.NOT_FOUND} element={<NotFound />} />
                <Route path={PagesRoutesConstants.EVENTS} element={<EventList />} />
                <Route path={PagesRoutesConstants.EVENT_DETAILS} element={<EventDetails />} />
                <Route path={PagesRoutesConstants.HOME} element={<Index />} />
                <Route path={PagesRoutesConstants.SUCCESS} element={<Success />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
