import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div>
            <h1>Hello World</h1>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
