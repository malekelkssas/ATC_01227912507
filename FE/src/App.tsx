import './i18n/i18n';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import EventList from './pages/EventList';
import SignUp from './pages/SignUp';
import Index from './pages/index';

import { PagesRoutesConstants } from '@/utils/constants';
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path={PagesRoutesConstants.SIGN_IN} element={<LoginPage />} />
              <Route path={PagesRoutesConstants.SIGN_UP} element={<SignUp />} />
              <Route path={PagesRoutesConstants.NOT_FOUND} element={<NotFound />} />
              <Route path={PagesRoutesConstants.EVENTS} element={<EventList />} />
              <Route path={PagesRoutesConstants.HOME} element={<Index />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
