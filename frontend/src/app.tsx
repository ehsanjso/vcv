import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import './app.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider delayDuration={0}>
        <div className="w-full h-full">
          <RouterProvider router={router} />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
